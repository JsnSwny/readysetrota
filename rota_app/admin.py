from django.contrib import admin
from .models import Employee, Shift, Position, SiteSettings, Department, Forecast, UserProfile, ShiftSwap, Business, Availability, Site, Wage, EmployeeStatus, TimeClock, Leave
from django.contrib.auth.models import Permission
from guardian.admin import GuardedModelAdmin
from simple_history.admin import SimpleHistoryAdmin


class SiteAdmin(GuardedModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)


class EmployeeAdmin(admin.ModelAdmin):
    readonly_fields = ('uuid',)


admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Shift, SimpleHistoryAdmin)
admin.site.register(Position, SimpleHistoryAdmin)
admin.site.register(Department, SimpleHistoryAdmin)
admin.site.register(Permission)
admin.site.register(UserProfile)
admin.site.register(ShiftSwap)
admin.site.register(Business)
admin.site.register(Availability)
admin.site.register(Site, SiteAdmin)
admin.site.register(Forecast)
admin.site.register(SiteSettings)
admin.site.register(Wage)
admin.site.register(EmployeeStatus)
admin.site.register(TimeClock)
admin.site.register(Leave)
