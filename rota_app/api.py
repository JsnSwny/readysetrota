from .models import Shift, Employee, Position, Department, ShiftSwap
from rest_framework import viewsets, permissions
from .serializers import ShiftSerializer, EmployeeSerializer, PositionSerializer, DepartmentSerializer, ShiftSwapSerializer
from datetime import date
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters import FilterSet, DateFilter, DateRangeFilter
import django_filters
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import F, Case, When, Q
# Booking Viewset


class ShiftFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    department = django_filters.NumberFilter(distinct=True)
    class Meta:
        model = Shift
        fields = ['date', 'employee', 'department', 'employee__user__id']
        

class ShiftViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ShiftSerializer
    # def get_queryset(self):
    #     if self.request.user.profile.role != "Business":
    #         shifts = self.request.user.employee.first().owner.shifts.filter(employee__id=self.request.user.employee.first().id)
    #         for i in shifts:
    #             i.seen = True
    #             i.save()
    #         return self.request.user.employee.first().owner.shifts.all()
    #     else:
    #         return self.request.user.shifts.all()

    queryset = Shift.objects.all()

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
    
    # def get_queryset(self):
    #     if self.request.user.profile.role != "Business":
    #         return self.request.user.employee.first().owner.employees.all()
    #     else:
    #         return self.request.user.employees.all()
        
    queryset = Employee.objects.all()

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
        if self.request.user.profile.role != "Business":
            return Department.objects.filter(pos_department__position__user=self.request.user).distinct()
        else:
            return self.request.user.departments.all()
            

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ShiftSwapFilter(django_filters.FilterSet):

    q = django_filters.CharFilter(method='filter_q')

    def filter_q(self, qs, name, value):
        return qs.filter(
            Q(swap_to__employee__id=value) | Q(swap_from__employee__id=value)
        )

    class Meta:
        model = ShiftSwap
        fields = ['q']

class ShiftSwapViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ShiftSwapSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = ShiftSwapFilter
    
    def perform_create(self, serializer):
        shift_from = Shift.objects.filter(id=self.request.data['shift_from']).first()
        shift_to = Shift.objects.filter(id=self.request.data['shift_to']).first()
        
        swap_from = shift_from.employee.user
        swap_to = shift_to.employee.user

        serializer.save(swap_from=swap_from, swap_to=swap_to, shift_from=shift_from, shift_to=shift_to)

    queryset = ShiftSwap.objects.all()


