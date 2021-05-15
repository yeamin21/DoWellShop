from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import LoginView

from users.models import User, Address


# class RestaurantCreationForm(UserCreationForm):
#     location = forms.CharField(max_length=200)
#
#     class Meta(UserCreationForm):
#         model = User
#         fields = ['username',
#                   'email',
#                   'location'
#                   ]
#
#     def save(self, commit=True):
#         user = super().save(commit=False)
#         user.is_seller = True
#         user.is_active = False
#         user.save()
#         restaurant = Seller.objects.create(user=user)
#         restaurant.location = self.cleaned_data.get('location')
#         restaurant.save()
#         return user


class AddressCreationForm(forms.ModelForm):
    class Meta(forms.ModelForm):
        model = Address
        fields = [
            'city', 'address_line1', 'address_line2', 'division',
        ]


class CustomerCreationForm(UserCreationForm):
    # location = forms.CharField(max_length=200)

    class Meta(UserCreationForm):
        model = User
        fields = ['username',
                  'first_name', 'last_name', 'email', 'phone',
                  ]

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_customer = True
        # user.is_restaurant = True
        user.save()
        # restaurant = restaurant.objects.create(user = user)
        # restaurant.location = self.cleaned_data.get('location')
        # restaurant.save()
        return user


class LoginForm(LoginView):
    class Meta:
        pass
