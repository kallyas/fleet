from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Q
from django.contrib import messages
from .models import User, Driver, Vehichle, Maintenance
from .serializers import UserSerializer, DriverSerializer, VehichleSerializer, MaintenanceSerializer

import io
import csv

# NOTE: used post method to create new objects because of foreign key constraints issues


class UserCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

class StaffCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    # create a new user with staff permissions
    def post(self, request, *args, **kwargs):
        data = request.data
        user = User.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            is_staff=True
        )
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'message': 'User created successfully'
        })

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
            'user_id': user.pk,
            'email': user.email,
            'is_staff': user.is_staff
            }
        })


class DriverListView(generics.ListAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Driver.objects.all()

class DriverDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Driver.objects.all()

class DriverCreateView(generics.CreateAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = (permissions.IsAuthenticated,)
    # queryset = Driver.objects.all()
    # check the data and create a new driver
    def post(self, request, *args, **kwargs):
        data = request.data
        
        driver = Driver.objects.create(
            name=data['name'],
            phone_number=data['phone_number'],
            age=data['age'],
            date_hired=data['date_hired']
        )
        return Response({
            'driver': DriverSerializer(driver, context=self.get_serializer_context()).data,
            'message': 'Driver created successfully'
        })


class VehichleListView(generics.ListAPIView):
    queryset = Vehichle.objects.all()
    serializer_class = VehichleSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Vehichle.objects.all()

class VehichleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehichle.objects.all()
    serializer_class = VehichleSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Vehichle.objects.all()

class VehichleCreateView(generics.CreateAPIView):
    queryset = Vehichle.objects.all()
    serializer_class = VehichleSerializer
    permission_classes = (permissions.IsAuthenticated,)
    # queryset = Vehichle.objects.all()
    # check the data and create a new vehichle
    def post(self, request, *args, **kwargs):
        data = request.data
        
        vehichle = Vehichle.objects.create(
            number_plate=data['number_plate'],
            driver=Driver.objects.get(id=data['driver']),
            mileage=data['mileage'],
            manufacturer=data['manufacturer'],
            date_of_purchase=data['date_of_purchase'],
        )
        return Response({
            'vehichle': VehichleSerializer(vehichle, context=self.get_serializer_context()).data,
            'message': 'Vehichle created successfully'
        })


class MaintenanceListView(generics.ListAPIView):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Maintenance.objects.all()


class MaintenanceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Maintenance.objects.all()


class MaintenanceCreateView(generics.CreateAPIView):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = (permissions.IsAuthenticated,)
    # queryset = Maintenance.objects.all()

    # check the data and create a new maintenance
    def post(self, request, *args, **kwargs):
        data = request.data
        
        maintenance = Maintenance.objects.create(
            fleet=Vehichle.objects.get(id=data['vehichle']),
            date=data['date'],
            description=data['description'],
            cost=data['cost'],
        )
        return Response({
            'maintenance': MaintenanceSerializer(maintenance, context=self.get_serializer_context()).data,
            'message': 'Maintenance created successfully'
        })


class SearchVehichle(generics.ListAPIView):
    serializer_class = VehichleSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        queryset = Vehichle.objects.all()

        search_term = self.request.query_params.get('search_term', None)
        if search_term is not None:
            query = Q(number_plate__icontains=search_term) | Q(driver__name__icontains=search_term) | Q(driver__phone_number__icontains=search_term) | Q(mileage__icontains=search_term) | Q(manufacturer__icontains=search_term)
            queryset = queryset.filter(query)
        return queryset



class SearchMaintenance(generics.ListAPIView):
    serializer_class = MaintenanceSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    # search by vehicle number, driver name, driver number, mileage, manufacturer, model, year
    def get_queryset(self):
        queryset = Maintenance.objects.all()
        search_term = self.request.query_params.get('search_term', None)
        if search_term is not None:
            query = Q(vehicle__number_plate__icontains=search_term) | Q(vehicle__driver__name__icontains=search_term) | Q(vehicle__driver__phone_number__icontains=search_term) | Q(vehicle__mileage__icontains=search_term) | Q(vehicle__manufacturer__icontains=search_term) | Q(vehicle__model__icontains=search_term) | Q(vehicle__year__icontains=search_term)
            queryset = queryset.filter(query)

class SearchDriver(generics.ListAPIView):
    serializer_class = DriverSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    # search by vehicle number, driver name, driver number, mileage, manufacturer, model, year
    def get_queryset(self):
        queryset = Driver.objects.all()
        search_term = self.request.query_params.get('search_term', None)
        if search_term is not None:
            query = Q(name__icontains=search_term) | Q(phone_number__icontains=search_term)
            queryset = queryset.filter(query)


# Write a view to allow a user import a csv file of vehicles and create them in the database
class ImportVehichle(generics.CreateAPIView):
    queryset = Vehichle.objects.all()
    serializer_class = VehichleSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        
        # Check if the file is a CSV
        if not file.name.endswith('.csv'):
            return Response({'message': 'The file must be a CSV'}, status=400)

        data_set = file.read().decode('UTF-8')
        io_string = io.StringIO(data_set)
        header = next(csv.reader(io_string))
        for row in csv.reader(io_string, delimiter=',', quotechar="|"):
            # Check if all the required columns are present in the header
            required_columns = ['number_plate', 'driver', 'mileage', 'manufacturer', 'date_of_purchase']
            if not all([col in header for col in required_columns]):
                return Response({'message': 'The file must contain the columns: ' + ', '.join(required_columns)}, status=400)

            # Map the row data to the required columns
            data = {header[i]: row[i] for i in range(len(header))}
            driver = Driver.objects.get(id=data['driver'])
            vehicle, created = Vehichle.objects.update_or_create(
                number_plate=data['number_plate'],
                defaults={
                    'driver': driver,
                    'mileage': data['mileage'],
                    'manufacturer': data['manufacturer'],
                    'date_of_purchase': data['date_of_purchase'],
                }
            )

        return Response({'message': 'Vehicles created successfully'})
