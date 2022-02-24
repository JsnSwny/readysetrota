from rest_framework import serializers
from .models import Shift, Employee, Position, Department, Business, Availability, Site, Forecast, SiteSettings, Wage, EmployeeStatus, TimeClock, Leave, PermissionType
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User
from datetime import datetime, timedelta, time, date
from django.db.models import Q
import numpy as np
import random

def gettingStartedValues(obj):
    uncomplete = []
    if Department.objects.filter(business=obj).count() == 0:
        uncomplete.append('departments')

    if Position.objects.filter(department__business=obj).count() == 0:
        uncomplete.append('positions')

    if Employee.objects.filter(position__department__business=obj).count() == 0:
        uncomplete.append('employees')

    if Shift.objects.filter(department__business=obj).count() == 0:
        uncomplete.append('shifts')

    if Shift.objects.filter(department__business=obj, stage="Published").count() == 0:
        uncomplete.append('publish')

    if Forecast.objects.filter(site__business=obj).count() == 0:
        uncomplete.append('forecast')
    return uncomplete

def getPermList(request, site=False):
    if not site:
        site = request.query_params.get('site', None)
    perm_list = []
    if site:
        site = Site.objects.get(pk=site)
        user = request.user
        
        if(Business.objects.filter(owner=user)):
            perm_list = list(PermissionType.objects.all().values_list('code_name'))
            perm_list = [item for t in perm_list for item in t]
        else:
            employee = Employee.objects.filter(user=user, position__department__site=site).first()

            perm_list = [perm.code_name for perm in employee.permissions.all()]
    return perm_list

def removeFields(ret, items):
    for i in items:
        if i in ret:
            ret.pop(i)
    return ret

class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ('id', 'forecasting', 'max_time', 'min_time',
                  'shift_approval', 'time_increment',)


class BusinessSerializer(serializers.ModelSerializer):
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    name = serializers.CharField(required=False)

    getting_started = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Business
        fields = ('id', 'name', 'plan', 'total_employees',
                  'subscription_cancellation', 'number_of_employees', 'trial_end', 'getting_started',)

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(business=obj.id, status__start_date__lte=date.today(
        )).filter(Q(status__end_date__gte=date.today()) | Q(status__end_date=None)).distinct()
        return len(employees)

    def get_getting_started(self, obj):
        return gettingStartedValues(obj)

    def create(self, validated_data):
        business = Business.objects.create(**validated_data)
        settings = Settings(business=business)
        settings.save()

        return business


    


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email',)

class BasicDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id', 'name',)

class PermissionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermissionType
        fields = '__all__'



class DepartmentSerializer(serializers.ModelSerializer):
    owner = BasicUserSerializer(read_only=True)
    business = BusinessSerializer(read_only=True)
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True, required=False)
    site_id = serializers.PrimaryKeyRelatedField(
        queryset=Site.objects.all(), source='site', write_only=True, required=False)
    number_of_employees = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Department
        fields = ('id', 'name', 'owner', 'business',
                  'business_id', 'number_of_employees', 'site', 'site_id',)
        depth = 1

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(
            position__department=obj.id, status__start_date__lte=date.today(
            )).filter(Q(status__end_date__gte=date.today()) | Q(status__end_date=None)).distinct()
        return len(employees)

class BasicPositionSerializer(serializers.ModelSerializer):
    department = BasicDepartmentSerializer(read_only=True)
    class Meta:
        model = Position
        fields = ('id', 'name', 'department',)

class PositionSerializer(BasicPositionSerializer, serializers.ModelSerializer):
    owner = BasicUserSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source='department', write_only=True, required=False)
    class Meta:
        model = Position
        fields = ('__all__')




class PermissionCodeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermissionType
        fields = ('id', 'code_name',)


