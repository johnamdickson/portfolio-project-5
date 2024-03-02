from django.shortcuts import render, redirect, reverse
from django.contrib import messages

from .forms import OrderForm
from products.models import Product


def checkout(request):
    cart = request.session.get('cart', {})
    if not cart:
        messages.error(request, "There's nothing in your cart at the moment")
        return redirect(reverse('products'))
   
    unfiltered_products = Product.objects.all().order_by('category')

    order_form = OrderForm()
    template = 'checkout/checkout.html'

    context = {
        'order_form': order_form,
        'unfiltered_products': unfiltered_products,
    }

    return render(request, template, context)