from django.contrib import admin
from .models import Employee, Shift, Position, Department, Forecast, UserProfile, ShiftSwap, Business, Availability, Site
from django.contrib.auth.models import Permission

admin.site.register(Employee)
admin.site.register(Shift)
admin.site.register(Position)
admin.site.register(Department)
admin.site.register(Permission)
admin.site.register(UserProfile)
admin.site.register(ShiftSwap)
admin.site.register(Business)
admin.site.register(Availability)
admin.site.register(Site)
admin.site.register(Forecast)