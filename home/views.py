from django.shortcuts import render, redirect, reverse
from django.http import HttpResponseServerError, HttpResponseBadRequest

# Create your views here.

def index(request):
    """ A view to return the index page """

    return render(request, 'home/index.html')

def simulate_500_error_view(request):
    if request.user.is_superuser:
        return HttpResponseServerError("500 Internal Server Error")
    else:
        return redirect(reverse('home'))

def simulate_400_error_view(request):
    if request.user.is_superuser:
        return HttpResponseBadRequest("400 Bad Request Error")
    else:
        return redirect(reverse('home'))