class EmployeeSerializer(serializers.ModelSerializer):
    position = PositionSerializer(read_only=True, many=True)
    permissions = PermissionCodeNameSerializer(read_only=True, many=True)
    permissions_id = serializers.PrimaryKeyRelatedField(
        queryset=PermissionType.objects.all(), source='permissions', write_only=True, many=True, required=False)

    default_availability = serializers.JSONField(required=False)
    position_id = serializers.PrimaryKeyRelatedField(
        queryset=Position.objects.all(), source='position', write_only=True, many=True, required=False)
    business = BusinessSerializer(read_only=True)
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True, required=False)

    full_name = serializers.SerializerMethodField()

    wage = serializers.SerializerMethodField()
    current_wage = serializers.SerializerMethodField()
    current_status = serializers.SerializerMethodField()

    total_shifts = serializers.SerializerMethodField()

    def get_wage(self, instance):
        wages = instance.wage.all().order_by('-start_date')
        return WageSerializer(wages, read_only=True, many=True).data

    def get_total_shifts(self, obj):
        return Shift.objects.filter(employee=obj).count()

    def get_current_wage(self, instance):
        wage = instance.wage.all().filter(
            start_date__lte=datetime.now()).order_by('-start_date')
        if wage:
            wage = wage[0]
            return {'id': wage.id, 'type': wage.wage_type, 'amount': wage.wage, 'start_date': wage.start_date}
        return None
        # return (wage.wage_type, wage.wage)

    def get_current_status(self, instance):
        status = instance.status.all().order_by('-start_date')
        if status:
            status = status[0]
            return {'start_date': status.start_date, 'end_date': status.end_date}
        return None

    class Meta:
        model = Employee
        fields = ('__all__')

    def get_full_name(self, obj):
        if obj.first_name:
            return f'{obj.first_name} {obj.last_name}'
        return 'Open Shift'

    def update(self, instance, validated_data):
        last_archived_employee = Employee.objects.filter(
            business=validated_data.get('business'), archived=True).last()
        instance = super().update(instance, validated_data)

        user = instance.user

        start_date = self.context['request'].query_params.get(
            'start_date')

        wage_type = self.context['request'].query_params.get(
            'wage_type')

        wage = self.context['request'].query_params.get(
            'wage')

        start_working_date = self.context['request'].query_params.get(
            'start_working_date')
        end_working_date = self.context['request'].query_params.get(
            'end_working_date')

        current_status = EmployeeStatus.objects.filter(
            employee=instance).order_by('-start_date').first()

        if validated_data.get('archived') == True:
            if not current_status.end_date:
                current_status.end_date=datetime.today()
                current_status.save()

            Shift.objects.filter(
                employee=instance, date__gt=datetime.today()).delete()

        if start_working_date:
            if current_status and not current_status.end_date:
                current_status.start_date = start_working_date
                if end_working_date != "":
                    current_status.end_date = end_working_date
                current_status.save()
            else:
                new_status = EmployeeStatus(
                    employee=instance, start_date=start_working_date, end_date=end_working_date)
                new_status.save()
                if current_status:
                    start_date_obj = datetime.strptime(start_working_date, '%Y-%m-%d')
                    if(start_date_obj.date() == current_status.end_date):
                        current_status.delete()
                    else:
                        if current_status.end_date >= start_date_obj.date():
                            current_status.end_date = start_date_obj - timedelta(days=1)
                            current_status.save()
                    

        if wage:
            wage_obj = Wage.objects.filter(
                employee=instance).order_by('-start_date').first()
            if not wage_obj:
                wage_obj = Wage(employee=instance, wage_type=wage_type,
                                wage=wage, start_date=start_date)
                wage_obj.save()
            else:
                start_date_obj = datetime.strptime(start_date, '%Y-%m-%d')
                wage_obj.end_date = start_date_obj - timedelta(days=1)
                wage_obj.save()

                wage_obj = Wage(employee=instance, wage_type=wage_type,
                                wage=wage, start_date=start_date)
                wage_obj.save()

        instance.save()

        return instance

    def create(self, validated_data):
        position = validated_data.pop('position')
        permissions = validated_data.pop('permissions')

        site = self.context['request'].query_params.get('site')
        employee = Employee.objects.create(**validated_data)
        number = random.randint(1000,9999)
        while len(Employee.objects.filter(pin=number, position__department__site=site)) > 0:
            number = random.randint(1000,9999)
        employee.pin = number
        employee.position.set(position)
        employee.permissions.set(permissions)

        employee.save()
        
        start_date = self.context['request'].query_params.get(
            'start_date')

        wage_type = self.context['request'].query_params.get(
            'wage_type')

        wage = self.context['request'].query_params.get(
            'wage')

        if wage:
            wage_obj = Wage(employee=employee, wage_type=wage_type,
                            wage=wage, start_date=start_date)
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


