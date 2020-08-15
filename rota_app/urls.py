from rest_framework import routers
from .api import ShiftViewSet, EmployeeViewSet, PositionViewSet, DepartmentViewSet, ShiftSwapViewSet, BusinessViewSet, AvailabilityViewSet
from .views import CheckUUID
from django.urls import path, include

router = routers.DefaultRouter()
router.register('shifts', ShiftViewSet, 'shifts')
router.register('employees', EmployeeViewSet, 'employees')
router.register('positions', PositionViewSet, 'positions')
router.register('departments', DepartmentViewSet, 'departments')
router.register('shiftswap', ShiftSwapViewSet, 'shiftswap')
router.register('business', BusinessViewSet, 'business')
router.register('availability', AvailabilityViewSet, 'availability')



urlpatterns = [
    path('', include(router.urls)),
    
]
