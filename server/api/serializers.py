from rest_framework import serializers
from .models import Vehichle, Driver, Maintenance, User


# create serializers
class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'


class VehichleSerializer(serializers.ModelSerializer):

    driver = DriverSerializer(read_only=True)

    class Meta:
        model = Vehichle
        fields = '__all__'


class MaintenanceSerializer(serializers.ModelSerializer):

    fleet = VehichleSerializer(read_only=True)
    
    class Meta:
        model = Maintenance
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_driver', 'is_fleet_manager', 'is_maintenance_manager')