class WageSerializer(serializers.ModelSerializer):
    wage = serializers.SerializerMethodField()

    def get_wage(self, obj):
        return int(obj.wage)

    class Meta:
        model = Wage
        fields = '__all__'



class MinEmployeeListSerializer(serializers.ModelSerializer):

    full_name = serializers.SerializerMethodField()
    wage = serializers.SerializerMethodField()
    current_wage = serializers.SerializerMethodField()
    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'

    def get_wage(self, instance):
        wages = instance.wage.all().order_by('-start_date')
        return WageSerializer(wages, read_only=True, many=True).data

    def get_current_wage(self, instance):
        wage = instance.wage.all().filter(
            start_date__lte=datetime.now()).order_by('-start_date')

        if wage:
            wage = wage[0]
            return {'id': wage.id, 'type': wage.wage_type, 'amount': wage.wage, 'start_date': wage.start_date}

    def to_representation(self, obj):
        ret = super(MinEmployeeListSerializer, self).to_representation(obj)

        perm_list = getPermList(self.context['request'])

        if 'view_wages' not in perm_list:
            removeFields(ret, ["current_wage", "wage"])

        return ret
        
    
    class Meta:
        model = Employee
        fields = ('id', 'full_name', 'position', 'wage', 'current_wage',)

class EmployeeListSerializer(MinEmployeeListSerializer, serializers.ModelSerializer):
    position = BasicPositionSerializer(read_only=True, many=True)
    permissions = PermissionCodeNameSerializer(read_only=True, many=True)
    default_availability = serializers.JSONField()
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True)
    
    
   
    current_status = serializers.SerializerMethodField()
    total_shifts = serializers.SerializerMethodField()

    user = BasicUserSerializer()

    def to_representation(self, obj):
        ret = super(EmployeeListSerializer, self).to_representation(obj)

        perm_list = getPermList(self.context['request'])

        if 'view_wages' not in perm_list:
            removeFields(ret, ["current_wage", "wage"])
        
        if 'manage_employees' not in perm_list:
            removeFields(ret, ["business", "permissions", "uuid", "owner", "archived", "pin", "created_at", "current_status", "user"])

        return ret

    def get_total_shifts(self, obj):
        return Shift.objects.filter(employee=obj).count()

    def get_current_status(self, instance):
        status = instance.status.all().order_by('-start_date')
        if status:
            status = status[0]
            return {'start_date': status.start_date, 'end_date': status.end_date}
        return None

    class Meta:
        model = Employee
        fields = ('id', 'full_name', 'first_name', 'last_name', 'uuid', 'user', 'owner',
                  'position', 'permissions', 'business', 'business_id', 'default_availability', 'wage', 'current_wage', 'current_status', 'archived', 'pin', 'created_at', 'user', 'total_shifts',)


class CheckUUIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('__all__')
        depth = 1


class ShiftEmployeeSerializer(EmployeeListSerializer, serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id',)


class TimeClockSerializer(serializers.ModelSerializer):
    employee = ShiftEmployeeSerializer(read_only=True)
    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(
    ), source='employee', write_only=True, required=False, allow_null=True)

    length = serializers.SerializerMethodField()

    clock_in = serializers.TimeField(format='%H:%M')
    clock_out = serializers.TimeField(format='%H:%M', required=False)

    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source='department', write_only=True, required=False)

    class Meta:
        model = TimeClock
        fields = ('id', 'clock_in', 'clock_out', 'break_length',
                  'employee', 'employee_id', 'length', 'stage', 'department', 'department_id', 'date', 'shift',)

    def get_length(self, obj):
        if obj.clock_in and obj.clock_out:
            current_date = date.today()
            start = datetime.combine(current_date, obj.clock_in)
            end = datetime.combine(current_date, obj.clock_out)
            if (end < start):
                end = end + timedelta(days=1)
            shift_length = round((end - start).total_seconds() / 3600, 2)
            return shift_length - (obj.break_length / 60)

