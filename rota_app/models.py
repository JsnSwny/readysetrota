from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
import uuid


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
    name = models.CharField(max_length=100)
    position = models.ManyToManyField(Position, related_name="position", null=True, blank=True)
    def __str__(self):
        return self.name
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="employee")

    uuid = models.UUIDField(default=uuid.uuid4, editable=False)

    owner = models.ForeignKey(User, related_name="employees", on_delete=models.CASCADE, blank=True)


    # Create your models here.
class Shift(models.Model):
    employee = models.ForeignKey(Employee, related_name="shifts", on_delete=models.CASCADE, null=True, blank=True)
    
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.CharField(max_length=20)
    info = models.TextField(blank=True)

    department = models.ForeignKey(Department, related_name="shift_department", on_delete=models.CASCADE, null=True, blank=True)
    published = models.BooleanField(default=False)
    owner = models.ForeignKey(User, related_name="shifts", on_delete=models.CASCADE)

class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
  role = models.CharField(max_length=100)
  def __str__(self):
      return self.user.email