import json
from django import template
import country_converter as coco

register = template.Library()


@register.filter
def return_country(iso_country):
    """
    Template tag to filter iso country codes to human readable
    countries using country converter
    """
    country = coco.convert(names=[iso_country], to='name_short')
    return country