class ShiftReadOnlySerializer(serializers.Serializer):
    length = serializers.SerializerMethodField(read_only=True)
    total_cost = serializers.SerializerMethodField(read_only=True)
    wage = serializers.SerializerMethodField(read_only=True)
    date = serializers.DateField(read_only=True)
    def get_wage(self, obj):
            employee = Employee.objects.get(id=obj.employee_id)
            wages = Wage.objects.filter(
                    employee=employee, start_date__lte=obj.date).filter(Q(end_date__gte=obj.date) | Q(end_date=None)).first()
            if wages:
                if wages.wage_type == "H":
                    return wages.wage
            return 0

    def get_length(self, obj):
        if obj.end_time and obj.end_time != 'Finish':
            current_date = date.today()
            start = datetime.combine(current_date, obj.start_time)

            end_time = datetime.strptime(obj.end_time, '%H:%M')
            end = datetime.combine(current_date, end_time.time())
            if (end < start):
                end = end + timedelta(days=1)
            shift_length = round((end - start).total_seconds() / 3600, 2)
            return shift_length - (obj.break_length / 60)
        return 0

    def get_total_cost(self, obj):
        return float(self.get_length(obj)) * float(self.get_wage(obj))

class ShiftListSerializer(serializers.ModelSerializer):
    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(
    ), source='employee', write_only=True, required=False, allow_null=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source='department', write_only=True, required=False)
    length = serializers.SerializerMethodField()
    position_id = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(
    ), source='positions', write_only=True, many=True, required=False)
    wage = serializers.SerializerMethodField()

    # timeclock = TimeClockSerializer(required=False)
    total_cost = serializers.SerializerMethodField()

    def to_representation(self, obj):
        ret = super(ShiftListSerializer, self).to_representation(obj)


        perm_list = getPermList(self.context['request'])

        if 'create_shifts' not in perm_list:
            removeFields(ret, ["absence", "absence_info"])
        if 'manage_timeclock' not in perm_list:
            removeFields(ret, ["timeclock"])
        if 'view_wages' not in perm_list:
            removeFields(ret, ["total_cost", "wage"])

        return ret 

    def get_wage(self, obj):
        if obj.employee_id:
            employee = Employee.objects.get(id=obj.employee_id)
            wages = Wage.objects.filter(
                    employee=employee, start_date__lte=obj.date).filter(Q(end_date__gte=obj.date) | Q(end_date=None)).first()
            if wages:
                if wages.wage_type == "H":
                    return wages.wage
        return 0

    def get_length(self, obj):
        if obj.end_time and obj.end_time != 'Finish':
            current_date = date.today()
            start = datetime.combine(current_date, obj.start_time)

            end_time = datetime.strptime(obj.end_time, '%H:%M')
            end = datetime.combine(current_date, end_time.time())
            if (end < start):
                end = end + timedelta(days=1)
            shift_length = round((end - start).total_seconds() / 3600, 2)
            return shift_length - (obj.break_length / 60)
        return 0

    def get_total_cost(self, obj):
        return float(self.get_length(obj)) * float(self.get_wage(obj))
        # float(self.get_length(obj)) * float(self.get_wage(obj))

    def create(self, validated_data):
        position = validated_data.pop('positions')
        timeclock = validated_data.pop('timeclock', [])
        instance = Shift.objects.create(**validated_data)
        instance.positions.set(position)
        end_time = None


        if instance.end_time != "Finish":
            end_time = datetime.strptime(instance.end_time, '%H:%M').time()

        tc = TimeClock(shift=instance, date=instance.date, clock_in=instance.start_time, clock_out=end_time, break_length=instance.break_length, employee=instance.employee, department=instance.department)

        tc.save()

        return instance

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)

        end_time = datetime.strptime(instance.end_time, '%H:%M').time()

        TimeClock.objects.filter(shift__id=instance.id).update(date=instance.date, clock_in=instance.start_time, clock_out=end_time, break_length=instance.break_length, employee=instance.employee)

        return instance

    class Meta:
        model = Shift
        fields = ('date', 'start_time', 'end_time', 'open_shift', 'employee', 'break_length', 'positions', 'info', 'id',
                  'stage', 'absence', 'absence_info', 'department', 'department_id', 'employee_id', 'wage', 'length', 'position_id', 'total_cost',)


