from .models import Shift, Employee, Position, Department
from rest_framework import viewsets, permissions
from .serializers import ShiftSerializer, EmployeeSerializer, PositionSerializer, DepartmentSerializer
from datetime import date
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters import FilterSet, DateFilter, DateRangeFilter
import django_filters
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
# Booking Viewset


class ShiftFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    class Meta:
        model = Shift
        fields = ['date']

class ShiftViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ShiftSerializer
    def get_queryset(self):
        if self.request.user.profile.role != "Business":
            return self.request.user.employee.first().owner.shifts.all()
        else:
            return self.request.user.shifts.all()
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = ShiftFilter
    ordering_fields = ('date', 'start_time')


class EmployeeViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EmployeeSerializer
    def get_queryset(self):
        if self.request.user.profile.role != "Business":
            return self.request.user.employee.first().owner.employees.all()
        else:
            return self.request.user.employees.all()
        

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # queryset = Employee.objects.all()
    
    # employee = Employee.objects.all().first()

    # employee.user = User.objects.filter(username="megan").first()
    # employee.save()

    # print(employee.shifts.all())
    # print(User.objects.filter(username="test24").first())

class PositionViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PositionSerializer
    def get_queryset(self):
        return self.request.user.positions.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    
    queryset = Position.objects.all()
    
class DepartmentViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DepartmentSerializer
    def get_queryset(self):
        return self.request.user.departments.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    queryset = Department.objects.all()


