from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee, Shift
from django.db.models import Count

# Create your views here.
class CheckUUID(APIView):
    def get(self, request):
        employee = Employee.objects.filter(uuid=request.query_params.get('uuid')).first()
        if employee:
            user = User.objects.filter(id=request.query_params.get('userid')).first()
            employee.user = user
            employee.save()
            return Response({"uuid": employee.name})

class GetPopularTimes(APIView):
    def get(self, request):
        shifts = Shift.objects.filter(owner=self.request.user)
        most_common = shifts.values("start_time", "end_time", "owner").annotate(count=Count('start_time')).order_by("-count")[:10]
        return Response(most_common)