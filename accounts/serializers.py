from rest_framework import serializers
from django.contrib.auth.models import User
from rota_app.models import UserProfile, Shift, Checklist, Employee, Department, Business, Position, Site, SiteSettings, PermissionType
from django.contrib.auth import authenticate, logout
from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import Group
import json
import stripe
from guardian.shortcuts import get_perms, remove_perm, assign_perm
from guardian.shortcuts import get_objects_for_user, get_user_perms, get_perms_for_model
import datetime

from rotaready.settings import STRIPE_SECRET_KEY

stripe.api_key = STRIPE_SECRET_KEY

def gettingStartedValues(obj):
    values = {'has_created_department': False, 'has_created_position': False, 'has_created_employee': False, 'has_created_shift': False, 'has_invited_employee': False, 
    'has_created_account': True}

    if Department.objects.filter(business=obj).count() > 0:
        values['has_created_department'] = True

    if Position.objects.filter(department__business=obj).count() > 0:
        values['has_created_position'] = True

    if Employee.objects.filter(site__business=obj).count() > 0:
        values['has_created_employee'] = True

    if Shift.objects.filter(site__business=obj).count() > 0:
        values['has_created_shift'] = True

    if Employee.objects.filter(site__business=obj, has_been_invited=True).count() > 0:
        values['has_invited_employee'] = True
    return values


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('role',)

class ChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checklist
        fields = ('has_created_employee', 'has_created_shift', 'has_invited_employee', 'has_created_position', 'has_created_department', 'has_created_account',)


class BusinessSerializer(serializers.ModelSerializer):
    number_of_employees = serializers.SerializerMethodField(read_only=True)
    checklist = ChecklistSerializer(read_only=True)
    getting_started = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Business
        fields = ('id', 'name', 'plan', 'total_employees',
                  'subscription_cancellation', 'number_of_employees', 'trial_end', 'show_welcome', 'checklist', 'getting_started')

    def get_number_of_employees(self, obj):
        employees = Employee.objects.filter(business=obj.id).distinct()
        return len(employees)

    def get_getting_started(self, obj):
        return gettingStartedValues(obj)


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

class PermissionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermissionType
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    position = BasicPositionSerializer(read_only=True, many=True)
    business = BusinessSerializer(read_only=True)
    default_availability = serializers.JSONField()
    permissions = PermissionTypeSerializer(read_only=True, many=True)

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'user', 'owner',
                  'position', 'permissions', 'business', 'default_availability', 'business_id', 'pin',)

        # User Serializer


class UserSerializer(serializers.ModelSerializer):
    business = BusinessSerializer()
    employee = EmployeeSerializer(required=False, read_only=True, many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'profile', 'employee',
                  'groups', 'date_joined', 'business',)
        depth = 3


# Register Serializers
class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True)
    businessName = serializers.CharField(
        write_only=True, required=False, allow_blank=True)
    numberOfEmployees = serializers.IntegerField(
        write_only=True, required=False)
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    code = serializers.UUIDField(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password2',
                  'role', 'businessName', 'first_name', 'last_name', 'numberOfEmployees', 'code',)
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
            print(errors)
            raise serializers.ValidationError(errors)

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'})
        else:
            if User.objects.filter(username__iexact=validated_data['username']).exists():
                raise serializers.ValidationError(
                    {'username': 'A user with that username already exists.'})

            user = User.objects.create_user(
                validated_data['username'], validated_data['email'], validated_data['password'])
            user.first_name = validated_data['first_name']
            user.last_name = validated_data['last_name']
            user.save()
            if validated_data['role'] == "Business":
                business = Business(owner=user, name=validated_data['businessName'], plan="P")

                profile = UserProfile(
                    user=user, role=validated_data['role'])

                customer = stripe.Customer.create(
                    name=validated_data['businessName'],
                    email=validated_data['email']
                )

                # trial_date = datetime.datetime.today() + datetime.timedelta(minutes=2)
                trial_date = datetime.datetime.today() + datetime.timedelta(30)

                subscription = stripe.Subscription.create(
                    customer=customer.id,
                    items=[
                        {
                        'price': 'price_1L98I6E5eS8rS5Q2e8R6aPTe',
                        'quantity': validated_data['numberOfEmployees']
                        },
                    ],
                    trial_end=trial_date,
                    
                )

                business.total_employees = validated_data['numberOfEmployees']
                business.subscription_id = subscription.id
                profile.stripe_id = customer.id
                business.subscription_status = subscription.status

                

                business.save()

                checklist = Checklist(business=business)
                checklist.has_created_account = True
                checklist.save()

                site = Site(business=business, name="My First Site")
                site.save()

                settings = SiteSettings(site=site)
                settings.save()
            else:
                profile = UserProfile(user=user, role=validated_data['role'])
                code = validated_data['code']
                employee = Employee.objects.get(uuid=code)
                employee.user = user
                employee.save()
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
