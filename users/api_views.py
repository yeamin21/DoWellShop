from users.serializers import AddressSerializer, CustomTokenObtainPairSerializers, UserSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from django.db.models import fields
from django.db.models.base import Model
from django.http import request
from rest_framework import viewsets, response, generics
from users import models
from users.models import Address, User
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt import serializers as jwt_serializers
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated


class CustomTokenObtainPairView(jwt_views.TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializers

    # def validate(self, attrs):
    #     username = attrs.get('username', None)
    #     password = attrs.get('password', None)
    #     user = authenticate(username=username, password=password)
    #     if user is None:
    #         raise serializers.ValidationError(
    #             'A user with this email and password is not found.'
    #         )
    #     try:
    #         update_last_login(None, user)
    #     except user.DoesNotExist:
    #         raise serializers.ValidationError(
    #             'A user with this email and password is not found.'
    #         )
    #     return {'username': user.get_username()}


class UserAPIViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def list(self, request, *args, **kwargs):
        user = User.objects.get(username=request.user.username)
        serializer = self.get_serializer(user)
        return response.Response(serializer.data)


class AddressAPIViewset(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)
