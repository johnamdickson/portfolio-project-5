import json
from django import template


register = template.Library()

@register.filter
def json_loads(value):
    return json.loads(value)
    

@register.filter(name='calc_subtotal')
def calc_subtotal(price, quantity):
    return price * quantity