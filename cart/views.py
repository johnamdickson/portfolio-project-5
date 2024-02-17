from django.shortcuts import render, redirect
from products.models import Product

# Create your views here.

def view_cart(request):
    """ A view that renders the cart contents page """
    unfiltered_products = Product.objects.all().order_by('category')

    context = {
        'unfiltered_products': unfiltered_products,
      }

    return render(request, 'cart/cart.html', context)

def add_to_cart(request, item_id):
    """ Add a quantity of the specified product to the shopping cart """

    quantity = int(request.POST.get('quantity'))
    redirect_url = request.POST.get('redirect_url')
    cart = request.session.get('cart', {})

    if item_id in list(cart.keys()):
        cart[item_id] += quantity
    else:
        cart[item_id] = quantity

    request.session['cart'] = cart
    return redirect(redirect_url)