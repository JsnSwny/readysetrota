from celery import shared_task
from .models import Shift
from time import sleep
from django.http import HttpResponse, FileResponse
from django import template
from django.core import mail
from django.template.loader import render_to_string
from operator import attrgetter
from itertools import groupby
from datetime import datetime, timedelta

@shared_task
def publish_email(shifts_list, owner_id):
    new_shifts = Shift.objects.filter(id__in=shifts_list)
    connection = mail.get_connection()
    shifts_sorted = sorted(new_shifts, key = attrgetter("employee.id"))
    shifts_unique = [list(grp) for k, grp in groupby(shifts_sorted, attrgetter("employee.id"))]
    email = []
    today_date = datetime.now().strftime("%d/%m/%Y")
    connection.open()
    for idx, val in enumerate(shifts_unique):
        
        employee = shifts_unique[idx][0].employee
        if employee.user:
            shifts = Shift.objects.filter(employee__user__id=employee.user.id, date__gte=datetime.now()).order_by('date')
            html_message = render_to_string("emailshifts.html", context = {'shifts': shifts, 'employee': employee})
            mail_item = mail.EmailMultiAlternatives("Rota Updated - " + today_date, "", "readysetrota@gmail.com", [employee.user.email])
            mail_item.attach_alternative(html_message, "text/html")
            email.append(mail_item)

    connection.send_messages(email)
    connection.close()
    return owner_id

