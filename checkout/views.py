from django.shortcuts import render, redirect, reverse, get_object_or_404, HttpResponse
from django.contrib import messages
import os
from django.views.decorators.http import require_POST
from .forms import OrderForm
from products.models import Product
from .models import Order, OrderLineItem, UserProfile
from cart.contexts import cart_contents
from django.views.decorators.csrf import csrf_exempt
import stripe
import json
from django.http import JsonResponse


@require_POST
def cache_checkout_data(request):
    try:
        pid = request.POST.get('client_secret').split('_secret')[0]
        stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
        stripe.PaymentIntent.modify(pid, metadata={
            'cart': json.dumps(request.session.get('cart', {})),
            'save_info': request.POST.get('save_info'),
            'username': request.user,
            'order_number': request.POST.get('order_number'),
        })
        return HttpResponse(status=200)
    except Exception as e:
        messages.error(request, ('Sorry, your payment cannot be '
                                 'processed right now. Please try '
                                 'again later.'))
        return HttpResponse(content=e, status=400)


def checkout(request):
    unfiltered_products = Product.objects.all().order_by('category')
    try:
        user_profile = UserProfile.objects.get(user=request.user)
    except:
        user_profile = None
        
    if request.user.is_authenticated:
        if user_profile.default_phone_number:
            form_data = {
            'full_name': user_profile.default_full_name,
            'email' : request.user.email,
            'phone_number': user_profile.default_phone_number,
            'country': user_profile.default_country,
            'postcode': user_profile.default_postcode,
            'town_or_city': user_profile.default_town_or_city,
            'street_address1': user_profile.default_street_address1,
            'street_address2': user_profile.default_street_address2,
            'county': user_profile.default_county,
            }
            order_form = OrderForm(form_data)
        else:
            order_form = OrderForm()
    else:
        order_form = OrderForm()

    cart = request.session.get('cart', {})

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
        'order_number': request.POST['order_number'],
        }
        order_form = OrderForm(form_data)
        if order_form.is_valid():
            order = order_form.save(commit=False)
            order.user_profile = user_profile
            order.save()
            for item_id, item_data in cart.items():
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
                        "One of the products in your cart wasn't "
                        "found in our database. "
                        "Please call us for assistance!")
                    )
                    order.delete()
        else:
            messages.error(request, ('There was an error with your form. '
                                     'Please double check your information.'))
    else:
        cart = request.session.get('cart', {})
        if not cart:
            messages.error(request, "There's nothing in your cart at the moment")
            return redirect(reverse('products'))

    template = 'checkout/checkout.html'
    context = {
        'order_form': order_form,
        'unfiltered_products': unfiltered_products,
    }

    return render(request, template, context)


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
    )
    try:
        return JsonResponse({'publishableKey':  
        'os.environ.get("STRIPE_PUBLISHABLE_KEY")', 'clientSecret': intent.client_secret})

    except Exception as e:
        return JsonResponse({'error':str(e)},status= 403)


def checkout_success(request, order_number):
    """
    Handle successful checkouts
    """
    unfiltered_products = Product.objects.all().order_by('category')
    save_info = request.session.get('save_info')
    order = get_object_or_404(Order, order_number=order_number)

    # if request.user.is_authenticated:
    #     profile = UserProfile.objects.get(user=request.user)
    #     # Attach the user's profile to the order
    #     order.user_profile = profile
    #     order.save()

        # Save the user's info
        # if save_info:
        #     profile_data = {
        #         'default_phone_number': order.phone_number,
        #         'default_country': order.country,
        #         'default_postcode': order.postcode,
        #         'default_town_or_city': order.town_or_city,
        #         'default_street_address1': order.street_address1,
        #         'default_street_address2': order.street_address2,
        #         'default_county': order.county,
        #     }
        #     user_profile_form = UserProfileForm(profile_data, instance=profile)
        #     if user_profile_form.is_valid():
        #         user_profile_form.save()

    messages.success(request, f'Order successfully processed! \
        Your order number is {order_number}. A confirmation \
        email will be sent to {order.email}.')

    if 'cart' in request.session:
        del request.session['cart']

    template = 'checkout/checkout-success.html'
    context = {
        'order': order,
        'unfiltered_products': unfiltered_products,
    }

    return render(request, template, context)
   

def payment_declined(request, order_number):
    """
    Function called when card payment is declined. The order created during the post above is 
    deleted from the database.
    """
    order = Order.objects.get(order_number=order_number)
    try:
        order.delete()
        return HttpResponse(status=200)
    except Exception as e:
        print(request, f'Error removing order: {e}')
        return HttpResponse(status=400)   
