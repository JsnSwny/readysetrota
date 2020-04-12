from rest_framework import serializers
from .models import Shift, Employee, Position, Department



class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'
        depth = 1
    

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
        depth = 1

class EmployeeSerializer(serializers.ModelSerializer):
    position = PositionSerializer(read_only=True)

    position_id = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(), source='position', write_only=True)
    

    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), source='department', write_only=True)

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
    
    class Meta:
        model = Shift
        fields = '__all__'
        depth = 1