from rest_framework import serializers
from .models import Shift, Employee, Position, Department, Business, Availability, Site, Forecast, SiteSettings
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User
from datetime import datetime, timedelta, time, date
from django.db.models import Q
from guardian.shortcuts import get_perms, remove_perm, assign_perm
from guardian.shortcuts import get_objects_for_user, get_user_perms, get_perms_for_model
import numpy as np


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ('id', 'forecasting', 'max_time', 'min_time',
                  'shift_approval', 'time_increment',)


class BusinessSerializer(serializers.ModelSerializer):
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    name = serializers.CharField(required=False)

    class Meta:
        model = Business
        fields = ('id', 'name', 'plan', 'total_employees',
                  'subscription_cancellation', 'number_of_employees', 'trial_end',)

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(business=obj.id).distinct()
        return len(employees)

    def create(self, validated_data):
        business = Business.objects.create(**validated_data)
        settings = Settings(business=business)
        settings.save()

        return business


class BasicUserSerializer(serializers.ModelSerializer):
    business = BusinessSerializer()
    number_of_employees = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',
                  'business', 'number_of_employees',)

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(
            position__department=obj.id).distinct()
        return len(employees)


class BasicDepartmentSerializer(serializers.ModelSerializer):
    business = BusinessSerializer(read_only=True)

    class Meta:
        model = Department
        fields = ('id', 'name', 'business',)
        depth = 1


class DepartmentSerializer(serializers.ModelSerializer):
    admins = BasicUserSerializer(read_only=True, many=True)
    admins_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(
    ), source='admins', write_only=True, many=True, required=False)
    owner = BasicUserSerializer(read_only=True)
    business = BusinessSerializer(read_only=True)
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True, required=False)
    site_id = serializers.PrimaryKeyRelatedField(
        queryset=Site.objects.all(), source='site', write_only=True, required=False)
    number_of_employees = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Department
        fields = ('id', 'name', 'admins', 'admins_id', 'owner', 'business',
                  'business_id', 'number_of_employees', 'site', 'site_id',)
        depth = 1

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(
            position__department=obj.id).distinct()
        return len(employees)


class PositionSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source='department', write_only=True, required=False)
    business = BusinessSerializer(read_only=True)
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True, required=False)

    class Meta:
        model = Position
        fields = '__all__'
        depth = 3


class BasicPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'name', 'department', 'order',)
        depth = 1


class EmployeeSerializer(serializers.ModelSerializer):
    position = PositionSerializer(read_only=True, many=True)
    default_availability = serializers.JSONField()
    position_id = serializers.PrimaryKeyRelatedField(
        queryset=Position.objects.all(), source='position', write_only=True, many=True)
    business = BusinessSerializer(read_only=True)
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True)
    site_permissions = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ('__all__')

    def get_site_permissions(self, obj):
        if(obj.user != None):
            user = obj.user
            site = obj.position.all().first().department.site
            return get_perms(user, site)
        return []

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        user = instance.user
        if user:
            site = instance.position.all().first().department.site

            permissions_query = self.context['request'].query_params.get(
                'permissions')
            permissions = []
            if permissions_query:
                permissions = self.context['request'].query_params.get(
                    'permissions')
                permissions = permissions.split(',') if isinstance(
                    permissions, str) else permissions

            all_perms = get_perms(user, site)
            diff = np.setdiff1d(all_perms, permissions)
            for i in diff:
                remove_perm(i, user, obj=site)

            for i in permissions:
                assign_perm(i, user, obj=site)

        return instance


class EmployeeListSerializer(serializers.ModelSerializer):
    position = BasicPositionSerializer(read_only=True, many=True)
    business = BusinessSerializer(read_only=True)
    default_availability = serializers.JSONField()
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True)
    full_name = serializers.SerializerMethodField()
    site_permissions = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ('id', 'full_name', 'first_name', 'last_name', 'user', 'owner',
                  'position', 'business', 'business_id', 'default_availability', 'site_permissions',)

    def get_site_permissions(self, obj):
        if(obj.user != None):
            user = obj.user
            site = obj.position.all().first().department.site
            return get_perms(user, site)
        return []

    def get_full_name(self, obj):
        if obj.first_name:
            return f'{obj.first_name} {obj.last_name}'
        return 'Open Shift'


