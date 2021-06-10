from rest_framework import serializers
from .models import Shift, Employee, Position, Department, Business, Availability, Site, Forecast, SiteSettings, Wage, EmployeeStatus, TimeClock
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
        employees = Employee.objects.filter(business=obj.id, status__start_date__lte=date.today(
        )).filter(Q(status__end_date__gte=date.today()) | Q(status__end_date=None)).distinct()
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
            position__department=obj.id, status__start_date__lte=date.today(
            )).filter(Q(status__end_date__gte=date.today()) | Q(status__end_date=None)).distinct()
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
            position__department=obj.id, status__start_date__lte=date.today(
            )).filter(Q(status__end_date__gte=date.today()) | Q(status__end_date=None)).distinct()
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

    wage = serializers.SerializerMethodField()
    current_wage = serializers.SerializerMethodField()
    current_status = serializers.SerializerMethodField()

    def get_wage(self, instance):
        wages = instance.wage.all().order_by('-start_date')
        return WageSerializer(wages, read_only=True, many=True).data

    def get_current_wage(self, instance):
        wage = instance.wage.all().filter(
            start_date__lte=datetime.now()).order_by('-start_date')
        if wage:
            wage = wage[0]
            return {'type': wage.wage_type, 'amount': wage.wage}
        return None
        # return (wage.wage_type, wage.wage)

    def get_current_status(self, instance):
        status = instance.status.all().filter(
            start_date__lte=datetime.now()).order_by('-start_date')
        if status:
            status = status[0]
            return {'start_date': status.start_date, 'end_date': status.end_date}
        return None

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
        last_archived_employee = Employee.objects.filter(
            business=validated_data.get('business'), archived=True).last()
        instance = super().update(instance, validated_data)
        user = instance.user

        wage_type = self.context['request'].query_params.get(
            'wage_type')

        wage = self.context['request'].query_params.get(
            'wage')

        start_working_date = self.context['request'].query_params.get(
            'start_working_date')
        end_working_date = self.context['request'].query_params.get(
            'end_working_date')

        if validated_data.get('archived') == True:
            instance.first_name = 'Anonymous'
            if last_archived_employee:
                value = int(
                    last_archived_employee.last_name.replace('Employee ', ''))
                instance.last_name = 'Employee ' + str(value + 1)
            else:
                instance.last_name = 'Employee 1'
            instance.save()

            shifts = Shift.objects.filter(
                employee=instance, date__gt=datetime.today()).delete()

        current_status = EmployeeStatus.objects.filter(
            employee=instance).order_by('-start_date').first()

        if start_working_date:
            if current_status:
                current_status.start_date = start_working_date
                if end_working_date != "":
                    current_status.end_date = end_working_date
                current_status.save()
            else:
                new_status = EmployeeStatus(
                    employee=instance, start_date=start_working_date, end_date=end_working_date)
                new_status.save()

        if wage:
            wage_obj = Wage.objects.filter(
                employee=instance).order_by('-start_date').first()

            if not wage_obj or wage_obj.wage_type != wage_type or wage_obj.wage != float(wage):
                if wage_obj and str(wage_obj.start_date) == datetime.now().strftime('%Y-%m-%d'):
                    wage_obj.wage = wage
                    wage_obj.wage_type = wage_type
                else:
                    if wage_obj:
                        wage_obj.end_date = datetime.now()
                    wage_obj = Wage(employee=instance, wage_type=wage_type,
                                    wage=wage, start_date=datetime.now())
                    wage_obj.save()

                if wage_obj:
                    wage_obj.save()

            shifts = Shift.objects.filter(
                date__gte=datetime.now(), employee=instance)
            if wage_obj and wage_obj.wage_type == "H":
                for i in shifts:
                    i.wage = wage_obj.wage
                    i.save()
            elif wage_obj and wage_obj.wage_type == "S":
                for i in shifts:
                    i.wage = 0
                    i.save()

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

    def create(self, validated_data):
        position = validated_data.pop('position')
        employee = Employee.objects.create(**validated_data)
        employee.position.set(position)

        wage_type = self.context['request'].query_params.get(
            'wage_type')

        wage = self.context['request'].query_params.get(
            'wage')

        wage_obj = Wage(employee=employee, wage_type=wage_type,
                        wage=wage, start_date=datetime.now())
        wage_obj.save()

        start_working_date = self.context['request'].query_params.get(
            'start_working_date')
        end_working_date = self.context['request'].query_params.get(
            'end_working_date')

        current_status = EmployeeStatus.objects.filter(
            employee=employee).order_by('-start_date').first()
        if start_working_date:
            if current_status:
                current_status.start_date = start_working_date
                if current_status.end_date != "":
                    current_status.end_date = end_working_date
                current_status.save()
            else:
                if end_working_date == "":
                    end_working_date = None
                new_status = EmployeeStatus(
                    employee=employee, start_date=start_working_date, end_date=end_working_date)
                new_status.save()

        return employee


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
                  'position', 'business', 'business_id', 'default_availability', 'site_permissions', 'archived',)

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


