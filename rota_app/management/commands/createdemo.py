from django.core.management.base import BaseCommand, CommandError
from rota_app.models import Department, Business, Employee, Site, UserProfile, Position
from django.contrib.auth.models import User
import random
from django.contrib.auth.models import Group


class Command(BaseCommand):
    help = 'Creates a demo account'

    def handle(self, *args, **options):
        demo_number = random.randint(0, 1000)
        user = False
        default_availability = {
            '0': {'name': 'unselected', 'start_time': None, 'end_time': None},
            '1': {'name': 'unselected', 'start_time': None, 'end_time': None},
            '2': {'name': 'unselected', 'start_time': None, 'end_time': None},
            '3': {'name': 'unselected', 'start_time': None, 'end_time': None},
            '4': {'name': 'unselected', 'start_time': None, 'end_time': None},
            '5': {'name': 'unselected', 'start_time': None, 'end_time': None},
            '6': {'name': 'unselected', 'start_time': None, 'end_time': None},
        }
        while not user:
            try:
                user = User.objects.get(username=f'demo{demo_number}')
            except User.DoesNotExist:
                random_password = User.objects.make_random_password()
                user = User.objects.create_user(username=f'demo{demo_number}@demo.com',
                                                email=f'demo{demo_number}@demo.com',
                                                password=random_password
                                                )

            my_group = Group.objects.get(name='Business')
            my_group.user_set.add(user)
            business = Business(owner=user, name='Demo Account',
                                plan='P', total_employees=20)
            business.save()
            profile = UserProfile(user=user, role='business', stripe_id='0')
            site = Site(business=business, name="Site 1")
            site.save()

            department1 = Department(
                name="Department 1", site=site, owner=user, business=business)
            department1.save()
            department2 = Department(
                name="Department 2", site=site, owner=user, business=business)
            department2.save()

            position1 = Position(
                name="Position 1", department=department1, owner=user, business=business)
            position1.save()

            position2 = Position(
                name="Position 2", department=department2, owner=user, business=business)
            position2.save()

            position3 = Position(
                name="Position 3", department=department2, owner=user, business=business)
            position3.save()

            position4 = Position(
                name="Position 4", department=department1, owner=user, business=business)
            position4.save()

            positions = [position1, position2, position3, position4]

            for i in range(1, 11):

                employee = Employee(first_name='Staff', last_name=str(
                    i), business=business, owner=user, wage=0.00, default_availability=default_availability)

                employee.save()
                employee.position.add(random.choice(positions))

            print(user)
            print(random_password)
