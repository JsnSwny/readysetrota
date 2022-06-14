from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee, Shift, UserProfile, Business, Wage, Forecast, Site, TimeClock
from django.db.models import Count, Sum
from .serializers import ShiftListSerializer, ShiftSerializer, ShiftReadOnlySerializer, EmployeeListSerializer, TimeclockShiftSerializer
from operator import attrgetter
from itertools import groupby
from datetime import datetime, timedelta, date
from django.core.mail import send_mail, send_mass_mail
from django_xhtml2pdf.utils import generate_pdf
from django.http import HttpResponse, FileResponse, JsonResponse
from django import template
from django.core import mail
from django.template.loader import render_to_string
from .tasks import publish_email
import stripe
from rest_framework.permissions import AllowAny
import json
from django.views.decorators.csrf import csrf_exempt
from decimal import Decimal
from rotaready.settings import STRIPE_SECRET_KEY
from django.core import serializers
from django.db.models.functions import TruncMonth, TruncDay
from django.db.models import FloatField
from django.db.models.functions import Cast
from django.db.models import F, Func, ExpressionWrapper, fields
import sqlite3
from django.db.models.functions import ExtractHour
import pandas as pd
from django.db.models import Q
import time
from django.forms.models import model_to_dict
from .permissions import *
from .serializers import getPermList
from django.http import HttpResponseForbidden
import os
from django.shortcuts import redirect


db = sqlite3.connect(':memory:')

sqlite3.enable_callback_tracebacks(True)   # <-- !


# Create your views here.

class CheckUUID(APIView):
    def get(self, request, *args, **kwargs):
        try:
            employee = Employee.objects.filter(
                uuid=request.query_params.get('uuid')).first()
        except Exception as ex:
            return Response({'error': ex})
        if employee:
            if employee.user:
                return Response({'error': ["A user is already associated with this employee."]})
            user = User.objects.filter(
                id=request.query_params.get('userid')).first()
            if len(User.objects.filter(employee__owner__id=employee.owner.id, id=request.query_params.get('userid'))) > 0:
                return Response({'error': ["You already have an account associated with the same business."]})
            employee.user = user
            employee.save()
            return Response(True)
        else:
            return Response(
                {"error": ["UUID does not match any employees."]},
            )


class GetPopularTimes(APIView):
    def get(self, request):
        site_id = request.query_params.get('site')
        shifts = Shift.objects.filter(site=site_id)
        most_common = shifts.values("start_time", "end_time", "break_length", "site").annotate(
            count=Count('start_time')).order_by("-count")[:10]
        for i in most_common:
            i['start_time'] = str(i['start_time'])[0:5]
            i['end_time'] = str(i['end_time'])
        return Response(most_common)


class ApproveShifts(APIView):
    def get(self, request):
        all_shifts = Shift.objects.filter(
            stage="Approval", date__gte=date.today(), department=request.query_params.get('department_id')).exclude(employee__isnull=True)

        for i in all_shifts:
            i.stage = "Unpublished"
            i.save()

        ids = (o.id for o in all_shifts)
        return Response(ids)


class SendForApproval(APIView):
    def get(self, request):
        all_shifts = Shift.objects.filter(
            owner=self.request.user, stage="Creation", date__gte=date.today(), department=request.query_params.get('department_id')).exclude(employee__isnull=True)

        for i in all_shifts:
            i.stage = "Approval"
            i.save()

        ids = (o.id for o in all_shifts)
        return Response(ids)


