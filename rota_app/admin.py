from django.contrib import admin
from .models import Employee, Shift, Position, Department
from django.contrib.auth.models import Permission

admin.site.register(Employee)
admin.site.register(Shift)
admin.site.register(Position)
admin.site.register(Department)
admin.site.register(Permission)