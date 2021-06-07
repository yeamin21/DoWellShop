"""DoWellShop URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls.conf import re_path
from django.views.generic import base
from cart.models import Order
from products.api_views import CategoryAPIViewset, ManufacturerAPIViewset, ProductAPIViewset
from django.conf import settings
from django.conf.urls.static import static, serve
from django.contrib import admin
from django.db import router
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from users.api_views import AddressAPIViewset, CustomTokenObtainPairView, UserSerializer, UserAPIViewset
from cart.api_views import OrderAPIViewset

router = routers.DefaultRouter()
router.register(r'products', ProductAPIViewset)
router.register(r'categories', CategoryAPIViewset)
router.register(r'manufacturers', ManufacturerAPIViewset)
router.register(r'user', UserAPIViewset)
router.register(r'addresses', AddressAPIViewset)
router.register(r'order', OrderAPIViewset, basename='user-order')

urlpatterns = [
    path('admin/', admin.site.urls),

    # path('', include('products.urls')),
    # path('account/', include('users.urls')),
    # path('cart/', include('cart.urls')),
    path('api/', include(router.urls)),
    path('api/token/', CustomTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/',
         jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += re_path(r'^.*',
                       base.TemplateView.as_view(template_name='index.html')),
