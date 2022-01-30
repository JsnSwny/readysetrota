from rest_framework import routers
from .api import (ShiftViewSet, EmployeeViewSet, PositionViewSet, 
DepartmentViewSet, BusinessViewSet, AvailabilityViewSet, 
ShiftListViewSet, EmployeeListViewSet, SiteViewSet, AdminEmployeeListViewSet,
BasicPositionViewSet, ForecastViewSet, SiteSettingsViewSet, LeaveViewSet, TimeClockViewSet, PermissionTypeViewSet, WageViewSet)
from .views import GetReportData, GetStats
from .views import CheckUUID
from django.urls import path, include

router = routers.DefaultRouter()
router.register('shifts', ShiftListViewSet, 'shifts')
router.register('shiftlist', ShiftViewSet, 'shiftlist')

router.register('timeclocks', TimeClockViewSet, 'timeclocks')

router.register('employees', EmployeeViewSet, 'employees')

router.register('employeelist', EmployeeListViewSet, 'employeelist')
router.register('employeelistadmin', AdminEmployeeListViewSet, 'employeelistadmin')

router.register('positions', PositionViewSet, 'positions')
router.register('positionslist', BasicPositionViewSet, 'positionslist')

router.register('departments', DepartmentViewSet, 'departments')
router.register('business', BusinessViewSet, 'business')
router.register('availability', AvailabilityViewSet, 'availability')
router.register('sites', SiteViewSet, 'sites')

router.register('leave', LeaveViewSet, 'leaves')

router.register('wages', WageViewSet, 'wages')

router.register('forecast', ForecastViewSet, 'forecast')
router.register('sitesettings', SiteSettingsViewSet, 'sitesettings')
router.register('permission-types', PermissionTypeViewSet, 'permission-types')

# router.register('report', GetReportData, 'report')



urlpatterns = [
    path('stats/', GetStats.as_view(), name='stats'),
    path('report/',GetReportData.as_view(),name='report'), 
    path('', include(router.urls)),
    
]
