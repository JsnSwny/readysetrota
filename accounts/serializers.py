from rest_framework import serializers
from django.contrib.auth.models import User
from rota_app.models import UserProfile, Employee, Department
from django.contrib.auth import authenticate
import json







class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('role',)

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('name')

        # User Serializer
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'user_permissions', 'profile', 'employee')
        depth = 3


# Register Serializers
class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True)

    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password2', 'role')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        else:

            user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

    
            profile = UserProfile(user=user, role=validated_data['role'])
            profile.save() 
            if validated_data['role'] == "Business":
                department = Department(owner=user, name="Department 1")
                department.save()
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