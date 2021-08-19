from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee, Shift, UserProfile, Business, Wage, Forecast
from django.db.models import Count, Sum
from .serializers import ShiftSerializer, ShiftReadOnlySerializer
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
        department_id = request.query_params.get('department')
        shifts = Shift.objects.filter(department=department_id)
        most_common = shifts.values("start_time", "end_time", "break_length", "department").annotate(
            count=Count('start_time')).order_by("-count")[:10]
        for i in most_common:
            i['start_time'] = str(i['start_time'])[0:5]
            i['end_time'] = str(i['end_time'])[0:5]
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

        if business != "false":
            all_shifts = Shift.objects.filter(date__gte=date.today(), department__site=request.query_params.get(
                'site_id'), stage="Unpublished").exclude(employee__isnull=True)
        else:
            all_shifts = Shift.objects.filter(owner=self.request.user, stage="Unpublished", date__gte=date.today(
            ), department__site=request.query_params.get('site_id')).exclude(employee__isnull=True)

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
                    employee__user__id=employee.user.id, stage="Published", date__gte=datetime.now()).order_by('date')
                html_message = render_to_string("emailshifts.html", context={
                                                'shifts': shifts, 'employee': employee})
                mail_item = mail.EmailMultiAlternatives(
                    "Rota Updated - " + today_date, "", "readysetrota@gmail.com", [employee.user.email])
                mail_item.attach_alternative(html_message, "text/html")
                email.append(mail_item)
        connection.send_messages(email)
        connection.close()

        # publish_email.delay(shifts_list)

        for i in all_shifts:
            i.stage = "Published"
            i.save()

        ids = (o.id for o in all_shifts)
        return Response(ids)


# def getHoursAndWage(shifts, start_date, end_date, site_id=False, user_id=False):
#     hours = 0
#     wage = 0
#     days_difference = (end_date - start_date) + timedelta(days=1)
#     for i in shifts:
#         if i.end_time:
#             wage_obj = Wage.objects.filter(
#                 employee=i.employee).order_by('-start_date').first()

#             current_date = date.today()
#             start = datetime.combine(current_date, i.start_time)
#             end_time = datetime.strptime(i.end_time, '%H:%M')
#             end = datetime.combine(current_date, end_time.time())
#             if (end < start):
#                 end = end + timedelta(days=1)

#             shift_length = round((end - start).total_seconds() / 3600, 2)

#             hours += shift_length - (i.break_length / 60)
#             if(wage_obj and wage_obj.wage_type == "H"):
#                 wage += float(wage_obj.wage) * \
#                     (shift_length - (i.break_length / 60))

#     employees = []

#     if user_id:
#         employees = Employee.objects.filter(user__id=user_id).distinct()
#     if site_id:
#         employees = Employee.objects.filter(
#             position__department__site=site_id).distinct()
#     # if business_id:
#     #     employees = Employee.objects.filter(
#     #         position__department__site__business=business_id).distinct()
    
#     # Check for employee end date
#     while start_date <= end_date:
#         for i in employees:
#             wage_obj = Wage.objects.filter(employee=i, start_date__lte=start_date).order_by('-start_date').first()
            
#             if wage_obj:
#                 if wage_obj.wage_type == "S":
#                     wage += float(wage_obj.wage/52/7)

#         start_date += timedelta(days=1)

#     return hours, wage

