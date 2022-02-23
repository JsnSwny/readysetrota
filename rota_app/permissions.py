from rest_framework import permissions
from .serializers import getPermList
from .models import Position, Department, Employee

# ---------------------
# BUSINESS PERMISSIONS
# ---------------------

class CanModifyBusiness(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        try:
            return obj == request.user.business
        except Exception as e:
            return False

class CanCreateBusiness(permissions.BasePermission):
    def has_permission(self, request, view):
        return False

# ---------------------
# SITE PERMISSIONS
# ---------------------

class CanModifySites(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        try:
            return obj.business == request.user.business
        except Exception as e:
            return False

class CanCreateSites(permissions.BasePermission):
    def has_permission(self, request, view):
        business_id = request.data['business_id']
        try:
            return business_id == request.user.business.id
        except Exception as e:
            return False

# ---------------------
# DEPARTMENT PERMISSIONS
# ---------------------

class CanModifyDepartments(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        site_id = obj.site.id
        perm_list = getPermList(request, site_id)
        return "manage_departments" in perm_list

class CanCreateDepartments(permissions.BasePermission):
    def has_permission(self, request, view):
        site_id = request.data['site_id']
        perm_list = getPermList(request, site_id)
        return "manage_departments" in perm_list

# ---------------------
# POSITION PERMISSIONS
# ---------------------

class CanModifyPositions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        site_id = obj.department.site.id
        perm_list = getPermList(request, site_id)
        return "manage_positions" in perm_list

class CanCreatePositions(permissions.BasePermission):
    def has_permission(self, request, view):
        department_id = request.data['department_id']
        site_id = Department.objects.get(pk=department_id).site.id
        perm_list = getPermList(request, site_id)
        return "manage_positions" in perm_list

# ---------------------
# EMPLOYEE PERMISSIONS
# ---------------------

class CanModifyEmployees(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        site_id = obj.position.first().department.site.id
        perm_list = getPermList(request, site_id)
        return "manage_employees" in perm_list

class CanCreateEmployees(permissions.BasePermission):
    def has_permission(self, request, view):
        position_id = request.data['position_id'][0]
        site_id = Position.objects.get(pk=position_id).department.site.id
        perm_list = getPermList(request, site_id)
        return "manage_employees" in perm_list

# ---------------------
# SHIFT PERMISSIONS
# ---------------------

class CanModifyShifts(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        site_id = obj.department.site.id
        perm_list = getPermList(request, site_id)
        return "create_shifts" in perm_list

class CanCreateShifts(permissions.BasePermission):
    def has_permission(self, request, view):
        department_id = request.data['department_id']
        site_id = Department.objects.get(pk=department_id).site.id
        perm_list = getPermList(request, site_id)
        return "create_shifts" in perm_list

# ---------------------
# AVAILABILITY PERMISSIONS
# ---------------------

class IsAvailabilityOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        user = Employee.objects.get(pk=request.data['employee_id']).user
        return user == request.user
    def has_object_permission(self, request, view, object):
        return obj.employee.user == request.user

# ---------------------
# TIMECLOCK PERMISSIONS
# ---------------------

class CanModifyTimeclock(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        site_id = obj.department.site.id
        perm_list = getPermList(request, site_id)
        return "manage_timeclock" in perm_list

class CanCreateTimeclock(permissions.BasePermission):
    def has_permission(self, request, view):
        department_id = request.data['department_id']
        site_id = Department.objects.get(pk=department_id).site.id
        perm_list = getPermList(request, site_id)
        return "manage_timeclock" in perm_list

# ---------------------
# FORECAST PERMISSIONS
# ---------------------

class CanModifyForecast(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        site_id = obj.site.id
        perm_list = getPermList(request, site_id)
        return "manage_forecast" in perm_list

class CanCreateForecast(permissions.BasePermission):
    def has_permission(self, request, view):
        site_id = request.data['site_id']
        perm_list = getPermList(request, site_id)
        return "manage_forecast" in perm_list

# ---------------------
# MISC PERMISSIONS
# ---------------------

# class CanViewReportData(permissions.BasePermission):
#     def has_permission(self, request, view):
#         user = Employee.objects.get(pk=request.data['employee_id']).user
#         return user == request.user