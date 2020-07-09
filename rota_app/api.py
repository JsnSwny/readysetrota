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
from django.db.models import F, Case, When
# Booking Viewset


class ShiftFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    department = django_filters.NumberFilter(distinct=True)
    class Meta:
        model = Shift
        fields = ['date', 'employee', 'department']
        

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


class EmployeeFilter(django_filters.FilterSet):
    position__department = django_filters.NumberFilter(distinct=True)
    class Meta:
        model = Employee
        fields = ['position__department']

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
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = EmployeeFilter
    ordering_fields = ('first_name',)

class PositionFilter(django_filters.FilterSet):
    department = django_filters.NumberFilter()
    class Meta:
        model = Position
        fields = ['department']

        

class PositionViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PositionSerializer
    def get_queryset(self):
        return self.request.user.positions.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def destroy(self, request, *args, **kwargs):
        employees = Employee.objects.filter(position=self.get_object())
        for i in employees:
            if len(i.position.all()) <= 1:
                i.delete()
            else:
                shifts = Shift.objects.filter(employee=i)
                for j in shifts:
                    if j.department == self.get_object().department:
                        j.delete()
        return super(PositionViewSet, self).destroy(request, *args, **kwargs)

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = PositionFilter

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


