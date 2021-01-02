from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
import uuid
from datetime import datetime
from jsonfield import JSONField

class Business(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return f'{self.name} - {self.owner}'
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="business")
    PLANS = [
        ("F", 'Free'),
        ("P", 'Premium'),
    ]
    plan = models.CharField(
        max_length=1,
        choices=PLANS,
        default="F",
    )
    total_employees = models.IntegerField(default=5)
    subscription_cancellation = models.DateField(null=True, blank=True)

class Site(models.Model):
    name = models.CharField(max_length=100)
    business = models.ForeignKey(Business, related_name="site_business", on_delete=models.CASCADE, null=True, blank=True)
    admins = models.ManyToManyField(User, related_name="site_admin", blank=True)

class Department(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return f'{self.name} - {self.owner}'
    owner = models.ForeignKey(User, related_name="departments", on_delete=models.CASCADE)
    admins = models.ManyToManyField(User, related_name="department_admin", blank=True)
    site = models.ForeignKey(Site, related_name="department_site", on_delete=models.CASCADE, null=True, blank=True)
    business = models.ForeignKey(Business, related_name="department_business", on_delete=models.CASCADE, null=True, blank=True)

class Position(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return f'{self.name} - {self.department.owner}'
    owner = models.ForeignKey(User, related_name="positions", on_delete=models.CASCADE)
    department = models.ForeignKey(Department, related_name="pos_department", on_delete=models.CASCADE)
    business = models.ForeignKey(Business, related_name="position_business", on_delete=models.CASCADE, null=True, blank=True)

def default_availability():
    return 
    {
        '0': {'name': 'unselected', 'start_time': None, 'end_time': None},
        '1': {'name': 'unselected', 'start_time': None, 'end_time': None},
        '2': {'name': 'unselected', 'start_time': None, 'end_time': None},
        '3': {'name': 'unselected', 'start_time': None, 'end_time': None},
        '4': {'name': 'unselected', 'start_time': None, 'end_time': None},
        '5': {'name': 'unselected', 'start_time': None, 'end_time': None},
        '6': {'name': 'unselected', 'start_time': None, 'end_time': None},
    }

class Employee(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    position = models.ManyToManyField(Position, related_name="position", blank=True)
    def __str__(self):
        return self.first_name + " " + self.last_name
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="employee")
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, related_name="employees", on_delete=models.CASCADE, blank=True)
    default_availability = JSONField(default=default_availability)
    business = models.ForeignKey(Business, related_name="employee_business", on_delete=models.CASCADE, null=True, blank=True)

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
    approved = models.BooleanField(null=True, blank=True)
    site = models.ForeignKey(Site, related_name="availability_site", on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return f'{self.date} - {self.name} - {self.employee}'




class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
  role = models.CharField(max_length=100)
  stripe_id = models.CharField(max_length=100, blank=True, null=True)
  
  def __str__(self):
      return self.user.email