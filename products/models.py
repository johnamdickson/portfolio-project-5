from django.db import models
import constants as k

# Create your models here.
class Category(models.Model):
    """
    Category model for the product categories used in the store. Friendly name 
    returns a more natural representation of the category.
    """
    class Meta:
        verbose_name_plural = 'Categories'
        
    name = models.CharField(max_length=254)
    friendly_name = models.CharField(max_length=254, null=True, blank=True)

    def __str__(self):
        return self.name

    def get_friendly_name(self):
        return self.friendly_name


class Product(models.Model):
    """
    Product model containing all product fields. Unique product id updates automatically
    by iterating from last sequential number. The other fields are self explanatory in terms
    of their intent.
    """
    category = models.ForeignKey('Category', null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=254)
    # unique_product_identifier = models.AutoField(primary_key=True)
    unique_product_identifier = models.CharField(max_length=20)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    has_sizes = models.BooleanField(default=False, null=True, blank=True)
    sizes = models.ManyToManyField('ProductSize', blank=True)
    colours = models.ManyToManyField('ProductColour', blank=True)
    learn_product = models.BooleanField(default=False, blank=True)
    image_url = models.URLField(max_length=1024, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.name

class ProductSize(models.Model):

    class Meta:
        verbose_name_plural = 'Sizes'

    AVAILABLE_SIZES = k.SIZES
    name = models.CharField(max_length=20)
    size = models.CharField(choices=AVAILABLE_SIZES, max_length=50)

    def __str__(self):
        return self.name


class ProductColour(models.Model):

    class Meta:
        verbose_name_plural = 'Colours'

    AVAILABLE_COLOURS = k.COLOURS
    name = models.CharField(max_length=20)
    colour = models.CharField(choices=AVAILABLE_COLOURS, max_length=20)

    def __str__(self):
        return self.name