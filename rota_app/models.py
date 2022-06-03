from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
import uuid
from datetime import datetime, timedelta, time, date
from jsonfield import JSONField
from simple_history.models import HistoricalRecords
from django.core.validators import MaxValueValidator, MinValueValidator 


class Business(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name} - {self.owner}'
    owner = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="business")
    PLANS = [
        ("F", 'Free'),
        ("T", 'Trial'),
        ("P", 'Premium'),
    ]
    plan = models.CharField(
        max_length=1,
        choices=PLANS,
        default="F",
    )
    total_employees = models.IntegerField(default=0)
    trial_end = models.DateField(null=True, blank=True)
    subscription_cancellation = models.DateField(null=True, blank=True)
    subscription_id=models.CharField(max_length=100, null=True, blank=True)
    payment_method_id=models.CharField(max_length=100, null=True, blank=True)
    subscription_status=models.CharField(max_length=100, null=True, blank=True)

class PermissionType(models.Model):
    name = models.CharField(max_length=30)
    code_name = models.CharField(max_length=30)
    description = models.TextField(blank=True)

    def __str__(self):
        return f'[{self.id}]: {self.name}'


class Site(models.Model):
    name = models.CharField(max_length=100)
    business = models.ForeignKey(
        Business, related_name="site_business", on_delete=models.CASCADE, null=True, blank=True)
    history = HistoricalRecords()

    def __str__(self):
        return f'{self.name} (ID: {self.id})'


class Department(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name} - {self.owner}'
    owner = models.ForeignKey(
        User, related_name="departments", on_delete=models.CASCADE)
    site = models.ForeignKey(Site, related_name="department_site",
                             on_delete=models.CASCADE, null=True, blank=True)
    business = models.ForeignKey(
        Business, related_name="department_business", on_delete=models.CASCADE, null=True, blank=True)
    history = HistoricalRecords()


class Position(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name} - {self.department.owner}'
    owner = models.ForeignKey(
        User, related_name="positions", on_delete=models.CASCADE)
    department = models.ForeignKey(
        Department, related_name="pos_department", on_delete=models.CASCADE)
    order = models.IntegerField(blank=True, null=True)
    business = models.ForeignKey(
        Business, related_name="position_business", on_delete=models.CASCADE, null=True, blank=True)
    history = HistoricalRecords()


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
    email = models.CharField(max_length=100, null=True, blank=True)
    position = models.ManyToManyField(
        Position, related_name="position", blank=True)
    permissions = models.ManyToManyField(
        PermissionType, related_name="employee_permissions", blank=True)
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="employee")
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        User, related_name="employees", on_delete=models.CASCADE, blank=True)
    default_availability = JSONField(default=default_availability)
    business = models.ForeignKey(
        Business, related_name="employee_business", on_delete=models.CASCADE, null=True, blank=True)
    history = HistoricalRecords()
    pin = models.IntegerField(null=True, validators=[MinValueValidator(1000), MaxValueValidator(9999)])
    has_been_invited = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    site = models.ManyToManyField(
        Site, related_name="employee_site", blank=True, null=True)

    def __str__(self):
        return f'[{self.id}]: {self.first_name} {self.last_name}'


class EmployeeStatus(models.Model):
    employee = models.ForeignKey(
        Employee, related_name="status", on_delete=models.SET_NULL, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)


class Wage(models.Model):
    employee = models.ForeignKey(
        Employee, related_name="wage", on_delete=models.SET_NULL, null=True, blank=True)
    wage = models.DecimalField(max_digits=12, decimal_places=2)
    WAGE_TYPES = [
        ("H", 'Hourly'),
        ("S", 'Salary'),
        ("N", 'None')
    ]
    wage_type = models.CharField(
        max_length=1,
        choices=WAGE_TYPES,
        default="N",
    )
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

