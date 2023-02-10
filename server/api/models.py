from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _



class ExtraMixin(object):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Driver(models.Model, ExtraMixin):
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20, unique=True)
    age = models.IntegerField()
    date_hired = models.DateField()
    
    def __str__(self):
        return self.name


class Vehichle(models.Model, ExtraMixin):
    number_plate = models.CharField(max_length=20, unique=True)
    driver = models.ForeignKey('Driver', on_delete=models.CASCADE, related_name='vehichles')
    mileage = models.IntegerField()
    manufacturer = models.CharField(max_length=50)
    date_of_purchase = models.DateField()
    
    def __str__(self):
        return self.number_plate


class Maintenance(models.Model, ExtraMixin):
    fleet = models.ForeignKey('Vehichle', on_delete=models.CASCADE, related_name='maintenances')
    description = models.CharField(max_length=100)
    date = models.DateField()
    cost = models.FloatField()
    
    def __str__(self):
        return self.description


# custom user model
class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)

    def __str__(self):
        return self.username