class AdminEmployeeListSerializer(serializers.ModelSerializer):
    position = BasicPositionSerializer(read_only=True, many=True)
    business = BusinessSerializer(read_only=True)
    default_availability = serializers.JSONField()
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True)
    uuid = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    site_permissions = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'

    def get_site_permissions(self, obj):
        if(obj.user != None):
            user = obj.user
            site = obj.position.all().first().department.site
            return get_perms(user, site)
        return []

    class Meta:
        model = Employee
        fields = ('id', 'full_name', 'first_name', 'last_name', 'uuid', 'user', 'owner',
                  'position', 'business', 'business_id', 'default_availability', 'wage', 'wage_type', 'site_permissions',)

    def get_uuid(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        if(hasattr(user, 'business')):
            return obj.uuid
        else:
            return False


class CheckUUIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('__all__')
        depth = 1


class ShiftEmployeeSerializer(EmployeeListSerializer, serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'full_name', 'wage', 'wage_type',)


class ShiftListSerializer(serializers.ModelSerializer):
    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(
    ), source='employee', write_only=True, required=False, allow_null=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source='department', write_only=True, required=False)
    length = serializers.SerializerMethodField()
    position_id = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(
    ), source='positions', write_only=True, many=True, required=False)
    employee = ShiftEmployeeSerializer(read_only=True)

    def get_length(self, obj):
        if obj.end_time != "Finish":
            current_date = date.today()
            start = datetime.combine(current_date, obj.start_time)
            end_time = datetime.strptime(obj.end_time, '%H:%M')
            end = datetime.combine(current_date, end_time.time())
            if (end < start):
                end = end + timedelta(days=1)
            shift_length = round((end - start).total_seconds() / 3600, 2)
            return shift_length - (obj.break_length / 60)

    class Meta:
        model = Shift
        fields = ('date', 'start_time', 'end_time', 'open_shift', 'employee', 'break_length', 'positions', 'info', 'id',
                  'stage', 'absence', 'absence_info', 'department', 'department_id', 'employee_id', 'wage', 'length', 'position_id',)


class ShiftSerializer(ShiftListSerializer, serializers.ModelSerializer):
    start_time = serializers.SerializerMethodField(read_only=True)

    def get_start_time(self, obj):
        if obj.start_time:
            return str(obj.start_time)[0:5]


class AvailabilitySerializer(serializers.ModelSerializer):
    employee_id = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), required=False, source='employee', write_only=True)
    site_id = serializers.PrimaryKeyRelatedField(
        queryset=Site.objects.all(), required=False, source='site', write_only=True)
    employee = ShiftEmployeeSerializer(read_only=True)

    class Meta:
        model = Availability
        fields = '__all__'
        depth = 1


class SiteSerializer(serializers.ModelSerializer):
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True, required=False)
    business = BusinessSerializer(required=False)
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    unpublished_shifts = serializers.SerializerMethodField(read_only=True)
    unmarked_holidays = serializers.SerializerMethodField(read_only=True)
    sitesettings = SiteSettingsSerializer(many=False, required=False)
    name = serializers.CharField(required=False)
    permissions = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Site
        fields = ('id', 'name', 'business', 'business_id', 'admins',
                  'number_of_employees', 'unpublished_shifts', 'unmarked_holidays', 'sitesettings', 'permissions',)
        depth: 1

    def update(self, instance, validated_data):
        sitesettings = validated_data.pop('sitesettings', [])
        instance = super().update(instance, validated_data)
        if(sitesettings):
            settings = SiteSettings.objects.get(site=instance)
            for attr, value in sitesettings.items():
                setattr(settings, attr, value)

            settings.save()

        # user = self.context['request'].user
        # permissions = self.context['request'].query_params.get('permissions')
        # permissions = permissions.split(',') if isinstance(permissions, str) else permissions
        # all_perms = get_perms(user, instance)
        # diff = np.setdiff1d(all_perms,permissions)
        # for i in diff:
        #     print(f'Removing {i}')
        #     remove_perm(i, user, obj=instance)

        # for i in permissions:
        #     print(f'Assigning {i}')
        #     assign_perm(i, user, obj=instance)

        # print(get_perms(user, instance))

        return instance

    def get_permissions(self, obj):
        return get_perms(self.context['request'].user, obj)

    def create(self, validated_data):
        site = Site.objects.create(**validated_data)
        settings = SiteSettings(site=site)
        settings.save()
        all_perms = get_perms_for_model(Site)
        for i in all_perms:
            assign_perm(i.codename, site.business.owner, site)
        site.save()
        return site

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(
            position__department__site=obj.id).distinct()
        return len(employees)

    def get_unpublished_shifts(self, obj):
        shifts = Shift.objects.filter(
            department__site=obj.id, stage="Unpublished", date__gte=date.today())
        return len(shifts)

    def get_unmarked_holidays(self, obj):
        holidays = Availability.objects.filter(Q(name="holiday") | Q(
            name="unavailable"), site=obj.id, approved=None, date__gte=date.today())
        return len(holidays)


class ForecastSerializer(serializers.ModelSerializer):
    site_id = serializers.PrimaryKeyRelatedField(
        queryset=Site.objects.all(), source='site', write_only=True, required=False)

    class Meta:
        model = Forecast
        fields = ('id', 'date', 'site_id', 'amount',)
