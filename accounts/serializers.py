from rest_framework import serializers
from django.contrib.auth.models import User
from rota_app.models import UserProfile, Employee, Department, Business, Position, Site
from django.contrib.auth import authenticate, logout
from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import Group
import json
import stripe

from rotaready.settings import STRIPE_SECRET_KEY

stripe.api_key = STRIPE_SECRET_KEY






class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('role',)

class BusinessSerializer(serializers.ModelSerializer):
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Business
        fields = ('id', 'name', 'plan', 'total_employees', 'subscription_cancellation', 'number_of_employees',)

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(business=obj.id).distinct()
        return len(employees)

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('__all__')

class BasicPositionSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Position
        fields = ('id', 'name', 'department',)
        depth = 1

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id', 'name',)

class EmployeeSerializer(serializers.ModelSerializer):
    position = BasicPositionSerializer(read_only=True, many=True)
    business = BusinessSerializer(read_only=True)
    default_availability = serializers.JSONField()
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'user', 'owner', 'position', 'business', 'default_availability', 'business_id',)

        # User Serializer
class UserSerializer(serializers.ModelSerializer):
    business = BusinessSerializer()
    all_permissions = serializers.SerializerMethodField()
    department_admin = DepartmentSerializer(read_only=True, many=True)
    employee = EmployeeSerializer(required=False, read_only=True, many=True)
    # site_admin = serializers.SerializerMethodField()
    def get_all_permissions(self, obj):
        permissions = []
        for i in obj.groups.all():
            for perm in i.permissions.all():
                permissions.append(perm.codename)
        for i in obj.user_permissions.all():
            permissions.append(i.codename)
        return list(dict.fromkeys(permissions))
    # def get_site_admin(self, obj):
    #     user_employees = Employee.objects.filter(user=obj.id, site_admin=True).distinct()
    #     site_ids = []
    #     for i in user_employees:
    #         print(i)
    #         site_id = Site.objects.filter(department_site__pos_department__position=i).first().id
    #         site_ids.append(site_id)
    #     return site_ids
         
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile', 'employee', 'all_permissions', 'groups', 'date_joined', 'business', 'department_admin',)
        depth = 3


# Register Serializers
class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True)
    businessName = serializers.CharField(write_only=True, required=False, allow_blank=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password2', 'role', 'businessName')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        errors = dict()
        try:
            validate_password(password)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        else:
            if User.objects.filter(username__iexact=validated_data['username']).exists():
                raise serializers.ValidationError({'username': 'A user with that username already exists.'})
            
            user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
            
            if validated_data['role'] == "Business":
                my_group = Group.objects.get(name='Business') 
                my_group.user_set.add(user) 
                customer = stripe.Customer.create(
                    description="",
                    name="",
                    email=validated_data['email']
                )
                business = Business(owner=user, name=validated_data['businessName'])
                business.save()
                profile = UserProfile(user=user, role=validated_data['role'], stripe_id=customer.id)
                site = Site(business=business, name="My First Site")
                site.save()
            else:
                profile = UserProfile(user=user, role=validated_data['role'])
            profile.save()
            return user

# Login Serializers
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class ChangePasswordSerializer(serializers.Serializer):
    model = User
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value
    