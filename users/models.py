from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_seller = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=False)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.username


class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Address(models.Model):
    DIVISION_CHOICES = [
        ('DHK', 'Dhaka'),
        ('BAR', "Barisal"),
        ('CTG', "Chittagong"),
        ('KHU', "Khulna"),
        ('MYM', "Mymensingh"),
        ('RAJ', "Rajshahi"),
        ('RNG', "Rangpur"),
        ('SYL', "Sylhet"), ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_primaryAddress = models.BooleanField(default=False)
    is_deliveryAddress = models.BooleanField(default=False)
    division = models.CharField(
        max_length=50, blank=True, choices=DIVISION_CHOICES)
    city = models.CharField(max_length=50, blank=True)
    address_line1 = models.CharField(max_length=150, blank=True)
    address_line2 = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return self.address_line1 + self.address_line2

#
# class Division:
#     name = models.CharField(max_length=50)
#
# class District:
#     name = models.CharField(max_length=50)
#
# class SubDistrict:
#     name = models.CharField(max_length=50)
