from django.shortcuts import render, redirect, reverse, get_object_or_404, HttpResponse
from django.contrib import messages
from products.models import Product
from num2words import num2words

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

    product = get_object_or_404(Product, pk=item_id)
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
    size_only = f"{size},{None},{None}"
    colour_only = f"{None},{colour},{None}"
    two_colours = f"{None},{colour},{secondary_colour}"
    size_colour = f"{size},{colour},{None}"
    size_two_colours= f"{size},{colour},{secondary_colour}"
    item_id_key = 'items_size_and_or_colour'
    
    if size and colour and secondary_colour:
        if item_id in list(cart.keys()):
            if size_two_colours in cart[item_id][item_id_key].keys():
                cart[item_id][item_id_key][size_two_colours] += quantity
                messages.success(request,                              
                                (f'{product.name.upper()} '
                                f'in {size.upper()} size, with '
                                f' {colour.upper()} and {secondary_colour.upper()}'
                                f' colours quantity changed to '
                                f'{cart[item_id][item_id_key][size_two_colours]}'),
                                extra_tags = "Item Added to Cart")
            else:
                cart[item_id][item_id_key][size_two_colours] = quantity
                messages.success(request,                              
                                (f'{num2words(cart[item_id][item_id_key][size_two_colours]).upper()}'
                                f' {product.name.upper()} in {size.upper()} size, with '
                                f' {colour.upper()} and {secondary_colour.upper()}'
                                f' colours added to cart.'),
                                extra_tags = "Item Added to Cart")
        else:
            cart[item_id] = {item_id_key: {size_two_colours: quantity}}
            messages.success(request,                              
                            (f'{num2words(cart[item_id][item_id_key][size_two_colours]).upper()}'
                            f' {product.name.upper()} in {size.upper()} size, with '
                            f' {colour.upper()} and {secondary_colour.upper()}'
                            f' colours added to cart.'),
                            extra_tags = "Item Added to Cart")
    elif size and colour:
        if item_id in list(cart.keys()):
            if size_colour in cart[item_id][item_id_key].keys():
                cart[item_id][item_id_key][size_colour] += quantity
                messages.success(request,                              
                                (f'{product.name.upper()} '
                                f'in {size.upper()} size, with '
                                f'{colour.upper()} colour quantity changed to '
                                f'{cart[item_id][item_id_key][size_colour]}'),
                                extra_tags = "Item Added to Cart")
            else:
                cart[item_id][item_id_key][size_colour] = quantity
                messages.success(request,                              
                                (f'{num2words(cart[item_id][item_id_key][size_colour]).upper()}'
                                f' {product.name.upper()} in {size.upper()} size, with '
                                f' {colour.upper()}  colour added to cart.'),
                                extra_tags = "Item Added to Cart")
        else:
            cart[item_id] = {item_id_key: {size_colour: quantity}}
            messages.success(request,                              
                            (f'{num2words(cart[item_id][item_id_key][size_colour]).upper()}'
                            f' {product.name.upper()} in {size.upper()} size, with '
                            f' {colour.upper()}  colour added to cart.'),
                            extra_tags = "Item Added to Cart")

    elif colour and secondary_colour:
        if item_id in list(cart.keys()):
            if two_colours in cart[item_id][item_id_key].keys():
                cart[item_id][item_id_key][two_colours] += quantity
                messages.success(request,                              
                                (f'{product.name.upper()} '
                                f'in {colour.upper()} and {secondary_colour.upper()}'
                                f' colours quantity changed to '
                                f'{cart[item_id][item_id_key][two_colours]}'),
                                extra_tags = "Item Added to Cart")
            else:
                cart[item_id][item_id_key][two_colours] = quantity
                messages.success(request,                              
                                (f'{num2words(cart[item_id][item_id_key][two_colours]).upper()}'
                                f' {product.name.upper()} in {colour.upper()} '
                                f'and {secondary_colour.upper()}'
                                f' colours added to cart.'),
                                extra_tags = "Item Added to Cart")
        else:
            cart[item_id] = {item_id_key: {two_colours: quantity}}
            messages.success(request,                              
                            (f'{num2words(cart[item_id][item_id_key][two_colours]).upper()}'
                            f' {product.name.upper()} in {colour.upper()} '
                            f'and {secondary_colour.upper()}'
                            f' colours added to cart.'),
                            extra_tags = "Item Added to Cart")
    elif colour:
        if item_id in list(cart.keys()):
            if colour_only in cart[item_id][item_id_key].keys():
                cart[item_id][item_id_key][colour_only] += quantity
            else:
                cart[item_id][item_id_key][colour_only] = quantity
        else:
            cart[item_id] = {item_id_key: {colour_only: quantity}}
    elif size:
        if item_id in list(cart.keys()):
            if size_only in cart[item_id][item_id_key].keys():
                cart[item_id][item_id_key][size_only] += quantity
            else:
                cart[item_id][item_id_key][size_only] = quantity
        else:
            cart[item_id] = {item_id_key: {size_only: quantity}}
    else:
        if item_id in list(cart.keys()):
            cart[item_id] += quantity
        else:
            cart[item_id] = quantity

    request.session['cart'] = cart
    return redirect(redirect_url)