class Publish(APIView):
    def get(self, request):
        business = request.query_params.get('business')
        all_shifts = {}

        site_id = request.query_params.get('site_id')
        perm_list = getPermList(request, site_id)

        if "publish_shifts" not in perm_list:
            return HttpResponseForbidden()

        if business != "false":
            all_shifts = Shift.objects.filter(date__gte=date.today(), site=request.query_params.get(
                'site_id'), stage="Unpublished").exclude(employee__isnull=True)
        else:
            all_shifts = Shift.objects.filter(owner=self.request.user, stage="Unpublished", date__gte=date.today(
            ), site=request.query_params.get('site_id')).exclude(employee__isnull=True)

        # shifts_list = list(shifts.values_list('pk', flat=True))
        # new_shifts = Shift.objects.filter(id__in=shifts_list)

        # print(all_shifts)

        connection = mail.get_connection()
        shifts_sorted = sorted(all_shifts, key=attrgetter("employee.id"))
        shifts_unique = [list(grp) for k, grp in groupby(
            shifts_sorted, attrgetter("employee.id"))]
        email = []
        today_date = datetime.now().strftime("%d/%m/%Y")
        connection.open()
        for idx, val in enumerate(shifts_unique):
            employee = shifts_unique[idx][0].employee

            if employee.user:
                shifts = Shift.objects.filter(
                    employee__user__id=employee.user.id, date__gte=datetime.now()).order_by('date')

                print(shifts)

                html_message = render_to_string("emailshifts.html", context={
                                                'shifts': shifts, 'employee': employee})
                mail_item = mail.EmailMultiAlternatives(
                    "Rota Updated - " + today_date, "", "readysetrota <info@readysetrota.com>", [employee.user.email])
                mail_item.attach_alternative(html_message, "text/html")
                email.append(mail_item)
        connection.send_messages(email)
        connection.close()

        # publish_email.delay(shifts_list)

        for i in all_shifts:
            i.stage = "Published"

            end_time = i.end_time

            if end_time == "Finish":
                end_time = None
            
            tc, created = TimeClock.objects.get_or_create(
                shift=i, defaults={'clock_in': i.start_time, 'clock_out': end_time, 'employee': i.employee, 'break_length': i.break_length})

            if not created:
                tc.clock_in = i.start_time
                tc.clock_out = end_time
                tc.break_length = i.break_length

            tc.save()
            i.save()

        ids = (o.id for o in all_shifts)
        return Response(ids)

import sqlite3


class GetTimeclock(APIView):
    def get(self, request):
        pin = request.query_params.get('pin')
        site = int(request.query_params.get('site'))
        pin = int(pin.replace(',', ''))
        
        employee = Employee.objects.get(position__site=site, pin=pin)
        shifts = None
        if employee:
            shifts = Shift.objects.filter(employee=employee, date=datetime.today()).exclude(timeclock__stage="CLOCKED_OUT")
            shifts_list = TimeclockShiftSerializer(instance=shifts, many=True).data

        # shifts_list = list(shifts)
        
        response = EmployeeListSerializer(instance=employee).data

        


        return JsonResponse({'shifts': shifts_list, 'employee': response}, safe=False)

class GetStats(APIView):
    def get(self, request):
        stat_type = request.query_params.get('stat_type')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        start_date = datetime.strptime(start_date, '%d/%m/%Y')
        end_date = datetime.strptime(end_date, '%d/%m/%Y')
        id = request.query_params.get('id')
        if stat_type == "business":
            shifts = Shift.objects.filter(stage="Published", site=id, date__gte=start_date, date__lte=end_date).exclude(end_time__isnull=True)
            
        else:
            employee_id = request.query_params.get('employee_id')
            shifts = Shift.objects.filter(stage="Published", employee__id=employee_id, date__gte=start_date, date__lte=end_date).exclude(end_time__isnull=True)

        serializer = ShiftReadOnlySerializer(list(shifts), many=True).data
        shifts_worked = shifts.annotate(day=TruncDay('date')).values('day').annotate(c=Count('id')).values('day', 'c')
        total_cost = {}
        total_hours_obj = {}
        forecast_dif_obj = {}

        delta = end_date - start_date
        for i in range(delta.days+1):

            date = start_date + timedelta(days=i)
            date_str = date.strftime("%Y-%m-%d")
            cost = 0

            cost += sum(item['total_cost'] for item in serializer if str(item['date']) == date_str)
            total_hours = sum(item['length'] for item in serializer if str(item['date']) == date_str)
            forecast_dif = 0.00
            if stat_type == "business":
                salaries = Wage.objects.filter(employee__site=id, wage_type="S", start_date__lte=date).filter(Q(end_date__gte=date) | Q(end_date=None))
                forecast = Forecast.objects.filter(site=id, date=date)
                if forecast:
                    forecast_dif = float(forecast.first().predicted) - cost
            else:
                salaries = Wage.objects.filter(employee__id=employee_id, wage_type="S", start_date__lte=date).filter(Q(end_date__gte=date) | Q(end_date=None))
            for salary in salaries:
                cost += float(salary.wage) / 52 / 7

            

            total_hours_obj[date_str] = float("{:.1f}".format(total_hours))

            forecast_dif_obj[date_str] = float("{:.2f}".format(forecast_dif))
            total_cost[date_str] = float("{:.2f}".format(cost))

        
        # shifts_worked = Shift.objects.filter(department__site=id).exclude(end_time__isnull=True).annotate(month=TruncMonth('date')).values('month').annotate(c=Count('id')).values('month', 'c')
        
        

        return JsonResponse({"hours": list(shifts_worked), "total_cost": total_cost, "forecast_dif": forecast_dif_obj, "total_hours": total_hours_obj}, safe=False)


