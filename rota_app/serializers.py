from rest_framework import serializers
from .models import Shift, Employee, Position, Department, Business, Availability, Site
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User
from datetime import datetime, timedelta, time, date
from django.db.models import Q

class BusinessSerializer(serializers.ModelSerializer):
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    name = serializers.CharField(required=False)
    class Meta:
        model = Business
        fields = ('id', 'name', 'plan', 'total_employees', 'subscription_cancellation', 'number_of_employees', 'trial_end',)

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(business=obj.id).distinct()
        return len(employees)


class BasicUserSerializer(serializers.ModelSerializer):
    business = BusinessSerializer()
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'business', 'number_of_employees',)
    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(position__department=obj.id).distinct()
        return len(employees)

class BasicDepartmentSerializer(serializers.ModelSerializer):
    business = BusinessSerializer(read_only=True)
    class Meta:
        model = Department
        fields = ('id', 'name', 'business',)
        depth = 1

class DepartmentSerializer(serializers.ModelSerializer):
    admins = BasicUserSerializer(read_only=True, many=True)
    admins_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='admins', write_only=True, many=True, required=False)
    owner = BasicUserSerializer(read_only=True)
    business = BusinessSerializer(read_only=True)
    business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source='business', write_only=True)
    site_id = serializers.PrimaryKeyRelatedField(queryset=Site.objects.all(), source='site', write_only=True)
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Department
        fields = ('id', 'name', 'admins', 'admins_id', 'owner', 'business', 'business_id', 'number_of_employees', 'site', 'site_id',)
        depth = 1

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(position__department=obj.id).distinct()
        return len(employees)

class PositionSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), source='department', write_only=True, required=False)
    business = BusinessSerializer(read_only=True)
    business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source='business', write_only=True, required=False)
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
    position_id = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(), source='position', write_only=True, many=True)
    business = BusinessSerializer(read_only=True)
    business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source='business', write_only=True)
    class Meta:
        model = Employee
        fields = ('__all__')


class EmployeeListSerializer(serializers.ModelSerializer):
    position = BasicPositionSerializer(read_only=True, many=True)
    business = BusinessSerializer(read_only=True)
    default_availability = serializers.JSONField()
    business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source='business', write_only=True)
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Employee
        fields = ('id', 'full_name', 'first_name', 'last_name', 'user', 'owner', 'position', 'business', 'business_id', 'default_availability',)
    def get_full_name(self, obj):
        if obj.first_name:
            return f'{obj.first_name} {obj.last_name}'
        return 'Open Shift'

class AdminEmployeeListSerializer(serializers.ModelSerializer):
    position = BasicPositionSerializer(read_only=True, many=True)
    business = BusinessSerializer(read_only=True)
    default_availability = serializers.JSONField()
    business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source='business', write_only=True)
    uuid = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    class Meta:
        model = Employee
        fields = ('id', 'full_name', 'first_name', 'last_name', 'uuid', 'user', 'owner', 'position', 'business', 'business_id', 'default_availability', 'wage', 'wage_type')
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
    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), source='employee', write_only=True, required=False, allow_null=True)
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), source='department', write_only=True, required=False)
    length = serializers.SerializerMethodField()
    position_id = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(), source='positions', write_only=True, many=True, required=False)
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
        fields = ('date', 'start_time', 'end_time', 'employee', 'break_length', 'positions', 'info', 'id', 'published', 'absence', 'department', 'department_id', 'employee_id', 'wage', 'length', 'position_id',)



class ShiftSerializer(ShiftListSerializer, serializers.ModelSerializer):
    start_time = serializers.SerializerMethodField(read_only=True)
    def get_start_time(self, obj):
        if obj.start_time:
            return str(obj.start_time)[0:5]

class AvailabilitySerializer(serializers.ModelSerializer):
    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, source='employee', write_only=True)
    site_id = serializers.PrimaryKeyRelatedField(queryset=Site.objects.all(), required=False, source='site', write_only=True)
    employee = ShiftEmployeeSerializer(read_only=True)

    class Meta:
        model = Availability
        fields = '__all__'
        depth = 1

class SiteSerializer(serializers.ModelSerializer):
    business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source='business', write_only=True)
    business = BusinessSerializer(required=False)
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    unpublished_shifts = serializers.SerializerMethodField(read_only=True)
    unmarked_holidays = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Site
        fields = ('id', 'name', 'business', 'business_id', 'admins', 'number_of_employees', 'unpublished_shifts', 'unmarked_holidays',)
        depth: 1

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(position__department__site=obj.id).distinct()
        return len(employees)
    def get_unpublished_shifts(self, obj):
        shifts = Shift.objects.filter(department__site=obj.id, published=False)
        return len(shifts)
    def get_unmarked_holidays(self, obj):
        holidays = Availability.objects.filter(Q(name="holiday") | Q(name="unavailable"), site=obj.id, approved=None, date__gte=date.today())
        return len(holidays)