import sqlite3
class GetStats(APIView):
    def get(self, request):
        stat_type = request.query_params.get('stat_type')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        start_date = datetime.strptime(start_date, '%d/%m/%Y')
        end_date = datetime.strptime(end_date, '%d/%m/%Y')
        id = request.query_params.get('id')
        if stat_type == "business":
            shifts = Shift.objects.filter(stage="Published", department__site=id, date__gte=start_date, date__lte=end_date).exclude(end_time__isnull=True)
            
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
                salaries = Wage.objects.filter(employee__position__department__site=id, wage_type="S", start_date__lte=date).filter(Q(end_date__gte=date) | Q(end_date=None))
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

        print(stat_shifts)

        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        stat_type = request.query_params.get('stat_type')

        start_date = datetime.strptime(start_date, '%d/%m/%Y')
        end_date = datetime.strptime(end_date, '%d/%m/%Y')

        days_difference = (end_date - start_date) + timedelta(days=1)

        before_range_date = start_date - days_difference

        id = False
        user_id = False

        if stat_type == "business":
            current_filter = request.query_params.get('currentFilter')
            id = request.query_params.get('id')
            if current_filter == "business":
                shifts = Shift.objects.filter(
                    department__site__business=id, date__range=[start_date, end_date])
                before_shifts = Shift.objects.filter(department__site__business=id, date__range=[
                                                     before_range_date, start_date - timedelta(days=1)])
            if current_filter == "site":
                shifts = Shift.objects.filter(
                    department__site=id, date__range=[start_date, end_date])
                before_shifts = Shift.objects.filter(department__site=id, date__range=[
                                                     before_range_date, start_date - timedelta(days=1)])
            if current_filter == "department":
                shifts = Shift.objects.filter(
                    department=id, date__range=[start_date, end_date])
                before_shifts = Shift.objects.filter(department=id, date__range=[
                                                     before_range_date, start_date - timedelta(days=1)])

        elif stat_type == "staff":
            user_id = request.query_params.get('user_id')
            shifts = Shift.objects.filter(
                date__range=[start_date, end_date], employee__user__id=user_id)
            before_shifts = Shift.objects.filter(date__range=[
                                                 before_range_date, start_date - timedelta(days=1)], employee__user__id=user_id)

        elif stat_type == "staff_profile":
            employee_id = request.query_params.get('user_id')
            shifts = Shift.objects.filter(
                date__range=[start_date, end_date], employee__id=employee_id)
            before_shifts = Shift.objects.filter(date__range=[
                                                 before_range_date, start_date - timedelta(days=1)], employee__id=employee_id)

        shifts = shifts.filter(absence="None").exclude(open_shift=True)
        before_shifts = before_shifts.filter(
            absence="None").exclude(open_shift=True)
        data = {"shifts": {"current": len(shifts), "before": len(before_shifts)}, 'hours': {"current": getHoursAndWage(shifts, start_date, end_date,)[0], "before": getHoursAndWage(before_shifts, start_date, end_date,)[
            0]}, "wage": {"current": getHoursAndWage(shifts, start_date, end_date, id, user_id)[1], "before": getHoursAndWage(before_shifts, start_date, end_date, id, user_id)[1]}}

        return HttpResponse(json.dumps(data))


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
            'end_date'), department__id=request.query_params.get('id')).order_by('date')
        all_shifts = {}
        for i in shifts:
            all_shifts[i.date] = {}
        for i in all_shifts:
            all_shifts[i] = Shift.objects.filter(
                date=i, stage="Published", department__id=request.query_params.get('id')).order_by('start_time')
        resp = HttpResponse(content_type='application/pdf')
        resp['Content-Disposition'] = 'inline; filename="rota.pdf"'
        result = generate_pdf('allshifts.html', file_object=resp, context={
                              'all_shifts': all_shifts}, )
        return result

# Create your views here.


class Charge(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        if request.method == 'POST':
            stripe.api_key = STRIPE_SECRET_KEY
            pm = ""
            try:
                pm = stripe.PaymentMethod.attach(
                    request.data['payment_method'],
                    customer=request.data['customer_id'],
                )
            except Exception as e:
                return JsonResponse({"error": e.error.message})

            stripe.Customer.modify(
                request.data['customer_id'],
                invoice_settings={"default_payment_method": pm.id},
            )

            price = stripe.Price.create(
                unit_amount=request.data['charge'],
                currency="gbp",
                recurring={"interval": request.data['period']},
                # product="prod_HwsJxT2Z3YkyAt"
                product="prod_Hzpy6ipUG3MsR3",
            )

            subscription = stripe.Subscription.create(
                customer=request.data['customer_id'],
                items=[
                    {"price": price.id},
                ],
            )

            if subscription:
                user = UserProfile.objects.filter(
                    stripe_id=request.data['customer_id']).first().user
                business = Business.objects.filter(owner=user).first()
                business.plan = "P"
                business.total_employees = request.data['total_employees']
                business.save()

            return Response(subscription)


class getCustomer(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        stripe.api_key = STRIPE_SECRET_KEY
        try:
            customer = stripe.Customer.retrieve(request.data['customer_id'])
        except stripe.error.InvalidRequestError as e:
            return Response(False)

        subscriptions = stripe.Subscription.list(
            customer=request.data['customer_id'])['data']
        if subscriptions:
            subscriptions = subscriptions[0]
            obj = {"cancel_at": subscriptions['cancel_at'], "current_period_end": datetime.fromtimestamp(
                subscriptions['current_period_end']), "amount": subscriptions['plan']['amount'], "interval": subscriptions['plan']['interval'], "status": subscriptions['status'], "cancel_at_period_end": subscriptions['cancel_at_period_end']}
        # data = serializers.serialize('json', [obj,])
            return JsonResponse(obj)
        else:
            return Response(False)


class Cancel(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        stripe.api_key = STRIPE_SECRET_KEY

        customer = stripe.Customer.retrieve(request.data['customer_id'])
        for i in customer['subscriptions']['data']:
            cancellation = stripe.Subscription.modify(
                i.id,
                cancel_at_period_end=True
            )

        cancelled_at = datetime.fromtimestamp(cancellation.cancel_at)

        user = UserProfile.objects.filter(
            stripe_id=request.data['customer_id']).first().user
        business = Business.objects.filter(owner=user).first()

        business.subscription_cancellation = cancelled_at
        business.save()

        return JsonResponse({"subscription_cancellation": business.subscription_cancellation})

        # data = serializers.serialize('python', [business,])
        # return JsonResponse(data[0], safe=False)


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
    if event.type == "customer.subscription.deleted":
        customer = event.data.object.customer

        user = UserProfile.objects.filter(stripe_id=customer).first().user
        business = Business.objects.filter(owner=user).first()
        business.plan = "F"
        business.total_employees = 15
        business.subscription_cancellation = None
        business.save()

    return HttpResponse(status=200)
