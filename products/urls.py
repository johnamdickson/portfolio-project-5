from django.urls import path
from . import views

urlpatterns = [
    path('', views.products, name='products'),
    path('<int:product_pk>/', views.product_detail, name='product_detail'),
]