def adjust_cart(request, item_id):
    """Adjust the quantity of the specified product to the specified amount"""

    product = get_object_or_404(Product, pk=item_id)
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
    item_id_key = 'items_size_and_or_colour'

    # checks for size, colour and secondary colour key in the items_id_key
    # and then checks quantity. If greater than 0 and update is made. If 
    # 0 then item is deleted.
    if size and colour and secondary_colour:
        if quantity > 0:
            cart[item_id][item_id_key][size_two_colours] = quantity
            messages.success(request,
                             (f'{product.name.upper()} '
                              f'in {size.upper()} size, with '
                              f' {colour.upper()} and {secondary_colour.upper()}'
                              f' colours quantity changed to '
                              f'{cart[item_id][item_id_key][size_two_colours]}'),
                              extra_tags = "Item Updated")
        else:   
            del cart[item_id][item_id_key][size_two_colours]
            if not cart[item_id][item_id_key]:
                cart.pop(item_id)
            messages.info(request,
                            (f'{product.name.upper()} '
                            f'in {size.upper()} size with '
                            f' {colour.upper()} and  '
                            f'{secondary_colour.upper()} colours'
                            ' removed from cart.'),
                            extra_tags = 'Item Removed')

    # performs similar action to above but only if product has a size and colour.
    elif size and colour:
        if quantity > 0:
            cart[item_id][item_id_key][size_colour] = quantity
            messages.success(request,
                             (f'{product.name.upper()} '
                              f'in {size.upper()} size, with '
                              f' {colour.upper()} colour'
                              ' quantity changed to '
                              f'{cart[item_id][item_id_key][size_colour]}'),
                              extra_tags = "Item Updated")
        else:   
            del cart[item_id][item_id_key][size_colour]
            if not cart[item_id][item_id_key]:
                cart.pop(item_id)
            messages.info(request,
                            (f'{product.name.upper()} '
                            f'in {size.upper()} size and'
                            f' {colour.upper()} '
                            'colour removed from cart.'),
                            extra_tags = 'Item Removed')

    # performs action for items with two colours.
    elif colour and secondary_colour:
        if quantity > 0:
            cart[item_id][item_id_key][two_colours] = quantity
            messages.success(request,
                             (f'{product.name.upper()} '
                              f'in {colour.upper()} and {secondary_colour.upper()}'
                              ' colours quantity changed to '
                              f'{cart[item_id][item_id_key][size_two_colours]}'),
                              extra_tags = "Item Updated")
        else:   
            del cart[item_id][item_id_key][two_colours]
            if not cart[item_id][item_id_key]:
                cart.pop(item_id)
            messages.info(request,
                            (f'{product.name.upper()} '
                            f'in {colour.upper()} and  '
                            f'{secondary_colour.upper()} colours'
                            ' removed from cart.'),
                            extra_tags = 'Item Removed')
    
    # performs action for items with size only.
    elif size:
        if quantity > 0:
            cart[item_id][item_id_key][size_only] = quantity
            messages.success(request,
                             (f'{product.name.upper()} in'
                              f'{size.upper()} size quantity changed to'
                              f' {cart[item_id][item_id_key][size_only]}'),
                              extra_tags = "Item Updated")
        else:   
            del cart[item_id][item_id_key][size_only]
            if not cart[item_id][item_id_key]:
                cart.pop(item_id)
            messages.info(request,
                         (f'{product.name.upper()} '
                         f'in {size.upper()} size '
                         'removed from cart.'),
                         extra_tags = 'Item Removed')

    # performs action for items with one colour only.
    elif colour and not secondary_colour:
        if quantity > 0:
            cart[item_id][item_id_key][colour_only] = quantity
            messages.success(request,
                             (f'{product.name.upper()} in {colour.upper()}'
                              ' colour quantity changed to '
                              f'{cart[item_id][item_id_key][colour_only]}'),
                              extra_tags = "Item Updated")
        else:   
            del cart[item_id][item_id_key][colour_only]
            if not cart[item_id][item_id_key]:
                cart.pop(item_id)
            messages.info(request,
                            (f'{product.name.upper()} in'
                            f' {colour.upper()} colour '
                            'removed from cart.'),
                            extra_tags = 'Item Removed')

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
        item_id_key = 'items_size_and_or_colour'

        if size and colour and secondary_colour:
            try:
                del cart[item_id][item_id_key][size_two_colours]
                if not cart[item_id][item_id_key]:
                    cart.pop(item_id)
                messages.info(request,
                                (f'{product.name.upper()} '
                                f'in {size.upper()} size with '
                                f' {colour.upper()} and  '
                                f'{secondary_colour.upper()} colours'
                                ' removed from cart.'),
                                extra_tags = 'Item Removed')
            except Exception as e:
                messages.error(request, f'Error removing item: {e}')
                return HttpResponse(status=500)

            request.session['cart'] = cart                
            return HttpResponse(status=200)

        elif size and colour:
            try:
                del cart[item_id][item_id_key][size_colour]
                if not cart[item_id][item_id_key]:
                    cart.pop(item_id)
                messages.info(request,
                                (f'{product.name.upper()} '
                                f'in {size.upper()} size and'
                                f' {colour.upper()} '
                                'colour removed from cart.'),
                                extra_tags = 'Item Removed')
            except Exception as e:
                messages.error(request, f'Error removing item: {e}')
                return HttpResponse(status=500)
                
            request.session['cart'] = cart
            return HttpResponse(status=200)

        elif colour and secondary_colour:
            try:
                del cart[item_id][item_id_key][two_colours]
                if not cart[item_id][item_id_key]:
                    cart.pop(item_id)
                messages.info(request,
                                (f'{product.name.upper()} '
                                f'in {colour.upper()} and  '
                                f'{secondary_colour.upper()} colours'
                                ' removed from cart.'),
                                extra_tags = 'Item Removed')
            except Exception as e:
                messages.error(request, f'Error removing item: {e}')
                return HttpResponse(status=500)
                
            request.session['cart'] = cart
            return HttpResponse(status=200)

        elif size:
            try:
                del cart[item_id][item_id_key][size_only]
                if not cart[item_id][item_id_key]:
                    cart.pop(item_id)
                messages.info(request,
                                (f'{product.name.upper()} '
                                f'in {size.upper()} size '
                                'removed from cart.'),
                                extra_tags = 'Item Removed')
            except Exception as e:
                messages.error(request, f'Error removing item: {e}')
                return HttpResponse(status=500)
                
            request.session['cart'] = cart
            return HttpResponse(status=200)

        elif colour and not secondary_colour:
            try:
                del cart[item_id][item_id_key][colour_only]
                if not cart[item_id][item_id_key]:
                    cart.pop(item_id)
                messages.info(request,
                             (f'{product.name.upper()} in'
                              f' {colour.upper()} colour '
                              'removed from cart.'),
                              extra_tags = 'Item Removed')
                              
            except Exception as e:
                messages.error(request, f'Error removing item: {e}')
                return HttpResponse(status=500)
                
            request.session['cart'] = cart
            return HttpResponse(status=200)

        else:
            cart.pop(item_id)
            messages.info(request, 
                         f'{product.name.upper()} '
                         ' removed from your cart',
                         extra_tags = 'Item Removed')

            request.session['cart'] = cart
            return HttpResponse(status=200)

    except Exception as e:
        messages.error(request, f'Error removing item: {e}')
        return HttpResponse(status=500)
    
    return redirect(reverse('view_cart'))