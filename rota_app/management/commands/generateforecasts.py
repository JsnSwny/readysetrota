from django.core.management.base import BaseCommand, CommandError
from rota_app.models import Department, Business, Employee, Site, UserProfile, Position, SiteSettings, Shift, Forecast
from django.contrib.auth.models import User
import random
from django.contrib.auth.models import Group
from guardian.shortcuts import get_perms, remove_perm, assign_perm
from guardian.shortcuts import get_objects_for_user, get_user_perms, get_perms_for_model
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Creates random forecasts'

    def add_arguments(self, parser):
        parser.add_argument('site_id', type=int, help='Indicates department ID to generate shifts for')

    def handle(self, *args, **kwargs):
        site_id = kwargs['site_id']

        site = Site.objects.get(pk=site_id)
        
        start_date = datetime.today() - timedelta(days=365)
        end_date = datetime.today() + timedelta(days=365)

        delta = end_date - start_date
        for i in range(delta.days+1):
            date = start_date + timedelta(days=i)
            
            predicted = random.randint(0, 4000)
            actual = random.randint(predicted-500,predicted+500)
            labourGoal = random.randint(5,50)

            forecast = Forecast(date=date, site=site, predicted=predicted, actual=actual, labourGoal=labourGoal)
            forecast.save()

        print("Done.")