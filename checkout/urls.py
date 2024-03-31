from django.urls import path
from . import views
from .webhooks import webhook


urlpatterns = [
    path(
        '',
        views.checkout,
        name='checkout'
        ),
    path(
        'create-payment-intent',
        views.create_payment,
        name='create-payment-intent'
        ),
    path(
        'checkout-success/<order_number>/',
        views.checkout_success,
        name='checkout-success'
        ),
    path(
        'cache-checkout-data/',
        views.cache_checkout_data,
        name='cache-checkout-data'
        ),
    path(
        'payment-declined/<order_number>/',
        views.payment_declined,
        name='payment-declined'
        ),
    path(
        'wh/',
        webhook,
        name='webhook'
        ),
    ]
