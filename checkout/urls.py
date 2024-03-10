from django.urls import path
from . import views

urlpatterns = [
    path('', views.checkout, name='checkout'),
    path('create-payment-intent', views.create_payment, name='create-payment-intent'),
    path('checkout-success/<order_number>/', views.checkout_success, name='checkout-success'),
    ]