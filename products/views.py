from django.shortcuts import render, redirect, reverse, get_object_or_404
from .models import Product, Category
from django.contrib import messages
from django.db.models import Q
# Create your views here.

def products(request):
    """
    A function to obtain all products and perform sorting, search and
    categorisation.
    """
    products = Product.objects.all().order_by('category')
    query = None

    if request.GET:
        if 'q' in request.GET:
            query = request.GET['q']
            if not query:
                messages.error(request, "You didn't enter any search criteria!")
                return redirect(reverse('products'))
            
            queries = Q(name__icontains=query) | Q(description__icontains=query)
            products = products.filter(queries)


    context = {
        'products': products,
        'search_term': query,
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