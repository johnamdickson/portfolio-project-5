from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Product
from .forms import ProductForm



def add_product_details(request):
    
    if request.user.is_authenticated:
        """ Display the user's profile. """
        form = ProductForm()
        context = {
            'product_form': form,
        }
        return context

    else:
        context = {}
        return context