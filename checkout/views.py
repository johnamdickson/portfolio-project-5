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
    if request.method=="POST":

        form_data = {
        'full_name': request.POST['full_name'],
        'email': request.POST['email'],
        'phone_number': request.POST['phone_number'],
        'country': request.POST['country'],
        'postcode': request.POST['postcode'],
        'town_or_city': request.POST['town_or_city'],
        'street_address1': request.POST['street_address1'],
        'street_address2': request.POST['street_address2'],
        'county': request.POST['county'],
        }

        order_form = OrderForm(form_data)
        if order_form.is_valid():
            order = order_form.save(commit=False)
            # pid = request.POST.get('client_secret').split('_secret')[0]
            # order.stripe_pid = pid
            order.original_cart = json.dumps(cart)
            order.save()
            for item_id, item_data in cart.items():
                print(item_data)
                try:
                    product = Product.objects.get(id=item_id)
                    if isinstance(item_data, int):
                        order_line_item = OrderLineItem(
                            order=order,
                            product=product,
                            quantity=item_data,
                        )
                        order_line_item.save()
                    else:
                        for properties, quantity in item_data['items_size_and_or_colour'].items():
                            property_list = properties.split(',')
                            size = property_list[0]
                            size = None if size == 'None' else size
                            colour = property_list[1]
                            colour = None if colour == 'None' else colour
                            secondary_colour = property_list[2]
                            secondary_colour = None if secondary_colour == 'None' else secondary_colour  
                            order_line_item = OrderLineItem(
                                order=order,
                                product=product,
                                quantity=quantity,
                                product_size=size,
                                product_primary_colour = colour,
                                product_secondary_colour = secondary_colour,
                            )
                            order_line_item.save()
                except Product.DoesNotExist:
                    messages.error(request, (
                        "One of the products in your bag wasn't "
                        "found in our database. "
                        "Please call us for assistance!")
                    )
                    order.delete()
                    return redirect(reverse('view_cart'))

            # Save the info to the user's profile if all is well
            request.session['save_info'] = 'save-info' in request.POST
            return redirect(reverse('checkout_success',
                                    args=[order.order_number]))
        else:
            messages.error(request, ('There was an error with your form. '
                                     'Please double check your information.'))
    
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
    data = json.loads(request.body)
    # Create a PaymentIntent with the order amount and currency
    intent = stripe.PaymentIntent.create(
    amount=total,
    currency='eur',
    # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods={
        'enabled': True,
    },
    # return_url='https://8000-johnamdicks-portfoliopr-41pgsd24zrp.ws-eu108.gitpod.io/checkout/',
    )
    try:
        return JsonResponse({'publishableKey':  
        'os.environ.get("STRIPE_PUBLISHABLE_KEY")', 'clientSecret': intent.client_secret})
    except Exception as e:
        return JsonResponse({'error':str(e)},status= 403)


    

   