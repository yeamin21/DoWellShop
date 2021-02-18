from django.urls import path

from products.api_views import ProductAPI,CreateProductAPI

urlpatterns=[
    path('',ProductAPI.as_view()),
    path('create/', CreateProductAPI.as_view()),
]