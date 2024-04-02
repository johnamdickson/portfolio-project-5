from django.db import models
import uuid
import constants as k
import os


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
    Product model containing all product fields. Unique product id uses UUID to 
    generate a unique number. Sizes and colours fields use a many-to-many 
    relationship to cover different configurations of all properties with
    products. The learn_product_pdf is a file field for uploading tutorial pdfs.
    The other fields are self explanatory in terms of their intent.
    """
    category = models.ForeignKey(
        'Category',
        null=True,
        blank=True,
        on_delete=models.SET_NULL
        )
    name = models.CharField(max_length=254)
    unique_product_identifier = models.UUIDField(
        primary_key=False,
        default=uuid.uuid4,
        editable=False
        )
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    # use of many to many relationship as a means of returning a list of
    # options for size or colour, solution from stack overflow:
    # https://stackoverflow.com/questions/45947457/django-how-can-i-get-a-model-that-store-a-listlike-in-python-or-anyway-of-a-s
    sizes = models.ManyToManyField('ProductSize', blank=True)
    colours = models.ManyToManyField('ProductColour', blank=True)
    secondary_colour = models.BooleanField(default=False, blank=True)
    learn_product = models.BooleanField(default=False, blank=True)
    learn_product_pdf = models.FileField(
        upload_to='pdfs',
        null=True,
        blank=True,
        verbose_name="Learn .pdf File"
        )
    image_url = models.URLField(max_length=1024, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.name

    def filename(self):
        """
        Method to return filename for sending pdf in email:
        """
        # https://stackoverflow.com/questions/51459940/filename-only-in-django-form-field
        return os.path.basename(self.learn_product_pdf.name)

    def svg(self):
        """
        Method to return correct svg includes string based on 
        product category.
        """
        name = self.category.friendly_name

        if name == 'Hats':
            return 'includes/svgs/hat-icon.html'
        elif name == 'Learn to Crochet':
            return 'includes/svgs/learn-icon.html'
        elif name == 'Blankets':
            return 'includes/svgs/blanket-icon.html'
        elif name == 'Gift Sets':
            return 'includes/svgs/gift-sets-icon.html'
        elif name == 'Search Products':
            return 'includes/svgs/search-icon.html'
        else:
            return 'includes/svgs/product-icon.html'


class ProductSize(models.Model):
    """
    Product size model containing all available sizes imported from
    constants file and returned as choice in charfield.
    """
    class Meta:
        verbose_name_plural = 'Sizes'

    AVAILABLE_SIZES = k.SIZES
    name = models.CharField(max_length=20)
    size = models.CharField(choices=AVAILABLE_SIZES, max_length=50)

    def __str__(self):
        return self.name


class ProductColour(models.Model):
    """
    Product colour model containing all available colours imported from
    constants file and returned as choice in charfield.
    """
    class Meta:
        verbose_name_plural = 'Colours'

    AVAILABLE_COLOURS = k.COLOURS
    name = models.CharField(max_length=20)
    colour = models.CharField(choices=AVAILABLE_COLOURS, max_length=20)

    def __str__(self):
        return self.name
