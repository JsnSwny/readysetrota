from rest_framework import serializers
from .models import Shift, Employee, Position, Department, ShiftSwap
from accounts.serializers import UserSerializer

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
        depth = 1

class PositionSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), source='department', write_only=True)
    class Meta:
        model = Position
        fields = '__all__'
        depth = 3

class EmployeeSerializer(serializers.ModelSerializer):
    position = PositionSerializer(read_only=True, many=True)

    position_id = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(), source='position', write_only=True, many=True)


    class Meta:
        model = Employee
        fields = ('__all__')
        depth = 1

class CheckUUIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('__all__')
        depth = 1

class ShiftSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)

    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), source='employee', write_only=True)

    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), source='department', write_only=True)
    
    class Meta:
        model = Shift
        fields = '__all__'
        depth = 2

class ShiftSwapSerializer(serializers.ModelSerializer):
    employee_approved = serializers.BooleanField(required=False)
    admin_approved = serializers.BooleanField(required=False)
    swap_from = UserSerializer(required=False)
    swap_to = UserSerializer(required=False)
    class Meta:
        model = ShiftSwap
        fields = '__all__'
        depth = 1