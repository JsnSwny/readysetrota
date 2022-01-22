from django.core.management.base import BaseCommand, CommandError
from rota_app.models import Department, Business, Employee, Site, UserProfile, Position, SiteSettings, Shift
from django.contrib.auth.models import User
import random
from django.contrib.auth.models import Group
from guardian.shortcuts import get_perms, remove_perm, assign_perm
from guardian.shortcuts import get_objects_for_user, get_user_perms, get_perms_for_model
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Creates random shifts'

    def add_arguments(self, parser):
        parser.add_argument('department_id', type=int, help='Indicates department ID to generate shifts for')

    def handle(self, *args, **kwargs):
        department_id = kwargs['department_id']

        department = Department.objects.get(pk=department_id)

        employees = Employee.objects.filter(position__department=department)
        
        start_date = datetime.today() - timedelta(days=365)
        end_date = datetime.today() + timedelta(days=365)

        delta = end_date - start_date
        for i in range(delta.days+1):
            date = start_date + timedelta(days=i)
            repeats = random.randint(0,len(employees))
            for j in range(repeats):
                employee = employees[random.randint(0, len(employees)-1)]
                shift = Shift(date=date, start_time="09:00", end_time="17:00", employee=employee, department=department, stage="Published", owner=department.owner)
                shift.save()