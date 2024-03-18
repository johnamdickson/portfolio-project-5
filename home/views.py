from django.shortcuts import render, redirect, reverse
from django.http import HttpResponseServerError, HttpResponseBadRequest, HttpResponse
from django.views.defaults import server_error, bad_request, permission_denied

# Create your views here.

def index(request):
    """ A view to return the index page """
    
    return render(request, 'home/index.html')

def simulate_500_error(request):
    if request.user.is_superuser:
        return server_error(request)
    else:
        return redirect(reverse('home'))

def simulate_400_error(request):
    if request.user.is_superuser:
        return bad_request(request, 'Bad Request')
    else:
        return redirect(reverse('home'))

def simulate_403_error(request):
    if request.user.is_superuser:
        return permission_denied(request, 'Testing the permission denied status')
    else:
        return redirect(reverse('home'))