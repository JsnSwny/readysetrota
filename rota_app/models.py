from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
import uuid
from datetime import datetime

class Business(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return f'{self.name} - {self.owner}'
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="business")

class Department(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return f'{self.name} - {self.owner}'
    owner = models.ForeignKey(User, related_name="departments", on_delete=models.CASCADE)

class Position(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return f'{self.name} - {self.department.owner}'
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
    seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.id}. {self.date.strftime("%B %d %Y")} {str(self.start_time)[0:5]} - {self.end_time} ({self.owner.email})'

class ShiftSwap(models.Model):
    swap_from = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="swap_from")
    swap_to = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="swap_to")
    shift_from = models.ForeignKey(Shift, on_delete=models.CASCADE, related_name="shift_from")
    shift_to = models.ForeignKey(Shift, on_delete=models.CASCADE, related_name="shift_to")
    employee_approved = models.BooleanField(null=True)
    admin_approved = models.BooleanField(null=True)
    created_at = models.DateTimeField(auto_now_add=True) 

class Availability(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.CharField(max_length=20, null=True, blank=True)
    info = models.TextField(blank=True, null=True)
    employee = models.ForeignKey(Employee, related_name="availability", on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.date} - {self.name} - {self.employee}'

class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
  role = models.CharField(max_length=100)
  def __str__(self):
      return self.user.email