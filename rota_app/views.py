from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee

# Create your views here.
class CheckUUID(APIView):
    def get(self, request):
        employee = Employee.objects.filter(uuid=request.query_params.get('uuid')).first()
        if employee:
            user = User.objects.filter(id=request.query_params.get('userid')).first()
            employee.user = user
            employee.save()
            return Response({"uuid": employee.name})