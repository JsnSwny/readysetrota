from rest_framework import serializers
from .models import Shift, Employee, Position, Department, ShiftSwap, Business, Availability, Site
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User

class BusinessSerializer(serializers.ModelSerializer):
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Business
        fields = ('id', 'name', 'plan', 'total_employees', 'subscription_cancellation', 'number_of_employees',)

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
    # shifts = EmployeeShiftSerializer(read_only=True, many=True)
    position = PositionSerializer(read_only=True, many=True)
    default_availability = serializers.JSONField()
    position_id = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(), source='position', write_only=True, many=True)
    # owner = UserSerializer(read_only=True)
    # user = UserSerializer(read_only=True)
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
    uuid = serializers.SerializerMethodField()
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'uuid', 'user', 'owner', 'position', 'business', 'business_id', 'default_availability', 'wage', 'wage_type')
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

class ShiftListSerializer(serializers.ModelSerializer):
    department = BasicDepartmentSerializer(read_only=True)
    start_time = serializers.SerializerMethodField()
    def get_start_time(self, obj):
        return str(obj.start_time)[0:5]
    class Meta:
        model = Shift
        fields = ('date', 'start_time', 'end_time', 'employee', 'info', 'id', 'published', 'seen', 'department', 'positions')
        depth = 1

class ShiftSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    employee = EmployeeSerializer(read_only=True)
    position_id = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(), source='positions', write_only=True, many=True, required=False)

    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), source='employee', write_only=True, required=False, allow_null=True)

    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), source='department', write_only=True, required=False)
    
    class Meta:
        model = Shift
        fields = '__all__'
        depth = 1

class ShiftSwapSerializer(serializers.ModelSerializer):
    employee_approved = serializers.BooleanField(required=False)
    admin_approved = serializers.BooleanField(required=False)
    swap_from = UserSerializer(required=False)
    swap_to = UserSerializer(required=False)
    class Meta:
        model = ShiftSwap
        fields = '__all__'
        depth = 1

class AvailabilitySerializer(serializers.ModelSerializer):
    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), source='employee', write_only=True)
    site_id = serializers.PrimaryKeyRelatedField(queryset=Site.objects.all(), source='site', write_only=True)
    class Meta:
        model = Availability
        fields = '__all__'
        depth = 1

class SiteSerializer(serializers.ModelSerializer):
    business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source='business', write_only=True)
    business = BusinessSerializer(required=False)
    class Meta:
        model = Site
        fields = ('id', 'name', 'business', 'business_id', 'admins',)
        depth: 1