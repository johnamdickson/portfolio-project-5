from django.shortcuts import render, redirect, reverse, get_object_or_404
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


def product_detail(request, product_pk):
    """ A view to show individual product details """

    product = get_object_or_404(Product, pk=product_pk)
    sizes = product.sizes.all()
    colours = product.colours.all()
    context = {
        'product': product,
        'sizes': sizes,
        'colours': colours,
    }

    return render(request, 'products/product-detail.html', context)