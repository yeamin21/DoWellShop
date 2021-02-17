from django import template as temp

from cart.models import Order
from users.forms import AddressCreationForm
from users.models import Address

register = temp.Library()


@register.inclusion_tag('users/block_address_list_radio.html')
def addresses(user):
    return {'addresses': Address.objects.filter(user=user)}


@register.inclusion_tag('users/block_address_add.html')
def add_address():
    return {'form': AddressCreationForm()}
