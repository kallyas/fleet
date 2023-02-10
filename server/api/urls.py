from django.urls import path


from .views import (
    UserCreateView,
    CustomAuthToken,
    DriverCreateView,
    DriverDetailView,
    DriverListView,
    VehichleCreateView,
    VehichleDetailView,
    VehichleListView,
    MaintenanceCreateView,
    MaintenanceDetailView,
    MaintenanceListView,
    SearchDriver,
    SearchVehichle,
    SearchMaintenance,
    StaffCreateView,
    ImportVehichle,
)

urlpatterns = [
    path('auth/register/', UserCreateView.as_view(), name='register'),
    path('staff/create/', StaffCreateView.as_view(), name='staff-create'),
    path('auth/login/', CustomAuthToken.as_view(), name='login'),
    path('drivers/', DriverListView.as_view(), name='driver'),
    path('driver/<int:pk>/', DriverDetailView.as_view(), name='driver-detail'),
    path('driver/create/', DriverCreateView.as_view(), name='driver-create'),
    path('vehichles/', VehichleListView.as_view(), name='vehichle'),
    path('vehichle/<int:pk>/', VehichleDetailView.as_view(), name='vehichle-detail'),
    path('vehichle/create/', VehichleCreateView.as_view(), name='vehichle-create'),
    path('maintenances/', MaintenanceListView.as_view(), name='maintenance'),
    path('maintenance/<int:pk>/', MaintenanceDetailView.as_view(), name='maintenance-detail'),
    path('maintenance/create/', MaintenanceCreateView.as_view(), name='maintenance-create'),
    path('search/driver/', SearchDriver.as_view(), name='search-driver'),
    path('search/vehichle/', SearchVehichle.as_view(), name='search-vehichle'),
    path('search/maintenance/', SearchMaintenance.as_view(), name='search-maintenance'),
    path('import/vehichle/', ImportVehichle.as_view(), name='import-vehichle'),
]