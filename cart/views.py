from django.shortcuts import render, redirect, reverse, get_object_or_404, HttpResponse
from django.contrib import messages
from products.models import Product
from num2words import num2words
import constants as k

# Create your views here.

def view_cart(request):
    """ A view that renders the cart contents page """

    return render(request, 'cart/cart.html')

def add_to_cart(request, item_id):
    """ Add a quantity of the specified product to the shopping cart """

    product = get_object_or_404(Product, pk=item_id)
    product_name = (product.name)
    quantity = int(request.POST.get('quantity'))
    redirect_url = request.POST.get('redirect_url')
    size = None
    colour = None
    secondary_colour = None
    if 'product_size' in request.POST:
        size = request.POST['product_size']
        size = None if size == 'None' else size
    if 'product_colour' in request.POST:
        colour = request.POST['product_colour']
        colour = None if colour == 'None' else colour
    if 'secondary_product_colour' in request.POST:
        secondary_colour = request.POST['secondary_product_colour']
        secondary_colour = None if secondary_colour == 'None' else secondary_colour
    cart = request.session.get('cart', {})
    size_only = f"{size},{None},{None}"
    colour_only = f"{None},{colour},{None}"
    two_colours = f"{None},{colour},{secondary_colour}"
    size_colour = f"{size},{colour},{None}"
    size_two_colours= f"{size},{colour},{secondary_colour}"
    handle_item_data = {'product_name' : product_name, 
                        'quantity': quantity,
                        'cart': cart,
                        'id': item_id,
                        }

    if size and colour and secondary_colour:
        handle_item_action(size_two_colours, k.ADD, handle_item_data, request)

    elif size and colour:
        handle_item_action(size_colour, k.ADD, handle_item_data, request)

    elif colour and secondary_colour:
        handle_item_action(two_colours, k.ADD, handle_item_data, request)

    elif colour:
        handle_item_action(colour_only, k.ADD, handle_item_data, request)

    elif size:
        handle_item_action(size_only, k.ADD, handle_item_data, request)

    else:
        if item_id in list(cart.keys()):
            cart[item_id] += quantity
            messages.info(request,                              
                            (f'<p class="mb-2">{product.name.title()} '
                            f'quantity changed to <strong>{num2words(cart[item_id]).title()}'
                            '</strong></p><ul>'),
                            extra_tags = "Item Updated")
        else:
            cart[item_id] = quantity
            messages.success(request,                              
                            (f'<p class="mb-2"><strong>'
                            f'{num2words(cart[item_id]).title()}</strong> of'
                            f' <strong>{product.name.title()}</strong> added to'
                            f' cart</p>'),
                            extra_tags = "Item Added to Cart")


    request.session['cart'] = cart
    return redirect(redirect_url)

def adjust_cart(request, item_id):
    """Adjust the quantity of the specified product to the specified amount"""

    product = get_object_or_404(Product, pk=item_id)
    product_name = (product.name)
    quantity = int(request.POST.get('quantity'))
    size = None
    colour = None
    secondary_colour = None
    if 'product_size' in request.POST:
        size = request.POST['product_size']
        size = None if size == 'None' else size
    if 'product_colour' in request.POST:
        colour = request.POST['product_colour']
        colour = None if colour == 'None' else colour
    if 'secondary_product_colour' in request.POST:
        secondary_colour = request.POST['secondary_product_colour']
        secondary_colour = None if secondary_colour == 'None' else secondary_colour
    cart = request.session.get('cart', {})
    size_only = f"{size},{None},{None}"
    colour_only = f"{None},{colour},{None}"
    two_colours = f"{None},{colour},{secondary_colour}"
    size_colour = f"{size},{colour},{None}"
    size_two_colours= f"{size},{colour},{secondary_colour}"
    handle_item_data = {'product_name' : product_name, 
                    'quantity': quantity,
                    'cart': cart,
                    'id': item_id,
                    }

    # checks for size, colour and secondary colour key in the items_id_key
    # and then checks quantity. If greater than 0 and update is made. If 
    # 0 then item is deleted.
    if size and colour and secondary_colour:
        handle_item_action(size_two_colours, k.UPDATE, handle_item_data, request)


    # performs similar action to above but only if product has a size and colour.
    elif size and colour:
        handle_item_action(size_colour, k.UPDATE, handle_item_data, request)

    # performs action for items with two colours.
    elif colour and secondary_colour:
        handle_item_action(two_colours, k.UPDATE, handle_item_data, request)

      
    # performs action for items with size only.
    elif size:
        handle_item_action(size_only, k.UPDATE, handle_item_data, request)

    # performs action for items with one colour only.
    elif colour and not secondary_colour:
        handle_item_action(colour_only, k.UPDATE, handle_item_data, request)

    # capturing all other products without size or colour.
    else:
        if quantity > 0:
            cart[item_id] = quantity
            messages.success(request,
                             (f'Updated {product.name} '
                              f'quantity to {cart[item_id]}'),
                              extra_tags = "Item Updated")
        else:
            cart.pop(item_id)
            messages.info(request, 
                         f'{product.name.upper()} '
                         ' removed from your cart',
                         extra_tags = 'Item Removed')

    request.session['cart'] = cart
    return redirect(reverse('view_cart'))


