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
    size = None
    colour = None
    secondary_colour = None
    if 'product_size' in request.POST:
        size = request.POST['product_size']
    if 'product_colour' in request.POST:
        colour = request.POST['product_colour']
    if 'secondary_product_colour' in request.POST:
        secondary_colour = request.POST['secondary_product_colour']
    cart = request.session.get('cart', {})
    colour_only = f"{colour}"
    two_colours = f"{colour},{secondary_colour}"
    size_colour = f"{size},{colour}"
    size_two_colours= f"{size},{colour},{secondary_colour}"
    item_id_key = 'items_size_and_or_colour'
    
    if size and colour and secondary_colour:
        if item_id in list(cart.keys()):
            if size_two_colours in cart[item_id][item_id_key].keys():
                cart[item_id][item_id_key][size_two_colours] += quantity
            else:
                cart[item_id][item_id_key][size_two_colours] = quantity
        else:
            cart[item_id] = {item_id_key: {size_two_colours: quantity}}
    elif size and colour:
        if item_id in list(cart.keys()):
            if size_colour in cart[item_id][item_id_key].keys():
                cart[item_id][item_id_key][size_colour] += quantity
            else:
                cart[item_id][item_id_key][size_colour] = quantity
        else:
            cart[item_id] = {item_id_key: {size_colour: quantity}}
    elif colour and secondary_colour:
        if item_id in list(cart.keys()):
            if two_colours in cart[item_id][item_id_key].keys():
                cart[item_id][item_id_key][two_colours] += quantity
            else:
                cart[item_id][item_id_key][two_colours] = quantity
        else:
            cart[item_id] = {item_id_key: {two_colours: quantity}}
    elif colour:
        if item_id in list(cart.keys()):
            if colour_only in cart[item_id][item_id_key].keys():
                cart[item_id][item_id_key][colour_only] += quantity
            else:
                cart[item_id][item_id_key][colour_only] = quantity
        else:
            cart[item_id] = {item_id_key: {colour_only: quantity}}

    else:
        if item_id in list(cart.keys()):
            cart[item_id] += quantity
        else:
            cart[item_id] = quantity

    request.session['cart'] = cart
    return redirect(redirect_url)