class Shift(models.Model):
    employee = models.ForeignKey(
        Employee, related_name="shifts", on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.CharField(max_length=100, null=True, blank=True)
    info = models.TextField(blank=True)
    department = models.ForeignKey(
        Department, related_name="shift_department", on_delete=models.SET_NULL, null=True, blank=True)
    history = HistoricalRecords()

    STAGE_TYPES = [
        ("Published", 'Published'),
        ("Unpublished", 'Unpublished'),
        ("Approval", 'Approval'),
        ("Creation", 'Creation')
    ]
    stage = models.CharField(
        max_length=12,
        choices=STAGE_TYPES,
        default="Unpublished",
    )
    open = models.BooleanField(default=False)
    owner = models.ForeignKey(
        User, related_name="shifts", on_delete=models.CASCADE)
    position = models.ForeignKey(Position, related_name="shift_positions", blank=True, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    break_length = models.IntegerField(default=0)

    def _get_length(self):
        current_date = date.today()
        start = datetime.combine(current_date, self.start_time)
        end = datetime.combine(current_date, self.end_time)
        if (end < start):
            end = end + timedelta(days=1)
        shift_length = round((end - start).total_seconds() / 3600, 2)
        return shift_length - (self.break_length / 60)

    def __str__(self):
        return f'{self.id}. {self.date.strftime("%B %d %Y")} {str(self.start_time)[0:5]} - {str(self.end_time)[0:5]} ({self.owner.email})'

class Availability(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.CharField(max_length=20, null=True, blank=True)
    info = models.TextField(blank=True, null=True)
    employee = models.ForeignKey(
        Employee, related_name="availability", on_delete=models.CASCADE)
    STATUS_TYPES = [
        ("Pending", 'Pending'),
        ("Approved", 'Approved'),
        ("Denied", 'Denied'),
    ]
    status = models.CharField(
        max_length=11,
        choices=STATUS_TYPES,
        default="Pending",
    )
    site = models.ForeignKey(Site, related_name="availability_site",
                             on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}. {self.date} - {self.name} - {self.employee}'
class Leave(models.Model):
    LEAVE_TYPES = [
        ("Holiday", 'Holiday'),
        ("Sick", 'Sick'),
    ]
    leave_type = models.CharField(
        max_length=11,
        choices=LEAVE_TYPES,
        default="Holiday",
    )

    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.CharField(max_length=100, blank=True, null=True)

    STATUS_TYPES = [
        ("Pending", 'Pending'),
        ("Approved", 'Approved'),
        ("Denied", 'Denied'),
    ]
    status = models.CharField(
        max_length=11,
        choices=STATUS_TYPES,
        default="Pending",
    )

    employee = models.ForeignKey(
        Employee, related_name="employee_leave", on_delete=models.CASCADE)

    site = models.ForeignKey(Site, related_name="site_leave",
                             on_delete=models.CASCADE, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=100)
    stripe_id = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.user.email


class Forecast(models.Model):
    date = models.DateField()
    site = models.ForeignKey(
        Site, related_name="site_forecast", on_delete=models.CASCADE)
    predicted = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    labourGoal = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    actual = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return f'{self.date}: {self.site.name} - {self.predicted}'


class TimeClock(models.Model):
    shift = models.OneToOneField(
        Shift, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    employee = models.ForeignKey(
        Employee, related_name="employee_timeclock", on_delete=models.SET_NULL, null=True, blank=True)
    department = models.ForeignKey(
        Department, related_name="timeclock_department", on_delete=models.SET_NULL, null=True, blank=True)
    clock_in = models.TimeField()
    clock_out = models.TimeField(null=True)
    STAGE_TYPES = [
        ("DEFAULT", 'DEFAULT'),
        ("CLOCKED_IN", 'CLOCKED_IN'),
        ("CLOCKED_OUT", 'CLOCKED_OUT'),
    ]
    stage = models.CharField(
        max_length=11,
        choices=STAGE_TYPES,
        default="DEFAULT",
    )
    break_length = models.IntegerField(default=0)


class Break(models.Model):
    timeclock = models.ForeignKey(
        TimeClock, related_name="timeclock_break", on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()


class SiteSettings(models.Model):
    site = models.OneToOneField(Site, on_delete=models.CASCADE)
    shift_approval = models.BooleanField(default=False)
    min_time = models.CharField(max_length=5, default="00:00")
    max_time = models.CharField(max_length=5, default="23:45")
    time_increment = models.IntegerField(default=15)
    forecasting = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.site.business.name} - {self.site.name} [ID: {self.id}]'


class ShiftSwap(models.Model):
    swap_from = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name="swap_from")
    swap_to = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name="swap_to")
    shift_from = models.ForeignKey(
        Shift, on_delete=models.CASCADE, related_name="shift_from")
    shift_to = models.ForeignKey(
        Shift, on_delete=models.CASCADE, related_name="shift_to")
    employee_approved = models.BooleanField(null=True)
    admin_approved = models.BooleanField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)



# class EmployeePermissions(models.Model):
#     employee = models.ForeignKey(
#         Employee, related_name="employee_permission", on_delete=models.CASCADE)
#     permissions = models.ManyToManyField(
#         PermissionType, related_name="employee_permission_type")

#     def __str__(self):
#         return f'{self.employee.first_name} {self.employee.last_name} ({self.permissions.count()})'


