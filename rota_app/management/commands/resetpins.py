from django.core.management.base import BaseCommand, CommandError
from rota_app.models import Department, Business, Employee, Site, UserProfile, Position, SiteSettings
from django.contrib.auth.models import User
import random
from django.contrib.auth.models import Group
from guardian.shortcuts import get_perms, remove_perm, assign_perm
from guardian.shortcuts import get_objects_for_user, get_user_perms, get_perms_for_model


class Command(BaseCommand):
    help = 'Resets Employee Pins'

    def handle(self, *args, **options):
        employees = Employee.objects.all()
        for employee in employees:
            number = random.randint(1000,9999)
            while len(Employee.objects.filter(pin=number)) > 0:
                number = random.randint(1000,9999)
            employee.pin = number
            print(employee.id, number)
            employee.save()
