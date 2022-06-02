from django.forms import ValidationError
from django.shortcuts import render
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from . import serializers
from .serializers import ChangePasswordSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import UpdateAPIView
from django.contrib.auth.password_validation import validate_password
from rota_app.models import Employee
from django.core.exceptions import BadRequest
from django.http import JsonResponse
from django.core import serializers
from django.forms.models import model_to_dict
from django.core.mail import send_mail, send_mass_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

# Create your views here.
class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Verify(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        try:
            employee = Employee.objects.get(uuid=request.data['uuid'])
        except ValidationError:
            return JsonResponse({"has_error": True, "error": f'"{request.data["uuid"]}" is not a valid join ID'})

        if not employee:
            return JsonResponse({"has_error": True, "error": "The ID entered isn't associated with an employee."})
        if employee.user:
           return JsonResponse({"has_error": True, "error": "This ID is already associated with a user."})

        return JsonResponse({"has_error": False, "employee": model_to_dict(employee, fields=["first_name", "last_name", "email"]), "business": model_to_dict(employee.business, fields=["name"])})
        
class SendInvite(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        uuid = request.data['uuid']
        email = request.data['email']

        employee = Employee.objects.get(uuid=uuid)
        business = employee.business.name

        employee.has_been_invited = True

        print(employee)

        employee.save()

        data = {"uuid": uuid, "email": email, "business": business, "employee": employee}


        html_body = render_to_string("invite-template.html", data)

        message = EmailMultiAlternatives(
        subject='You have been invited to join readysetrota!',
        body="",
        from_email='readysetrota <jason@readysetrota.com>',
        to=[email]
        )
        message.attach_alternative(html_body, "text/html")
        message.send(fail_silently=False)

        return Response(True)