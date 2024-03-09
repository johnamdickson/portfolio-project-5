from django.shortcuts import render, redirect, reverse
from django.contrib import messages
import os
from .forms import OrderForm
from products.models import Product
from .models import Order, OrderLineItem
from cart.contexts import cart_contents
from django.views.decorators.csrf import csrf_exempt
import stripe
import json
from django.http import JsonResponse


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



# This is your test secret API key.

@csrf_exempt
def create_payment(request):
    cart = request.session.get('cart', {})
    current_cart = cart_contents(request)
    total = round(current_cart['grand_total'] * 100)
    stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
    if request.method=="POST":
        
        data = json.loads(request.body)
        # Create a PaymentIntent with the order amount and currency
    intent = stripe.PaymentIntent.create(
    amount=total,
    currency='eur',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods={
        'enabled': True,
    },
    )
    try:
        return JsonResponse({'publishableKey':  
          'os.environ.get("STRIPE_PUBLISHABLE_KEY")', 'clientSecret': intent.client_secret})
    except Exception as e:
        return JsonResponse({'error':str(e)},status= 403)