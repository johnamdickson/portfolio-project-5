from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Product
from .forms import ProductForm



def add_product_details(request):

    unfiltered_products = Product.objects.all()

    if request.user.is_authenticated:
        """ Display the user's profile. """
        form_regular = ProductForm(prefix='offcanvas_regular')
        form_small = ProductForm(prefix='offcanvas_small')
        context = {
            'form_regular': form_regular,
            'form_small': form_small,
            'unfiltered_products': unfiltered_products,

        }
        return context

    else:
        context = {
            'unfiltered_products': unfiltered_products,
        }
        return context