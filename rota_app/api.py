from .models import *
from rest_framework import viewsets, permissions
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django_filters import DateFilter
import django_filters
from django.db.models import Q


class ShiftFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    department = django_filters.NumberFilter(distinct=True)
    department__site = django_filters.NumberFilter(distinct=True)
    absence__not = django_filters.CharFilter(
        field_name='absence', exclude=True)

    class Meta:
        model = Shift
        fields = ['date', 'employee', 'department', 'department__site',
                  'employee__user__id', 'absence__not', 'open_shift', 'stage',]

class ShiftViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.action == 'list':
            return ShiftSerializer
        else:
            return ShiftListSerializer  

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return Shift.objects.filter(department__site__business=self.request.user.business)

        user_departments = Employee.objects.filter(user=self.request.user).values_list('position__department')

        shifts = Shift.objects.filter(department__in=user_departments)
        return shifts

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = ShiftFilter
    ordering_fields = ('date', 'start_time')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EmployeeFilter(django_filters.FilterSet):
    status__start_date = DateFilter(lookup_expr='lte')
    status__end_date = DateFilter(method='check_end_date')
    site = django_filters.NumberFilter(field_name='position__department__site')

    def check_end_date(self, queryset, name, value):
        return queryset.filter(Q(status__end_date__gte=value) | Q(status__end_date=None))

    class Meta:
        model = Employee
        fields = ['status__start_date', 'status__end_date', 'site', 'archived']


class EmployeeViewSet(viewsets.ModelViewSet):

    queryset = Employee.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            management = self.request.query_params.get('management') == "True"

            print(management)

            if management:
                return EmployeeListSerializer
            else:
                return MinEmployeeListSerializer
        else:
            return EmployeeSerializer  

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return Employee.objects.filter(position__department__site__business=self.request.user.business)

        user_employees = Employee.objects.filter(user=self.request.user).values_list('position__department__site')
        employees = Employee.objects.filter(
            position__department__site__in=user_employees)

        return employees

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
    ordering_fields = ('archived', 'first_name', 'last_name',)


class BusinessFilter(django_filters.FilterSet):
    class Meta:
        model = Business
        fields = ['id']


class BusinessViewSet(viewsets.ModelViewSet):
    serializer_class = BusinessSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = BusinessFilter

    def get_queryset(self):
        return Business.objects.filter(owner=self.request.user)

class TimeClockFilter(django_filters.FilterSet):
    class Meta:
        model = TimeClock
        fields = ['date', 'department', 'department__site']

class TimeClockViewSet(viewsets.ModelViewSet):
    serializer_class = TimeClockSerializer
    queryset = TimeClock.objects.all()

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = TimeClockFilter


    ordering_fields = ('date', 'start_time')




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
    site = django_filters.NumberFilter(field_name='site__id')

    class Meta:
        model = Department
        fields = ['site', 'name']


class DepartmentViewSet(viewsets.ModelViewSet):
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

        user_departments = Employee.objects.filter(user=self.request.user).values_list('position__department')

        departments = Department.objects.filter(
            Q(id__in=user_departments) | Q(owner=self.request.user))

        return departments

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AvailabilityFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    class Meta:
        model = Availability
        fields = ['employee__id', 'employee__user', 'employee__owner__id', 'employee__business',
                  'date', 'name', 'status', 'employee__position__department__site']


class AvailabilityViewSet(viewsets.ModelViewSet):
    serializer_class = AvailabilitySerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = AvailabilityFilter
    ordering_fields = ('date',)
    queryset = Availability.objects.all().distinct()


class LeaveFilter(django_filters.FilterSet):
    start_date = DateFilter(lookup_expr='lte')
    end_date = DateFilter(lookup_expr='gte')

    class Meta:
        model = Leave
        fields = ['site__id', 'employee__id', 'employee__user', 'status', 'employee__business',
                  'start_date', 'end_date']


class LeaveViewSet(viewsets.ModelViewSet):
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
    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            business = self.request.user.business
            return Site.objects.filter(business=business).distinct()
        sites = Site.objects.filter(
            department_site__pos_department__position__user=self.request.user).distinct()

        return sites

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
    serializer_class = ForecastSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = ForecastFilter
    ordering_fields = ('date',)
    queryset = Forecast.objects.all()


class SiteSettingsViewSet(viewsets.ModelViewSet):
    serializer_class = SiteSettingsSerializer
    queryset = SiteSettings.objects.all()

class PermissionTypeViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PermissionTypeSerializer
    queryset = PermissionType.objects.all()

class WageViewSet(viewsets.ModelViewSet):
    queryset = Wage.objects.all()