from rest_framework import routers
from .api import ShiftViewSet, EmployeeViewSet, PositionViewSet, DepartmentViewSet, ShiftSwapViewSet, BusinessViewSet, AvailabilityViewSet, ShiftListViewSet, EmployeeListViewSet, SiteViewSet
from .views import CheckUUID
from django.urls import path, include

router = routers.DefaultRouter()
router.register('shifts', ShiftViewSet, 'shifts')
router.register('shiftlist', ShiftListViewSet, 'shiftlist')
router.register('employees', EmployeeViewSet, 'employees')
router.register('employeelist', EmployeeListViewSet, 'employeelist')
router.register('positions', PositionViewSet, 'positions')
router.register('departments', DepartmentViewSet, 'departments')
router.register('shiftswap', ShiftSwapViewSet, 'shiftswap')
router.register('business', BusinessViewSet, 'business')
router.register('availability', AvailabilityViewSet, 'availability')
router.register('sites', SiteViewSet, 'sites')



urlpatterns = [
    path('', include(router.urls)),
    
]
