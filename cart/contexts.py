from decimal import Decimal
from django.conf import settings
from django.shortcuts import get_object_or_404
from products.models import Product


def cart_contents(request):
    """
    Return cart contents to context processor for access across
    all pages.
    """
    cart_items = []
    total = 0
    product_count = 0
    # checks session for cart and returns empty dict if absent.
    cart = request.session.get('cart', {})

    for item_id, item_data in cart.items():
        if isinstance(item_data, int):
            # if item has no attributes (size or colour) this code
            # code is run.
            product = get_object_or_404(Product, pk=item_id)
            # update total with price for items
            total += item_data * product.price
            # iterate product_count for context
            product_count += item_data
            # append items to cart items list
            cart_items.append({
                'item_id': item_id,
                'quantity': item_data,
                'product': product,
            })
        else:
            # code below run when attributes exist using identifying
            # key 'items_size_and_or_colour'
            product = get_object_or_404(Product, pk=item_id)
            key = 'items_size_and_or_colour'
            for properties, quantity in item_data[key].items():
                # split properties by comma to return size, colour
                # and secondary colour.
                property_list = properties.split(',')
                size = property_list[0]
                # ternary operators to return None if string'None' is
                # present for each propertry in the property list.
                size = None if size == 'None' else size
                colour = property_list[1]
                colour = None if colour == 'None' else colour
                secondary_colour = property_list[2]
                secondary_colour = (
                    None if secondary_colour ==
                    'None' else secondary_colour
                    )
                # update total with price for items
                total += quantity * product.price
                # iterate product_count for context
                product_count += quantity
                # append items to cart items list
                cart_items.append({
                    'item_id': item_id,
                    'quantity': quantity,
                    'product': product,
                    'size': size,
                    'colour': colour,
                    'secondary_colour': secondary_colour,
                })
    # calculate if total has surpassed the free delivery threshold
    if total < settings.FREE_DELIVERY_THRESHOLD:
        delivery = total * Decimal(settings.STANDARD_DELIVERY_PERCENTAGE / 100)
        free_delivery_delta = settings.FREE_DELIVERY_THRESHOLD - total
    else:
        delivery = 0
        free_delivery_delta = 0
    # calculate grand total
    grand_total = delivery + total
    # build context with cart items reversed list so that most recently
    # purchased products appear first.
    context = {
        'cart_items': list(reversed(cart_items)),
        'total': total,
        'product_count': product_count,
        'delivery': delivery,
        'free_delivery_delta': free_delivery_delta,
        'free_delivery_threshold': settings.FREE_DELIVERY_THRESHOLD,
        'grand_total': grand_total,
    }

    return context
