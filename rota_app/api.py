from .models import *
from rest_framework import viewsets, permissions
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django_filters import DateFilter
import django_filters
from django.db.models import Q
from .serializers import getPermList
from rest_framework import status
from rest_framework.response import Response
from .permissions import *
from .serializers import getPermList

# -------------
# MIXINS
# -------------

class ViewSetActionPermissionMixin:
    def get_permissions(self):
        try:
            return [
                permission()
                for permission in self.permission_action_classes[self.action]
            ]
        except KeyError:
            if self.action:
                action_func = getattr(self, self.action, {})
                action_func_kwargs = getattr(action_func, "kwargs", {})
                permission_classes = action_func_kwargs.get(
                    "permission_classes"
                )
            else:
                permission_classes = None

            return [
                permission()
                for permission in (
                    permission_classes or self.permission_classes
                )
            ]


# -------------
# BUSINESS
# -------------

class BusinessFilter(django_filters.FilterSet):
    class Meta:
        model = Business
        fields = ['id']

class BusinessViewSet(ViewSetActionPermissionMixin, viewsets.ModelViewSet):
    serializer_class = BusinessSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = BusinessFilter

    permission_action_classes = {
        'create': [CanCreateBusiness],
        'update': [CanModifyBusiness],
        'destroy': [CanModifyBusiness],
    }

    def get_queryset(self):
        return Business.objects.filter(owner=self.request.user)

# -------------
# SITES
# -------------

class SiteFilter(django_filters.FilterSet):
    class Meta:
        model = Employee
        fields = ['business']


class SiteViewSet(ViewSetActionPermissionMixin, viewsets.ModelViewSet):
    permission_action_classes = {
        'create': [CanCreateSites],
        'update': [CanModifySites],
        'destroy': [CanModifySites],
    }

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            business = self.request.user.business
            return Site.objects.filter(business=business).distinct()
        sites = Site.objects.filter(
            employee_site__user=self.request.user).distinct()

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

# -------------
# DEPARTMENTS
# -------------

class DepartmentFilter(django_filters.FilterSet):
    site = django_filters.NumberFilter(field_name='site__id')

    class Meta:
        model = Department
        fields = ['site', 'name']


