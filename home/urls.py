from django.contrib import admin
from django.urls import path
from . import views
from django.views.defaults import server_error, bad_request

# how to raise 500 error from urls:
# https://stackoverflow.com/questions/24660406/how-can-i-trigger-a-500-error-in-django

urlpatterns = [
    path('', views.index, name='home'),
    path('test-500', views.simulate_500_error, name='500'),
    path('test-400', views.simulate_400_error, name='400'),
    path('test-403', views.simulate_403_error, name='403'),
]
