from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('test-500', views.simulate_500_error_view, name='500'),
    path('test-400', views.simulate_400_error_view, name='400'),
]