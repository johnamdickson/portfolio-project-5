import json
from django import template
from num2words import num2words

register = template.Library()


@register.filter
def calc_subtotal(price, quantity):
    return price * quantity


@register.filter
def num_to_words(number):
    return num2words(number).upper()
