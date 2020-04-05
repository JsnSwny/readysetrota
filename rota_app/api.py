from .models import Shift, Employee, Position, Department
from rest_framework import viewsets, permissions
from .serializers import ShiftSerializer, EmployeeSerializer, PositionSerializer, DepartmentSerializer
from datetime import date
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters import FilterSet, DateFilter, DateRangeFilter
import django_filters
# Booking Viewset


class ShiftFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    class Meta:
        model = Shift
        fields = ['date']

class ShiftViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    
    serializer_class = ShiftSerializer
    queryset = Shift.objects.all()
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = ShiftFilter
    ordering_fields = ('date', 'start_time')

class EmployeeViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class PositionViewSet(viewsets.ModelViewSet):
    
    serializer_class = PositionSerializer
    queryset = Position.objects.all()
    
class DepartmentViewSet(viewsets.ModelViewSet):
    
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()


