from rest_framework import routers
from .api import (ShiftViewSet, EmployeeViewSet, PositionViewSet, 
DepartmentViewSet, BusinessViewSet, AvailabilityViewSet, 
ShiftListViewSet, EmployeeListViewSet, SiteViewSet, AdminEmployeeListViewSet,
BasicPositionViewSet, ForecastViewSet, SiteSettingsViewSet)
from .views import CheckUUID
from django.urls import path, include

router = routers.DefaultRouter()
router.register('shifts', ShiftListViewSet, 'shifts')
router.register('shiftlist', ShiftViewSet, 'shiftlist')
router.register('employees', EmployeeViewSet, 'employees')

router.register('employeelist', EmployeeListViewSet, 'employeelist')
router.register('employeelistadmin', AdminEmployeeListViewSet, 'employeelistadmin')

router.register('positions', PositionViewSet, 'positions')
router.register('positionslist', BasicPositionViewSet, 'positionslist')

router.register('departments', DepartmentViewSet, 'departments')
router.register('business', BusinessViewSet, 'business')
router.register('availability', AvailabilityViewSet, 'availability')
router.register('sites', SiteViewSet, 'sites')
router.register('forecast', ForecastViewSet, 'forecast')
router.register('sitesettings', SiteSettingsViewSet, 'sitesettings')



urlpatterns = [
    path('', include(router.urls)),
    
]
