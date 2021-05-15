from django.urls import path

from users.views import CreateCustomer, login_, logout_, userPanel, render_contact_page, AddAddress

app_name = 'users'
urlpatterns = [
    # path('register/restaurant', CreateRestaurant.as_view(), name='register-restaurant'),
    path('register/', CreateCustomer.as_view(), name='register'),
    # path('login/', LoginView.as_view(), name='login'),
    path('login/', login_, name='login'),
    path('logout/', logout_, name='logout'),
    path('addresses/add', AddAddress.as_view(), name='address-add'),
    path('', userPanel, name='user_panel'),
    path('contact/', render_contact_page, name='contact')

]