class WageSerializer(serializers.ModelSerializer):
    wage = serializers.SerializerMethodField()

    def get_wage(self, obj):
        return int(obj.wage)

    class Meta:
        model = Wage
        fields = '__all__'


class AdminEmployeeListSerializer(serializers.ModelSerializer):
    position = BasicPositionSerializer(read_only=True, many=True)
    business = BusinessSerializer(read_only=True)
    default_availability = serializers.JSONField()
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True)
    full_name = serializers.SerializerMethodField()
    site_permissions = serializers.SerializerMethodField()
    wage = serializers.SerializerMethodField()
    current_wage = serializers.SerializerMethodField()
    current_status = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'

    def get_site_permissions(self, obj):
        if(obj.user != None):
            user = obj.user
            site = obj.position.all().first().department.site
            return get_perms(user, site)
        return []

    def get_wage(self, instance):
        wages = instance.wage.all().order_by('-start_date')
        return WageSerializer(wages, read_only=True, many=True).data

    def get_current_wage(self, instance):
        wage = instance.wage.all().filter(
            start_date__lte=datetime.now()).order_by('-start_date')

        if wage:
            wage = wage[0]
            return {'type': wage.wage_type, 'amount': wage.wage}
        return None

    def get_current_status(self, instance):
        status = instance.status.all().filter(
            start_date__lte=datetime.now()).order_by('-start_date')
        if status:
            status = status[0]
            return {'start_date': status.start_date, 'end_date': status.end_date}
        return None

    class Meta:
        model = Employee
        fields = ('id', 'full_name', 'first_name', 'last_name', 'uuid', 'user', 'owner',
                  'position', 'business', 'business_id', 'default_availability', 'wage', 'current_wage', 'current_status', 'site_permissions', 'archived',)


class CheckUUIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('__all__')
        depth = 1


class ShiftEmployeeSerializer(EmployeeListSerializer, serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'full_name',)


class TimeClockSerializer(serializers.ModelSerializer):
    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(
    ), source='employee', write_only=True, required=False, allow_null=True)

    length = serializers.SerializerMethodField()

    class Meta:
        model = TimeClock
        fields = ('clock_in', 'clock_out', 'break_length',
                  'employee_id', 'length',)

    def get_length(self, obj):
        if obj.clock_in and obj.clock_out:
            current_date = date.today()
            start = datetime.combine(current_date, obj.clock_in)
            end = datetime.combine(current_date, obj.clock_out)
            if (end < start):
                end = end + timedelta(days=1)
            shift_length = round((end - start).total_seconds() / 3600, 2)
            return shift_length - (obj.break_length / 60)


class ShiftListSerializer(serializers.ModelSerializer):
    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(
    ), source='employee', write_only=True, required=False, allow_null=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source='department', write_only=True, required=False)
    length = serializers.SerializerMethodField()
    position_id = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(
    ), source='positions', write_only=True, many=True, required=False)
    employee = ShiftEmployeeSerializer(read_only=True)

    timeclock = TimeClockSerializer(required=False)

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

    def create(self, validated_data):
        position = validated_data.pop('positions')
        timeclock = validated_data.pop('timeclock', [])
        instance = Shift.objects.create(**validated_data)
        instance.positions.set(position)

        if(timeclock):
            tc, created = TimeClock.objects.get_or_create(
                shift=instance, defaults=timeclock)
            print(tc)
            print(created)
            print(timeclock)
            if not created:
                for attr, value in timeclock.items():
                    setattr(tc, attr, value)
            tc.save()
        print(timeclock)

        return instance

    def update(self, instance, validated_data):
        print("UPDATING")
        timeclock = validated_data.pop('timeclock', [])
        print(timeclock)
        instance = super().update(instance, validated_data)
        if(timeclock):
            print("UPDATING 2")
            tc, created = TimeClock.objects.get_or_create(
                shift=instance, defaults=timeclock)
            if not created:
                for attr, value in timeclock.items():
                    setattr(tc, attr, value)
                tc.save()
        return instance

    class Meta:
        model = Shift
        fields = ('date', 'start_time', 'end_time', 'open_shift', 'employee', 'break_length', 'positions', 'info', 'id',
                  'stage', 'absence', 'absence_info', 'department', 'department_id', 'employee_id', 'wage', 'length', 'position_id', 'timeclock',)


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
            position__department__site=obj.id, status__start_date__lte=date.today(
            )).filter(Q(status__end_date__gte=date.today()) | Q(status__end_date=None)).distinct()
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
