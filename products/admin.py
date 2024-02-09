from django.contrib import admin
from .models import Product, Category, ProductSize, ProductColour

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'unique_product_identifier',
        'name',
        'category',
        'price',
        'image',
        'learn_product',
        'pk',
    )

    ordering = ('category',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'friendly_name',
        'name',
    )

admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(ProductSize)
admin.site.register(ProductColour)