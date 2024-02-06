from django.shortcuts import render
from .models import Product, Category
# Create your views here.

def products(request):
    """
    A function to obtain all products and perform sorting, search and
    categorisation.
    """
    products = Product.objects.all().order_by('category')

    context = {
        'products': products,
    }

    return render(request, 'products/products.html', context)