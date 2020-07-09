from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
import uuid
from datetime import datetime

class Department(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    owner = models.ForeignKey(User, related_name="departments", on_delete=models.CASCADE)

class Position(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    owner = models.ForeignKey(User, related_name="positions", on_delete=models.CASCADE)
    department = models.ForeignKey(Department, related_name="pos_department", on_delete=models.CASCADE)

class Employee(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    position = models.ManyToManyField(Position, related_name="position", blank=True)
    def __str__(self):
        return self.first_name + " " + self.last_name
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="employee")
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, related_name="employees", on_delete=models.CASCADE, blank=True)

class Shift(models.Model):
    employee = models.ForeignKey(Employee, related_name="shifts", on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.CharField(max_length=20)
    info = models.TextField(blank=True)
    department = models.ForeignKey(Department, related_name="shift_department", on_delete=models.CASCADE, null=True, blank=True)
    published = models.BooleanField(default=False)
    owner = models.ForeignKey(User, related_name="shifts", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'{self.id}. {self.date.strftime("%B %d %Y")} {str(self.start_time)[0:5]} - {self.end_time} ({self.owner.email})'

class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
  role = models.CharField(max_length=100)
  def __str__(self):
      return self.user.email