from django.shortcuts import render, redirect, reverse, get_object_or_404
from .models import Product, Category
from django.contrib import messages
from django.db.models import Q
from django.db.models.functions import Lower
from django.contrib.auth.decorators import login_required
from .forms import ProductForm
from django.core.cache import cache
from django.views.decorators.cache import cache_page


# Create your views here.


def products(request):
    """
    A function to obtain all products and perform sorting, search and
    categorisation.
    """
    try:
        request_origin = request.headers['Referer']
    except KeyError:
        request_origin = []
    products = Product.objects.all().order_by('category')
    query = None
    categories = None
    title = "Products"
    sort = None
    direction = None
    # checks if referer was edit product, in instance of delete this
    # will be the case which will return to the products page.
    if 'edit' in request_origin:
        cache.clear()
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
            cache.clear()
            products = products.order_by(sortkey)

        if 'category' in request.GET:
            categories = request.GET['category'].split(',')
            products = products.filter(category__name__in=categories)
            categories = Category.objects.filter(name__in=categories)
            # code to return category as title or return "All Products"
            # otherwise
            if categories:
                title = categories[0].friendly_name
            else:
                title = "Products"
            cache.clear()

        if 'products' in request.GET:
            products = Product.objects.all().order_by('category')
            cache.clear()

        if 'q' in request.GET:
            query = request.GET['q']
            if not query:
                messages.error(request, "Please enter search criteria.")
                return redirect(reverse('products'))

            queries = (
                Q(name__icontains=query) |
                Q(description__icontains=query) |
                Q(category__friendly_name__icontains=query)
            )
            # query to be rendered in the template searchbar placeholder
            placeholder = query
            products = products.filter(queries)
            title = "Search Products"
            cache.clear()

    current_sorting = f'{sort}_{direction}'

    context = {
        'placeholder': query,
        'products': products,
        'search_term': query,
        'current_categories': categories,
        'title': title,
        'current_sorting': current_sorting,
    }

    return render(request, 'products/products.html', context)


def product_detail(request, product_pk, clear_cache):
    """ A view to show individual product details """
    if clear_cache == 'True':
        cache.clear()
    products = Product.objects.all()
    product = get_object_or_404(Product, pk=product_pk)
    sizes = product.sizes.all()
    colours = product.colours.all()
    sizes_data = list(sizes.values())
    colours_data = list(colours.values())
    context = {
        'product': product,
        'sizes': sizes,
        'colours': colours,
        'sizes_data': sizes_data,
        'colours_data': colours_data,
    }

    return render(request, 'products/product-detail.html', context)


@login_required
@cache_page(60*30)
def add_product(request):
    """ Add a product to the store """
    if not request.user.is_superuser:
        messages.error(request, 'Sorry, only store owners can add products.')
        return redirect(reverse('home'))

    if request.method == 'POST':
        if 'offcanvas_regular-name' in request.POST.keys():
            form = ProductForm(
                request.POST,
                request.FILES,
                prefix="offcanvas_regular"
            )
        elif 'offcanvas_small-name' in request.POST.keys():
            form = ProductForm(
                request.POST,
                request.FILES,
                prefix="offcanvas_small"
                )
        else:
            form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save()
            messages.success(
                request,
                f'Successfully added product {product.name}'
            )
            return redirect(
                reverse(
                    'product_detail',
                    args=[product.id, 'False']
                    )
                )
        else:
            messages.error(request,
                           ('Failed to add product. '
                            'Please ensure the form is valid.'))
    else:
        form = ProductForm()

    template = 'products/add-product.html'
    context = {
        'form': form,
    }

    return render(request, template, context)


@login_required
@cache_page(60*30)
def edit_product(request, product_id):
    """ Edit a product in the store """
    if not request.user.is_superuser:
        messages.error(request, 'Sorry, only store owners can edit products.')
        return redirect(reverse('home'))

    product = get_object_or_404(Product, pk=product_id)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            messages.success(request, 'Successfully updated product!')
            return redirect(
                reverse(
                    'product_detail',
                    args=[
                        product.id,
                        'False'
                        ]
                    )
                )
        else:
            messages.error(request,
                           ('Failed to update product. '
                            'Please ensure the form is valid.'))
    else:
        form = ProductForm(instance=product)
        messages.info(
            request,
            f'You are editing {product.name}',
            extra_tags="Edit Product"
              )

    template = 'products/edit-product.html'
    context = {
        'form': form,
        'product': product,
    }

    return render(request, template, context)


@login_required
def delete_product(request, product_id):
    """ Delete a product from the store """
    if not request.user.is_superuser:
        messages.error(
            request,
            'Sorry, only store owners can delete products.'
        )
        return redirect(reverse('home'))

    product = get_object_or_404(Product, pk=product_id)
    product.delete()
    messages.success(request, 'Product deleted!')
    return redirect(reverse('products'))