class ExportShifts(APIView):
    def get(self, request):
        id = request.query_params.get('id')
        employee = Employee.objects.filter(id=id)[0]
        shifts = Shift.objects.filter(
            employee__id=id, stage="Published", date__gte=datetime.now()).order_by('date')
        resp = HttpResponse(content_type='application/pdf')
        resp['Content-Disposition'] = 'inline; filename="rota.pdf"'
        result = generate_pdf('shifts.html', file_object=resp, context={
                              'shifts': shifts, 'employee': employee}, )
        return result
        
class ExportAllShifts(APIView):
    def get(self, request):
        shifts = Shift.objects.filter(stage="Published", date__gte=request.query_params.get('start_date'), date__lte=request.query_params.get(
            'end_date'), site__id=request.query_params.get('id')).order_by('date')
        all_shifts = {}
        for i in shifts:
            all_shifts[i.date] = {}
        for i in all_shifts:
            all_shifts[i] = Shift.objects.filter(
                date=i, stage="Published", site__id=request.query_params.get('id')).order_by('start_time')
            
        site = Site.objects.get(pk=request.query_params.get('id'))
        resp = HttpResponse(content_type='application/pdf')
        resp['Content-Disposition'] = 'attachment; filename="rota.pdf"'
        
        result = generate_pdf('allshifts.html', file_object=resp, context={
                              'all_shifts': all_shifts, 'start_date': request.query_params.get('start_date'), 'end_date': request.query_params.get('end_date'), 'site': site.name}, )
        return result

# Create your views here.


class Charge(APIView):
    # permission_classes = [AllowAny]

    # def post(self, request, format=None):
    #     if request.method == 'POST':
    def post(self, request):
        return True