class ShiftSerializer(ShiftListSerializer, serializers.ModelSerializer):
    start_time = serializers.SerializerMethodField(read_only=True)
    end_time = serializers.SerializerMethodField(read_only=True)

    def get_start_time(self, obj):
        if obj.start_time:
            return str(obj.start_time)[0:5]
    def get_end_time(self, obj):
        if obj.end_time != "Finish":
            return str(obj.end_time)[0:5]
        return str(obj.end_time)


class AvailabilityEmployeeSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        if obj.first_name:
            return f'{obj.first_name} {obj.last_name}'
        return 'Open Shift'
    class Meta:
        model = Employee
        fields = ('id', 'full_name',)

class TimeclockShiftSerializer(serializers.ModelSerializer):
    timeclock = TimeClockSerializer(required=False)
    class Meta:
        model = Shift
        fields = ('id', 'date', 'start_time', 'end_time', 'break_length', 'timeclock',)

class AvailabilitySerializer(serializers.ModelSerializer):
    employee_id = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), required=False, source='employee', write_only=True)
    site_id = serializers.PrimaryKeyRelatedField(
        queryset=Site.objects.all(), required=False, source='site', write_only=True)
    employee = AvailabilityEmployeeSerializer(read_only=True)

    class Meta:
        model = Availability
        fields = '__all__'
        # depth = 1

class LeaveSerializer(serializers.ModelSerializer):
    employee_id = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), required=False, source='employee', write_only=True)
    site_id = serializers.PrimaryKeyRelatedField(
        queryset=Site.objects.all(), required=False, source='site', write_only=True)
    employee = ShiftEmployeeSerializer(read_only=True)

    class Meta:
        model = Leave
        fields = '__all__'
        depth = 1


class SiteSerializer(serializers.ModelSerializer):
    business_id = serializers.PrimaryKeyRelatedField(
        queryset=Business.objects.all(), source='business', write_only=True, required=False)
    business = BusinessSerializer(required=False)
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    unpublished_shifts = serializers.SerializerMethodField(read_only=True)
    sitesettings = SiteSettingsSerializer(many=False, required=False)
    name = serializers.CharField(required=False)
    tasks = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Site
        fields = ('id', 'name', 'business', 'business_id', 
                  'number_of_employees', 'unpublished_shifts', 'sitesettings', 'tasks',)
        depth: 1

    def update(self, instance, validated_data):
        sitesettings = validated_data.pop('sitesettings', [])
        instance = super().update(instance, validated_data)
        if(sitesettings):
            settings = SiteSettings.objects.get(site=instance)
            for attr, value in sitesettings.items():
                setattr(settings, attr, value)

            settings.save()

        return instance


    def create(self, validated_data):
        site = Site.objects.create(**validated_data)
        settings = SiteSettings(site=site)
        settings.save()
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

    def get_tasks(self, obj):
        tasks = {}

        tasks["shifts"] = Shift.objects.filter(department__site=obj, stage="Unpublished").count()
        tasks["holidays"] = Leave.objects.filter(site=obj, status="Pending").count()
        tasks["uninvited"] = Employee.objects.filter(position__department__site=obj, user=None).count()
        tasks["actual_revenue"] = Forecast.objects.filter(actual=0, site=obj, date__lte=datetime.today()).count()


        return tasks



class ForecastSerializer(serializers.ModelSerializer):
    site_id = serializers.PrimaryKeyRelatedField(
        queryset=Site.objects.all(), source='site', write_only=True, required=False)

    class Meta:
        model = Forecast
        fields = ('id', 'date', 'site_id', 'predicted', 'labourGoal', 'actual',)

