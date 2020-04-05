from django.db import models

class Position(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Department(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Employee(models.Model):
    name = models.CharField(max_length=100)
    position = models.ForeignKey(Position, related_name="position", on_delete=models.SET_NULL, null=True, blank=True)
    department = models.ForeignKey(Department, related_name="department", on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return self.name

    # Create your models here.
class Shift(models.Model):
    employee = models.ForeignKey(Employee, related_name="employee", on_delete=models.CASCADE, null=True, blank=True)
    
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    info = models.TextField()