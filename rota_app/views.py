from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee, Shift
from django.db.models import Count
from .serializers import ShiftSerializer
from operator import attrgetter
from itertools import groupby
from datetime import datetime
from django.core.mail import send_mail, send_mass_mail
from django_xhtml2pdf.utils import generate_pdf
from django.http import HttpResponse
from django import template

# Create your views here.
class CheckUUID(APIView):
    def get(self, request, *args, **kwargs):
        try:
            employee = Employee.objects.filter(uuid=request.query_params.get('uuid')).first()
        except Exception as ex:
            return Response({'error': ex})
        if employee:
            if employee.user:
                return Response({'error': ["A user is already associated with this employee."]})
            user = User.objects.filter(id=request.query_params.get('userid')).first()
            employee.user = user
            employee.save()
            return Response({"department_id": employee.position.all().first().department.id})
        else:
            return Response(
                {"error": ["UUID does not match any employees."]}, 
            )

class GetPopularTimes(APIView):
    def get(self, request):
        shifts = Shift.objects.filter(owner=self.request.user)
        most_common = shifts.values("start_time", "end_time", "owner").annotate(count=Count('start_time')).order_by("-count")[:10]
        return Response(most_common)

class Publish(APIView):
    def get(self, request):
        
        shifts = Shift.objects.filter(owner=self.request.user, published=False)
        shifts_sorted = sorted(shifts, key = attrgetter("employee.id"))
        shifts_unique = [list(grp) for k, grp in groupby(shifts_sorted, attrgetter("employee.id"))]
        mail = []
        for i in shifts:
            i.published = True
            i.save()
        for idx, val in enumerate(shifts_unique):
            employee = shifts_unique[idx][0].employee
            body = "Your rota has been updated\n\n"
            for shift in sorted(shifts_unique[idx], key = attrgetter("date")):
                body += f'{shift.date.strftime("%d %B %Y")}\n{str(shift.start_time)[0:5]} - {shift.end_time}\n\n'
            body += "\n\nView your rota at www.readysetrota.com"
            if employee.user:
                mail_item = ("Rota Updated", body, "readysetrota@gmail.com", [employee.user.email])
                mail.append(mail_item)
                
        send_mass_mail(tuple(mail))

        ids = (o.id for o in shifts)
        
        return Response(ids)
    
class ExportShifts(APIView):
    def get(self, request):
        id = request.query_params.get('id')
        employee = Employee.objects.filter(id=id)[0]
        shifts = Shift.objects.filter(employee__id=id, published=True, date__gte=datetime.now()).order_by('date')
        resp = HttpResponse(content_type='application/pdf')
        resp['Content-Disposition'] = 'inline; filename="rota.pdf"'
        result = generate_pdf('shifts.html', file_object=resp, context = {'shifts': shifts, 'employee': employee}, )
        return result

class ExportAllShifts(APIView):
    def get(self, request):
        shifts = Shift.objects.filter(published=True, date__gte=request.query_params.get('start_date'), date__lte=request.query_params.get('end_date'), owner__id=request.query_params.get('id')).order_by('date')
        
        all_shifts = {}

        for i in shifts:
            all_shifts[i.date] = {}

        for i in all_shifts:
            all_shifts[i] = Shift.objects.filter(date=i, published=True, owner__id=request.query_params.get('id')).order_by('start_time')

        resp = HttpResponse(content_type='application/pdf')
        resp['Content-Disposition'] = 'inline; filename="rota.pdf"'
        result = generate_pdf('allshifts.html', file_object=resp, context = {'shifts': shifts, 'all_shifts': all_shifts}, )
        return result

