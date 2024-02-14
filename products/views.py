from django.shortcuts import render, redirect, reverse, get_object_or_404
from .models import Product, Category
from django.contrib import messages
from django.db.models import Q
from django.db.models.functions import Lower

# Create your views here.

def products(request):
    """
    A function to obtain all products and perform sorting, search and
    categorisation.
    """
    products = Product.objects.all().order_by('category')
    unfiltered_products = Product.objects.all()
    query = None
    categories = None
    title = "Products"
    sort = None
    direction = None

    if request.GET:

        if 'sort' in request.GET:
            sortkey = request.GET['sort']
            sort = sortkey
            if sortkey == 'name':
                sortkey = 'lower_name'
                products = products.annotate(lower_name=Lower('name'))
                title = "Products by Name"
            if sortkey == 'category':
                sortkey = 'category__name'
                title = "Products by Category"
            if sortkey == 'price':
                title = "Products by Price"
            if 'direction' in request.GET:
                direction = request.GET['direction']
                if direction == 'desc':
                    sortkey = f'-{sortkey}'

            products = products.order_by(sortkey)

        if 'category' in request.GET:
            categories = request.GET['category'].split(',')
            products = products.filter(category__name__in=categories)
            categories = Category.objects.filter(name__in=categories)
            # code to return category as title or return "All Products"
            # otherwise
            if categories:
                title = categories[0].friendly_name
            else :
                title = "Products"

        if 'q' in request.GET:
            query = request.GET['q']
            if not query:
                messages.error(request, "Please enter search criteria.")
                return redirect(reverse('products'))
            
            queries = Q(name__icontains=query) | Q(description__icontains=query) | Q(category__friendly_name__icontains=query)
            # query to be rendered in the template searchbar placeholder
            placeholder = query
            products = products.filter(queries)
            title = "Search Products"
      
    current_sorting = f'{sort}_{direction}'

    context = {
        'placeholder': query,
        'products': products,
        'search_term': query,
        'current_categories': categories,
        'title': title,
        'current_sorting': current_sorting,
        'unfiltered_products': unfiltered_products,
    }

    return render(request, 'products/products.html', context)


def product_detail(request, product_pk):
    """ A view to show individual product details """

    products = Product.objects.all()
    product = get_object_or_404(Product, pk=product_pk)
    sizes = product.sizes.all()
    colours = product.colours.all()
    unfiltered_products = Product.objects.all()

    context = {
        'products' : products,
        'product': product,
        'sizes': sizes,
        'colours': colours,
        'unfiltered_products': unfiltered_products,
    }

    return render(request, 'products/product-detail.html', context)