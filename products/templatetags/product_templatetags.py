from django import template

from products.models import Category, Product, Manufacturer

register = template.Library()


@register.inclusion_tag('products/category_list.html')
def categories():
    return {'categories': Category.objects.all()}


@register.inclusion_tag('products/manufacturer_list.html')
def manufacturers():
    return {'manufacturers': Manufacturer.objects.all()}


@register.inclusion_tag('products/latestproduct_list.html')
def products(count=None):
    return {'products': Product.objects.order_by('-time_added')[:count]}
