from rest_framework import routers
from .api import *
from .views import GetReportData, GetStats
from django.urls import path, include

router = routers.DefaultRouter()
router.register('shifts', ShiftViewSet, 'shifts')

router.register('timeclocks', TimeClockViewSet, 'timeclocks')

router.register('employees', EmployeeViewSet, 'employees')

router.register('positions', PositionViewSet, 'positions')
router.register('positionslist', BasicPositionViewSet, 'positionslist')

router.register('departments', DepartmentViewSet, 'departments')
router.register('business', BusinessViewSet, 'business')
router.register('availability', AvailabilityViewSet, 'availability')
router.register('sites', SiteViewSet, 'sites')

router.register('leave', LeaveViewSet, 'leaves')

router.register('forecast', ForecastViewSet, 'forecast')
router.register('sitesettings', SiteSettingsViewSet, 'sitesettings')
router.register('permission-types', PermissionTypeViewSet, 'permission-types')



urlpatterns = [
    path('stats/', GetStats.as_view(), name='stats'),
    path('report/',GetReportData.as_view(),name='report'), 
    path('', include(router.urls)),
    
]
