from .models import Shift, Employee, Position, Department, ShiftSwap, Business, Availability
from rest_framework import viewsets, permissions
from .serializers import ShiftSerializer, EmployeeSerializer, PositionSerializer, DepartmentSerializer, ShiftSwapSerializer, BusinessSerializer, AvailabilitySerializer, ShiftListSerializer, EmployeeListSerializer
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
        

class BusinessFilter(django_filters.FilterSet):
    class Meta:
        model = Business
        fields = ['id']


class BusinessViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BusinessSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = BusinessFilter
    def get_queryset(self):
        return Business.objects.filter(owner=self.request.user)

class ShiftListViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ShiftListSerializer
    queryset = Shift.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = ShiftFilter
    ordering_fields = ('date', 'start_time')

class ShiftViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ShiftSerializer
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

    queryset = Employee.objects.all()

    def perform_create(self, serializer):
        business = self.request.user.business
        total_employees = business.total_employees
        current_employees = Employee.objects.filter(business=business)
        if len(current_employees) >= total_employees:
            return False
        serializer.save(owner=self.request.user)

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = EmployeeFilter
    ordering_fields = ('first_name',)

class EmployeeListViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EmployeeListSerializer

    queryset = Employee.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = EmployeeFilter
    ordering_fields = ('first_name',)

class PositionFilter(django_filters.FilterSet):
    department = django_filters.NumberFilter()
    department__business = django_filters.NumberFilter()
    class Meta:
        model = Position
        fields = ['department', 'department__business']

def clearEmployees(position):
    employees = Employee.objects.filter(position=position)
    for i in employees:
        if len(i.position.all()) <= 1:
            i.delete()
        else:
            shifts = Shift.objects.filter(employee=i)
            for j in shifts:
                if j.department == position.department:
                    j.delete()

class PositionViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PositionSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def destroy(self, request, *args, **kwargs):
        clearEmployees(self.get_object())
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
        if not hasattr(self.request.user, "business"):
            return Department.objects.filter(pos_department__position__user=self.request.user).distinct()
        else:
            return self.request.user.departments.all()
            

    def perform_create(self, serializer):
        business = self.request.user.business
        departments = Department.objects.filter(business=business)

        if business.plan == "F" and len(departments) >= 1:
            return False
        serializer.save(owner=self.request.user)


    def destroy(self, request, *args, **kwargs):
        positions = Position.objects.filter(department=self.get_object().id)
        for i in positions:
            clearEmployees(i)
            i.delete()
            
        return super(DepartmentViewSet, self).destroy(request, *args, **kwargs)


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



class AvailabilityFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    class Meta:
        model = Availability
        fields = ['employee__id', 'employee__user', 'employee__owner__id', 'employee__business', 'date', 'name']

class AvailabilityViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = AvailabilitySerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = AvailabilityFilter
    ordering_fields = ('date',)
    queryset = Availability.objects.all()


