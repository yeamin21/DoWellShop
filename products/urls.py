from django.urls import path, include
from rest_framework import routers

from products import views
from products.views import ProductViewSet

app_name = 'products'

urlpatterns = [
    path('', views.ProductList.as_view(), name='products'),
    path('categories/<category>/', views.CategorizedItems.as_view(), name='categorized-products'),
    path('manufacturers/<manufacturer>/', views.ManufacturerItems.as_view(), name='manufacturer-products'),
    path('product/<pk>/', views.ProductDetails.as_view(), name='description'),

]
