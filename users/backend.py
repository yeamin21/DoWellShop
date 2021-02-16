from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password

from users.models import User


class CustomBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            print('here')
            user = User.objects.get(username=username)
            if user:
                if check_password(password, user.password) or (user.password == password):
                    return user
                else:
                    return None
            else:
                return None
        except User.DoesNotExist:
            return None

    def get_user(self, username):
        try:
            return User.get_username(username=username)
        except User.DoesNotExist:
            return None
