import json
from django import template
import country_converter as coco

register = template.Library()

@register.filter
def return_country(iso_country):
    country = coco.convert(names=[iso_country], to='name_short')
    return country