def remove_from_cart(request, item_id):
    """Remove the item from the shopping cart"""
    
    try:
        product = get_object_or_404(Product, pk=item_id)
        product_name = (product.name)
        size = None
        colour = None
        secondary_colour = None
        if 'product_size' in request.POST:
            size = request.POST['product_size']
            size = None if size == 'None' else size
        if 'product_colour' in request.POST:
            colour = request.POST['product_colour']
            colour = None if colour == 'None' else colour
        if 'secondary_product_colour' in request.POST:
            secondary_colour = request.POST['secondary_product_colour']
            secondary_colour = None if secondary_colour == 'None' else secondary_colour
        cart = request.session.get('cart', {})
        size_only = f"{size},{None},{None}"
        colour_only = f"{None},{colour},{None}"
        two_colours = f"{None},{colour},{secondary_colour}"
        size_colour = f"{size},{colour},{None}"
        size_two_colours= f"{size},{colour},{secondary_colour}"
        handle_item_data = {'product_name' : product_name, 
                            'quantity': 0,
                            'cart': cart,
                            'id': item_id,
                            }   
        
        if size and colour and secondary_colour:
            handle_item_action(size_two_colours, k.REMOVE, handle_item_data, request)

        elif size and colour:
            handle_item_action(size_colour, k.REMOVE, handle_item_data, request)

        elif colour and secondary_colour:
            handle_item_action(two_colours, k.REMOVE, handle_item_data, request)

        elif size:
            handle_item_action(size_only, k.REMOVE, handle_item_data, request)

        elif colour and not secondary_colour:
            handle_item_action(colour_only, k.REMOVE, handle_item_data, request)

        else:
            cart.pop(item_id)
            messages.info(request, 
                         f'{product.name.upper()}'
                         ' removed from your cart',
                         extra_tags = 'Item Removed')

        request.session['cart'] = cart
        return HttpResponse(status=200)

    except Exception as e:
        messages.error(request, f'Error removing item: {e}')
        return HttpResponse(status=400)   




def handle_item_action(key, action, item_data, request):
    """
    Common function for add, adjust and delete cart items to avoid repetition and
    nested if statements. Function takes in requred data from the main functions 
    and then updates the cart before calling internal function to display message success 
    to user.
    """
    cart = item_data['cart']
    quantity = item_data['quantity']
    product_name = item_data['product_name']
    id = item_data['id']
    id_key = 'items_size_and_or_colour'

    def create_message(key, action):
        if cart[id][id_key][key]:
            quantity_key = cart[id][id_key][key]
        attributes_list = key.split(',')
        size_string = (
            "" if attributes_list[0] == 'None'
            else f'<li>Size: <strong>{attributes_list[0]}'
            '</strong></li>'
            )
        primary_colour_string = (
            "" if attributes_list[1] == 'None'
            else f'<li>Primary Colour: <strong>{attributes_list[1]}'
            '</strong> </li>'
            ) 
        secondary_colour_string = (
            "" if attributes_list[2] == 'None'
            else f'<li>Secondary Colour: <strong>{attributes_list[2]}'
            f'</strong></li>'
            ) 
        item_added_tag = "Item Added to Cart"
        item_updated_tag = "Item Updated"
        item_removed_tag = "Item Removed"
        if action == k.UPDATE:
            messages.info(request,                              
                            (f'<p class="mb-2">{product_name.title()} '
                            f'quantity changed to <strong>{quantity_key}'
                            '</strong></p><ul>'
                            f'{size_string} {primary_colour_string}'
                            f' {secondary_colour_string}'),
                            extra_tags = item_updated_tag)
        elif action == k.ADD:
            messages.success(request,                              
                            (f'<p class="mb-2"><strong>'
                            f'{num2words(quantity).title()}</strong> of'
                            f' <strong>{product_name.title()}</strong> added to'
                            f' cart</p><ul>{size_string} {primary_colour_string}'
                            f' {secondary_colour_string}'),
                            extra_tags = item_added_tag)
        elif action == k.REMOVE:
            messages.info(request,                              
                            (f'<p class="mb-2">{product_name.title()} '
                            f'removed from cart </p><ul>'
                            f'{size_string} {primary_colour_string}'
                            f' {secondary_colour_string}'),
                            extra_tags = item_removed_tag)

    if id in list(cart.keys()):
        # If statement checks if the id key exists in cart dictionary. The nested if and elif
        # statements then check if the size/colour keys exist and either update or add accordingly.
        if key in cart[id][id_key].keys() and action == k.ADD:
            cart[id][id_key][key] += quantity
            create_message(key, k.UPDATE)
        elif action == k.ADD:
            cart[id][id_key][key] = quantity   
            create_message(key, k.ADD)
        elif action == k.UPDATE and quantity > 0:
            cart[id][id_key][key] = quantity
            create_message(key, k.UPDATE)
        elif action == k.UPDATE and quantity == 0:
            create_message(key, k.REMOVE)
            del cart[id][id_key][key]
            if not cart[id][id_key]:
                cart.pop(id)
        elif action == k.REMOVE:
            create_message(key, k.REMOVE)
            del cart[id][id_key][key]
            if not cart[id][id_key]:
                cart.pop(id)

    else:
        cart[id] = {id_key: {key: quantity}}
        create_message(key, k.ADD)