class CreateCheckoutSession(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        domain_url = "https://www.readysetrota.com"
        stripe.api_key = STRIPE_SECRET_KEY

        stripe_id = request.data['stripe_id']

        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                success_url=domain_url + "/billing/?success=true&session_id={CHECKOUT_SESSION_ID}",
                cancel_url=domain_url + "/billing/?success=false",
                mode='subscription',
                line_items=[{
                    'price': "price_1L98I6E5eS8rS5Q2e8R6aPTe",
                    'quantity': request.data['quantity'],
                }],
                client_reference_id=self.request.user.id,
                customer=stripe_id
                
            )

            return JsonResponse({
                'id': checkout_session.id
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, safe=False)

class CreateSetupCheckoutSession(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        domain_url = "https://www.readysetrota.com"
        stripe.api_key = STRIPE_SECRET_KEY

        stripe_id = request.data['stripe_id']
        subscription_id = request.data['subscription_id']

        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                mode='setup',
                setup_intent_data={
                    'metadata': {
                    'subscription_id': 'sub_8epEF0PuRhmltU',
                    },
                },
                success_url=domain_url + '/billing/?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=domain_url + '/billing/?success=false',
                client_reference_id=self.request.user.id,
                customer=stripe_id
                
            )

            return JsonResponse({
                'id': checkout_session.id
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, safe=False)

class RetrieveUpcomingInvoice(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        stripe.api_key = STRIPE_SECRET_KEY
        data = request.data
        try:
            quantity = data['quantity']
            subscriptionId = data['subscriptionId']

            params = dict(
                customer=data['customerId']
            )

            if subscriptionId != None:
                # Retrieve the subscription
                subscription = stripe.Subscription.retrieve(data['subscriptionId'])
                params["subscription"] = subscriptionId
                current_price = subscription['items']['data'][0].price.id

                params["subscription_items"] = [
                    {
                        "id": subscription['items']['data'][0].id,
                        "quantity":quantity
                    }]

            else:
                params["subscription_items"] = [
                    {
                        "price": price_1L98I6E5eS8rS5Q2e8R6aPTe,
                        "quantity": quantity
                    }
                ]

            # Retrive the Invoice
            invoice = stripe.Invoice.upcoming(**params)
            response = {}

            if data['subscriptionId'] != None:
                current_period_end = subscription.current_period_end
                immediate_total = 0
                next_invoice_sum = 0

                for invoiceLineItem in invoice.lines.data:
                    if invoiceLineItem.period.end == current_period_end:
                        immediate_total += invoiceLineItem.amount
                    else:
                        next_invoice_sum += invoiceLineItem.amount

                response = {
                    'immediate_total': immediate_total,
                    'next_invoice_sum': next_invoice_sum,
                    'invoice': invoice
                }
            else:
                response = {
                    'invoice': invoice
                }

            print("SUCCESS")

            return JsonResponse(response)
        except Exception as e:
            print("ERROR")
            return JsonResponse({'error': str(e)}, safe=False)


class UpdateSubscription(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        try:
            quantity = request.data['quantity']
            subscriptionId = request.data['subscriptionId']
            subscription = stripe.Subscription.retrieve(subscriptionId)
            current_price = subscription['items']['data'][0].price.id

            updatedSubscription = stripe.Subscription.modify(
                subscriptionId,
                items=[{
                    'id': subscription['items']['data'][0].id,
                    'quantity': quantity,
                }],
                expand=['plan.product']
            )

            invoice = stripe.Invoice.create(
                customer=subscription.customer,
                subscription=subscriptionId,
                description="Change to " + str(quantity) +
                " seat(s) on the " + str(updatedSubscription.plan.product.name) + " plan"
            )

            invoice = stripe.Invoice.pay(invoice.id)

            return JsonResponse(updatedSubscription)
        except Exception as e:
            return JsonResponse({'error': str(e)}, safe=False)

class RetrieveSubscription(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):


        subscriptionId = request.data['subscriptionId']

        try:
            subscription = stripe.Subscription.retrieve(
                subscriptionId,
                expand=['latest_invoice',
                        'customer.invoice_settings.default_payment_method', 'plan.product']
            )



            upcoming_invoice = None

            if not subscription.cancel_at_period_end:
                upcoming_invoice = stripe.Invoice.upcoming(subscription=subscriptionId)

            # payment_information = None
            # if(subscription.default_payment_method):
            #     payment_information = stripe.PaymentMethod.retrieve(
            #         subscription.default_payment_method
            #     )


            print(subscription.customer)

        

            return JsonResponse(
                {
                "cancel_at": subscription.cancel_at,
                "card": subscription.customer.invoice_settings.default_payment_method,
                "product_description": subscription.plan.product.name,
                "current_price": subscription.plan.id,
                "current_quantity": subscription['items']['data'][0].quantity,
                "invoices": stripe.Invoice.list(subscription=subscriptionId, limit=20),
                "upcoming_invoice": upcoming_invoice,
                "active": not subscription.cancel_at_period_end,
                "trial_end": subscription.trial_end,
                "status": subscription.status
                }
            )
        except Exception as e:
            return JsonResponse({'error': str(e)}, safe=False)

class CancelSubscription(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        stripe.api_key = STRIPE_SECRET_KEY

        cancellation = stripe.Subscription.modify(
            request.data['subscriptionId'],
            cancel_at_period_end=True
        )

        return JsonResponse({"subscription_cancellation": cancellation})

class ReactivateSubscription(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        stripe.api_key = STRIPE_SECRET_KEY

        subscription = stripe.Subscription.modify(
            request.data['subscriptionId'],
            cancel_at_period_end=False
        )

        return JsonResponse({"subscription": subscription})

class RetrievePaymentMethod(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        stripe.api_key = STRIPE_SECRET_KEY

        try:
            paymentMethod = stripe.PaymentMethod.retrieve(
                request.data['paymentMethodId'],
            )
            return JsonResponse(paymentMethod)
        except Exception as e:
            return JsonResponse({'error': str(e)}, safe=False)


class sendMessage(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        message = f"Name: {request.data['name']}\nEmail: {request.data['email']}\n\nMessage: {request.data['message']}"
        send_mail(
            "readysetrota - Contact Message from " + request.data['name'],
            message,
            "readysetrota@gmail.com",
            ["jsnswny@gmail.com"],
            fail_silently=False,
        )
        return Response(True)


@csrf_exempt
def webhook(request):
    payload = request.body
    event = None
    stripe.api_key = STRIPE_SECRET_KEY
    try:
        event = stripe.Event.construct_from(
            json.loads(payload), stripe.api_key
        )
    except ValueError as e:
        return HttpResponse(status=200)

    if event.type == "checkout.session.completed":
        customer = event.data.object.customer
        ref_id = event.data.object.client_reference_id
        user_profile = UserProfile.objects.get(user__id=ref_id)
        user_profile.stripe_id = customer
        user_profile.save()


        business = Business.objects.filter(owner=user_profile.user).first()


        setup_intent_id = event.data.object.setup_intent


        if(setup_intent_id):
            setup_intent = stripe.SetupIntent.retrieve(setup_intent_id)

            stripe.Customer.modify(
                customer,
                invoice_settings={'default_payment_method': setup_intent.payment_method}
            )

            business.payment_method_id = setup_intent.payment_method
            business.save()

    if event.type == "invoice.paid":
        customer = event.data.object.customer

        user = UserProfile.objects.get(stripe_id=customer).user

        business = Business.objects.filter(owner=user).first()
        business.plan = "P"


        business.subscription_id = event.data.object.subscription
        business.total_employees = event.data.object.lines.data[-1].quantity
        business.payment_method_id = event.data.object.default_payment_method
        business.save()

        print("invoice paid")

    if event.type == "invoice.payment_succeeded":
        pi = stripe.PaymentIntent.retrieve(
            event.data.object.payment_intent,
        )

        stripe.Customer.modify(
            pi.customer,
            invoice_settings={'default_payment_method': pi.payment_method}
        )

        print("payment intent")

        print(pi)

    if event.type == "invoice.payment_failed":
        customer = event.data.object.customer

        user = UserProfile.objects.get(stripe_id=customer).user

        business = Business.objects.filter(owner=user).first()
        business.plan = "P"


        business.subscription_id = event.data.object.subscription
        business.total_employees = event.data.object.lines.data[-1].quantity
        business.payment_method_id = event.data.object.default_payment_method
        business.save()

    if event.type == "customer.subscription.created":
        customer = event.data.object.customer
        user = UserProfile.objects.get(stripe_id=customer).user
        business = Business.objects.filter(owner=user).first()
        business.subscription_status = event.data.object.status
        business.save()

    if event.type == "customer.subscription.updated":
        customer = event.data.object.customer
        user = UserProfile.objects.get(stripe_id=customer).user
        business = Business.objects.filter(owner=user).first()
        business.subscription_status = event.data.object.status
        business.save()

        # print(event.data)


    if event.type == "customer.subscription.deleted":
        customer = event.data.object.customer

        user = UserProfile.objects.get(stripe_id=customer).user
        business = Business.objects.filter(owner=user).first()
        business.plan = "F"
        business.subscription_id = None
        business.subscription_status = None
        business.save()

        print("subscription cancelled")

    return HttpResponse(status=200)



def timeDifference(time1, time2):
    diff = time1 - time2
    hours = diff.total_seconds() / 3600
    return abs(hours)

def costAndHours(date, based_on, site_id):

    total_cost = Decimal(0)
    total_hours = 0
    if(based_on == "predicted"):
        shifts = Shift.objects.filter(stage="Published", date=date, site=site_id).values('employee', 'start_time', 'end_time', 'break_length')
        
        for i in shifts:
            if i['end_time'] != "Finish":
                employee = i['employee']
                wage_at_time = Wage.objects.filter(wage_type="H", employee__id=employee).order_by('-start_date').first()
                start_time = i['start_time'].strftime('%H:%M')
                start_time = datetime.strptime(start_time, '%H:%M')
                end_time = datetime.strptime(i['end_time'], '%H:%M')
                total_length = timeDifference(start_time, end_time) - (i['break_length'] / 60)

                total_hours += total_length

                if(wage_at_time):
                    total_cost += Decimal(total_length) * Decimal(wage_at_time.wage)
    else:
        timeclocks = TimeClock.objects.filter(date=date, site=site_id).values('employee', 'clock_in', 'clock_out', 'break_length')
        for i in timeclocks:
            if i['clock_out']:
                employee = i['employee']
                wage_at_time = Wage.objects.filter(wage_type="H", employee__id=employee).order_by('-start_date').first()
                start_time = i['clock_in'].strftime('%H:%M')
                start_time = datetime.strptime(start_time, '%H:%M')
                
                end_time = i['clock_out'].strftime('%H:%M')
                end_time = datetime.strptime(end_time, '%H:%M')
                total_length = timeDifference(start_time, end_time) - (i['break_length'] / 60)

                total_hours += total_length

                if(wage_at_time):
                    total_cost += Decimal(total_length) * Decimal(wage_at_time.wage)


    salaries = Wage.objects.filter(employee__site=site_id, wage_type="S", start_date__lte=date).filter(Q(end_date__gte=date) | Q(end_date=None)).distinct()
    for salary in salaries:
        total_cost += salary.wage / 52 / 7

    return {'total_hours': total_hours, 'total_cost': total_cost}


from collections import defaultdict



class GetReportData(APIView):

    # permission_classes = (CanViewReportData,)

    def daterange(self, start_date, end_date):
        for n in range(int((end_date - start_date).days)):
            yield end_date - timedelta(n)

    def get(self, request):
        site_id = request.query_params.get('site_id')
        perm_list = getPermList(request, site_id)

        if "view_report" not in perm_list:
            return HttpResponseForbidden()

        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        start_date = datetime.strptime(start_date, '%d/%m/%Y')
        end_date = datetime.strptime(end_date, '%d/%m/%Y')
        

        based_on = request.query_params.get('based_on')
        total_cost = []
        total_hours = []
        forecast_dif_obj = {}

        delta = end_date - start_date
        start = time.process_time()
        dataObj = []

        for i in range(delta.days+1):

            date = end_date - timedelta(days=i)
            date_str = date.strftime("%Y-%m-%d")
            costAndHoursValue = costAndHours(date, based_on, site_id)

            obj = {'date': date}
            total_cost = float("{:.2f}".format(costAndHoursValue['total_cost']))
            obj['total_cost'] = total_cost
            
            total_hours = float("{:.1f}".format(costAndHoursValue['total_hours']))
            obj['total_hours'] = total_hours

            if based_on == "predicted":
                total_shifts = Shift.objects.filter(stage="Published", site=site_id, date=date).exclude(end_time__isnull=True).count()
                obj['total_shifts'] = total_shifts
            else:
                total_shifts = TimeClock.objects.filter(date=date, site=site_id).count()
                obj['total_shifts'] = total_shifts

            forecast = Forecast.objects.filter(site=site_id, date=date).values('actual', 'predicted', 'labourGoal').first()

            if forecast:
                if based_on == "predicted":
                    obj['revenue'] = float(forecast['predicted'])
                else:
                    obj['revenue'] = float(forecast['actual'])
                labour_percentage = 0.00
                if obj['revenue'] > 0:
                    labour_percentage = ((total_cost) / obj['revenue']) * 100
                obj['labour_percentage'] = float(f"{labour_percentage:.2f}")
                obj['labour_diff'] = float(f"{Decimal(obj['labour_percentage']) - forecast['labourGoal']:.2f}")
            else:
                obj['revenue'] = 0.00
                obj['labour_percentage'] = 0.00 
                obj['labour_diff'] = 0.00
                
                
            # // const labourDiff = (
            # //   labourPercentage - getForecastValues(date)?.labourGoal
            # // ).toFixed(2);

            dataObj.append(obj)

        exportData = bool(request.query_params.get('exportData'))
    

        if exportData == True:
            n_shifts = 0
            n_revenue = 0
            n_cost = 0
            n_hours = 0
            n_percentage = 0
            for d in dataObj:
                n_shifts += d['total_shifts']
                n_revenue += d['revenue']
                n_cost += d['total_cost']
                n_hours += d['total_hours']
                n_percentage += d['labour_percentage']

            n_percentage = n_percentage / len(dataObj)
                
            exportDataTotals = {'total_shifts': float(f"{n_shifts:.2f}"), 'total_revenue': float(f"{n_revenue:.2f}"), 'total_cost': float(f"{n_cost:.2f}"), 'total_hours': float(f"{n_hours:.2f}"), 'total_percentage': float(f"{n_percentage:.2f}")}

            resp = HttpResponse(content_type='application/pdf')
            resp['Content-Disposition'] = 'inline; filename="rota.pdf"'
            result = generate_pdf('report.html', file_object=resp, context={'daterange': self.daterange(start_date, end_date), 'start_date': start_date, 'end_date': end_date, "dataObj": dataObj, "exportDataTotals": exportDataTotals} )
            return result
        else:
            return JsonResponse(dataObj, safe=False)
