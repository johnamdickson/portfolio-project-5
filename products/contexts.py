from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Product
from .forms import ProductForm


def add_product_details(request):
    """
    Function to filter products by categories and add to context.
    Specifically for use in the nav drop downs so that products are
    available across the whole site.
    """
    hats = Product.objects.filter(category__name='hats')
    learn_to_crochet = Product.objects.filter(
        category__name='learn_to_crochet'
        )
    blankets = Product.objects.filter(category__name='blankets')
    gift_sets = Product.objects.filter(category__name='gift_sets')

    if request.user.is_authenticated:
        """ Display the user's profile. """
        form_regular = ProductForm(prefix='offcanvas_regular')
        form_small = ProductForm(prefix='offcanvas_small')
        context = {
            'form_regular': form_regular,
            'form_small': form_small,
            'hats': hats,
            'learn_to_crochet': learn_to_crochet,
            'blankets': blankets,
            'gift_sets': gift_sets,
        }
        return context

    else:
        context = {
            'hats': hats,
            'learn_to_crochet': learn_to_crochet,
            'blankets': blankets,
            'gift_sets': gift_sets,
        }
        return context