class DepartmentViewSet(ViewSetActionPermissionMixin, viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = DepartmentFilter

    permission_action_classes = {
        'create': [CanCreateDepartments],
        'update': [CanModifyDepartments],
        'destroy': [CanModifyDepartments],
    }

    def destroy(self, request, *args, **kwargs):
        positions = Position.objects.filter(department=self.get_object().id)
        for i in positions:
            clearEmployees(i)
            i.delete()

        return super(DepartmentViewSet, self).destroy(request, *args, **kwargs)

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return Department.objects.filter(business=self.request.user.business)

        user_sites = Employee.objects.filter(user=self.request.user).values_list('site')

        departments = Department.objects.filter(
            Q(site__in=user_sites) | Q(owner=self.request.user))

        return departments

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# -------------
# POSITIONS
# -------------

class PositionFilter(django_filters.FilterSet):
    department = django_filters.NumberFilter()
    department__business = django_filters.NumberFilter()

    class Meta:
        model = Position
        fields = ['department', 'department__business',
                  'department__site', 'business', 'department__site']


class PositionViewSet(ViewSetActionPermissionMixin, viewsets.ModelViewSet):
    serializer_class = PositionSerializer

    permission_action_classes = {
        'create': [CanCreatePositions],
        'update': [CanModifyPositions],
        'destroy': [CanModifyPositions],
    }

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = PositionFilter

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return Position.objects.filter(department__business=self.request.user.business)

        user_sites = Employee.objects.filter(user=self.request.user).values_list('site')

        positions = Position.objects.filter(
            Q(department__site__in=user_sites) | Q(owner=self.request.user))

        return positions

class BasicPositionViewSet(PositionViewSet, viewsets.ModelViewSet):
    serializer_class = BasicPositionSerializer

# -------------
# EMPLOYEES
# -------------

class EmployeeFilter(django_filters.FilterSet):
    status__start_date = DateFilter(lookup_expr='lte')
    status__end_date = DateFilter(method='check_end_date')
    department = django_filters.NumberFilter(field_name='position__department')

    def check_end_date(self, queryset, name, value):
        return queryset.filter(Q(status__end_date__gte=value) | Q(status__end_date=None))

    class Meta:
        model = Employee
        fields = ['status__start_date', 'status__end_date', 'site', 'archived', 'department']


class EmployeeViewSet(ViewSetActionPermissionMixin, viewsets.ModelViewSet):

    permission_action_classes = {
        'create': [CanCreateEmployees],
        'update': [CanModifyEmployees],
        'destroy': [CanModifyEmployees],
    }

    def get_serializer_class(self):
        if self.action == 'list':
            management = self.request.query_params.get('management') == "True"

            if management:
                return EmployeeListSerializer
            else:
                return MinEmployeeListSerializer
        else:
            return EmployeeSerializer 

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            print(Employee.objects.filter(business=self.request.user.business))
            return Employee.objects.filter(business=self.request.user.business).distinct()

        user_employees = Employee.objects.filter(user=self.request.user).values_list('site')
        employees = Employee.objects.filter(
            site__in=user_employees).distinct()


        

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

# -------------
# SHIFTS
# -------------

class ShiftFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    department = django_filters.NumberFilter(distinct=True)
    department__site = django_filters.NumberFilter(distinct=True)
    absence__not = django_filters.CharFilter(
        field_name='absence', exclude=True)

    class Meta:
        model = Shift
        fields = ['date', 'employee', 'department', 'department__site',
                  'employee__user__id', 'absence__not', 'open', 'stage', 'site',]

class ShiftViewSet(ViewSetActionPermissionMixin, viewsets.ModelViewSet):

    permission_action_classes = {
        'create': [CanCreateShifts],
        'update': [CanModifyShifts],
        'destroy': [CanModifyShifts],
    }

    def get_serializer_class(self):
        if self.action == 'list':
            return ShiftSerializer
        else:
            return ShiftListSerializer  

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return Shift.objects.filter(site__business=self.request.user.business)

        user_sites = Employee.objects.filter(user=self.request.user).values_list('site')

        shifts = Shift.objects.filter(site__in=user_sites)
        return shifts

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = ShiftFilter
    ordering_fields = ('date', 'start_time')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# -------------
# AVAILABILITY
# -------------

class AvailabilityFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    class Meta:
        model = Availability
        fields = ['employee__id', 'employee__user', 'employee__owner__id', 'employee__business',
                  'date', 'name', 'status', 'employee__site']


class AvailabilityViewSet(viewsets.ModelViewSet):
    permission_action_classes = {
        'create': [IsAvailabilityOwner],
        'update': [IsAvailabilityOwner],
        'destroy': [IsAvailabilityOwner],
    }
    serializer_class = AvailabilitySerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = AvailabilityFilter
    ordering_fields = ('date',)

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return Availability.objects.filter(site__business=self.request.user.business)

        user_sites = Employee.objects.filter(user=self.request.user).values_list('site')

        availabilities = Availability.objects.filter(site__in=user_sites)
        return availabilities

# -------------
# FORECAST
# -------------

class ForecastFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()

    class Meta:
        model = Forecast
        fields = ['date', 'site__id']


class ForecastViewSet(ViewSetActionPermissionMixin, viewsets.ModelViewSet):
    serializer_class = ForecastSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = ForecastFilter
    ordering_fields = ('date',)

    permission_action_classes = {
        'create': [CanCreateForecast],
        'update': [CanModifyForecast],
        'destroy': [CanModifyForecast],
    }

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return Forecast.objects.filter(site__business=self.request.user.business)
        user_sites = Employee.objects.filter(user=self.request.user).values_list('site')
        forecasts = Forecast.objects.filter(site__in=user_sites)
        return forecasts

# -------------
# TIMECLOCK
# -------------

class TimeClockFilter(django_filters.FilterSet):
    class Meta:
        model = TimeClock
        fields = ['date', 'department', 'site']

class TimeClockViewSet(ViewSetActionPermissionMixin, viewsets.ModelViewSet):
    serializer_class = TimeClockSerializer
    queryset = TimeClock.objects.all()

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = TimeClockFilter

    permission_action_classes = {
        'create': [CanCreateTimeclock],
        'update': [CanModifyTimeclock],
        'destroy': [CanModifyTimeclock],
    }


    ordering_fields = ('date', 'start_time')

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return TimeClock.objects.filter(site__business=self.request.user.business)
        user_sites = Employee.objects.filter(user=self.request.user).values_list('site')
        timeclocks = TimeClock.objects.filter(site__in=user_sites)
        return timeclocks

# -------------
# LEAVE
# -------------

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

    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return Leave.objects.filter(site__business=self.request.user.business)
        user_sites = Employee.objects.filter(user=self.request.user).values_list('site')
        leaves = Leave.objects.filter(site__in=user_sites)
        return leaves

# -------------
# OTHER
# -------------

class SiteSettingsViewSet(viewsets.ModelViewSet):
    serializer_class = SiteSettingsSerializer
    
    def get_queryset(self):
        if hasattr(self.request.user, "business"):
            return SiteSettings.objects.filter(site__business=self.request.user.business)
        user_sites = Employee.objects.filter(user=self.request.user).values_list('site')
        settings = SiteSettings.objects.filter(site__in=user_sites)
        return settings

class PermissionTypeViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PermissionTypeSerializer
    queryset = PermissionType.objects.all()
