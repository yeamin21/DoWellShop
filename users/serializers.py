from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from django.db.models import fields
from django.db.models.base import Model
from django.http import request
from rest_framework import viewsets, response, generics
from rest_framework.decorators import permission_classes
from users import models
from users.models import Address, User
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt import serializers as jwt_serializers
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        permission_classes=[IsAuthenticated]

    def to_internal_value(self, data):
        return Address.objects.get(pk=data)


class CustomTokenObtainPairSerializers(jwt_serializers.TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
