from .models import Shift, Employee, Position, Department, Business, Availability, Site, Forecast, SiteSettings, Leave
from rest_framework import viewsets, permissions
from .serializers import (ShiftSerializer, EmployeeSerializer, PositionSerializer,
                          DepartmentSerializer, BusinessSerializer, AvailabilitySerializer,
                          ShiftListSerializer, EmployeeListSerializer, SiteSerializer, AdminEmployeeListSerializer,
                          BasicPositionSerializer, ForecastSerializer, SiteSettingsSerializer, LeaveSerializer)
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
    absence__not = django_filters.CharFilter(
        field_name='absence', exclude=True)

    class Meta:
        model = Shift
        fields = ['date', 'employee', 'department', 'department__site',
                  'employee__user__id', 'absence__not', 'open_shift']


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
    status__start_date = DateFilter(lookup_expr='lte')
    status__end_date = DateFilter(method='check_end_date')

    def check_end_date(self, queryset, name, value):
        return queryset.filter(Q(status__end_date__gte=value) | Q(status__end_date=None))

    class Meta:
        model = Employee
        fields = ['status__start_date', 'status__end_date', 'position__department',
                  'position__department__site', 'business', 'archived']


class EmployeeViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EmployeeSerializer

    queryset = Employee.objects.all()

    def perform_create(self, serializer):
        business = int(self.request.query_params.get('business'))
        business = Business.objects.filter(id=business).first()
        total_employees = business.total_employees
        current_employees = Employee.objects.filter(business=business)
        if len(current_employees) >= total_employees:
            return False
        serializer.save(owner=self.request.user)

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = EmployeeFilter
    ordering_fields = ('first_name', 'archived', 'last_name',)


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
    ordering_fields = ('first_name', 'archived', 'last_name',)


class AdminEmployeeListViewSet(EmployeeListViewSet, viewsets.ModelViewSet):
    serializer_class = AdminEmployeeListSerializer


class PositionFilter(django_filters.FilterSet):
    department = django_filters.NumberFilter()
    department__business = django_filters.NumberFilter()

    class Meta:
        model = Position
        fields = ['department', 'department__business',
                  'department__site', 'business', 'department__site']


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


class BasicPositionViewSet(PositionViewSet, viewsets.ModelViewSet):
    serializer_class = BasicPositionSerializer


class DepartmentFilter(django_filters.FilterSet):
    site__id = django_filters.NumberFilter()

    class Meta:
        model = Department
        fields = ['site__id', 'name']


class DepartmentViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = DepartmentFilter

    def destroy(self, request, *args, **kwargs):
        positions = Position.objects.filter(department=self.get_object().id)
        for i in positions:
            clearEmployees(i)
            i.delete()

        return super(DepartmentViewSet, self).destroy(request, *args, **kwargs)

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return Department.objects.filter(business=self.request.user.business)

        departments = Department.objects.filter(
            pos_department__position__user=self.request.user)
        for i in self.request.user.site_admin.all():
            departments = departments | Department.objects.filter(site=i)

        return departments.distinct()

    def perform_create(self, serializer):
        business = int(self.request.query_params.get('business'))
        business = Business.objects.filter(id=business).first()
        departments = Department.objects.filter(business=business)

        if business.plan == "F" and len(departments) >= 1:
            return False
        serializer.save(owner=self.request.user)


class AvailabilityFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    unmarked = django_filters.BooleanFilter(
        field_name='approved', lookup_expr='isnull')

    class Meta:
        model = Availability
        fields = ['employee__id', 'employee__user', 'employee__owner__id', 'unmarked', 'employee__business',
                  'unmarked', 'date', 'name', 'approved', 'employee__position__department__site']


class AvailabilityViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = AvailabilitySerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = AvailabilityFilter
    filter_fields = {'approved': ['isnull']}
    ordering_fields = ('date',)
    queryset = Availability.objects.all().distinct()


class LeaveFilter(django_filters.FilterSet):
    start_date = DateFilter(lookup_expr='lte')
    end_date = DateFilter(lookup_expr='gte')

    class Meta:
        model = Leave
        fields = ['employee__id', 'employee__user', 'employee__business',
                  'start_date', 'end_date']


class LeaveViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = LeaveSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = LeaveFilter
    filter_fields = {'approved': ['isnull']}
    ordering_fields = ('created_at',)
    queryset = Leave.objects.all().distinct()


class SiteFilter(django_filters.FilterSet):
    class Meta:
        model = Employee
        fields = ['business']


class SiteViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            business = self.request.user.business
            return Site.objects.filter(business=business)
        sites = Site.objects.filter(
            department_site__pos_department__position__user=self.request.user)
        sites = sites | self.request.user.site_admin.all()

        return sites.distinct()

    def destroy(self, request, *args, **kwargs):
        departments = Department.objects.filter(site=self.get_object().id)
        for i in departments:
            positions = Position.objects.filter(department=i.id)
            for j in positions:
                clearEmployees(j)
                j.delete()

        return super(SiteViewSet, self).destroy(request, *args, **kwargs)
    serializer_class = SiteSerializer


class ForecastFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()

    class Meta:
        model = Forecast
        fields = ['date', 'site__id']


class ForecastViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ForecastSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = ForecastFilter
    ordering_fields = ('date',)
    queryset = Forecast.objects.all()


class SiteSettingsViewSet(viewsets.ModelViewSet):
    serializer_class = SiteSettingsSerializer
    queryset = SiteSettings.objects.all()
