from django.contrib import admin

from users.models import User, Address, Customer

admin.site.register(User)
admin.site.register(Address)
admin.site.register(Customer)
