from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee, Shift, UserProfile, Business
from django.db.models import Count
from .serializers import ShiftSerializer
from operator import attrgetter
from itertools import groupby
from datetime import datetime, timedelta
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
            return Response({"department_id": employee.position.all().first().department.id})
        else:
            return Response(
                {"error": ["UUID does not match any employees."]},
            )


class GetPopularTimes(APIView):
    def get(self, request):
        department_id = request.query_params.get('department')
        shifts = Shift.objects.filter(department=department_id)
        most_common = shifts.values("start_time", "end_time", "department").annotate(
            count=Count('start_time')).order_by("-count")[:10]
        return Response(most_common)


class Publish(APIView):
    def get(self, request):
        all_shifts = Shift.objects.filter(
            owner=self.request.user, published=False)
        # shifts_list = list(shifts.values_list('pk', flat=True))
        # new_shifts = Shift.objects.filter(id__in=shifts_list)
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
            i.published = True
            i.save()

        ids = (o.id for o in all_shifts)
        return Response(ids)


class ExportShifts(APIView):
    def get(self, request):
        id = request.query_params.get('id')
        employee = Employee.objects.filter(id=id)[0]
        shifts = Shift.objects.filter(
            employee__id=id, published=True, date__gte=datetime.now()).order_by('date')
        resp = HttpResponse(content_type='application/pdf')
        resp['Content-Disposition'] = 'inline; filename="rota.pdf"'
        result = generate_pdf('shifts.html', file_object=resp, context={
                              'shifts': shifts, 'employee': employee}, )
        return result


class ExportAllShifts(APIView):
    def get(self, request):
        shifts = Shift.objects.filter(published=True, date__gte=request.query_params.get('start_date'), date__lte=request.query_params.get(
            'end_date'), department__id=request.query_params.get('id')).order_by('date')
        all_shifts = {}
        for i in shifts:
            all_shifts[i.date] = {}
        for i in all_shifts:
            all_shifts[i] = Shift.objects.filter(
                date=i, published=True, department__id=request.query_params.get('id')).order_by('start_time')
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
        customer = stripe.Customer.retrieve(request.data['customer_id'])

        subscriptions = stripe.Subscription.list(
            customer=request.data['customer_id'])['data']
        if subscriptions:
            subscriptions = subscriptions[0]
            obj = {"cancel_at": subscriptions['cancel_at'], "current_period_end": datetime.fromtimestamp(
                subscriptions['current_period_end']), "amount": subscriptions['plan']['amount'], "interval": subscriptions['plan']['interval'], "status": subscriptions['status'], "cancel_at_period_end": subscriptions['cancel_at_period_end']}
        # data = serializers.serialize('json', [obj,])
            return JsonResponse(obj)
        else:
            return Response(True)


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
        business.total_employees = 10
        business.subscription_cancellation = None
        business.save()

    return HttpResponse(status=200)
