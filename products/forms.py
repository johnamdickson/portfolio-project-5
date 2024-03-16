from django import forms
from .models import Product, Category, ProductSize, ProductColour


class ProductForm(forms.ModelForm):

    class Meta:
        model = Product
        exclude = ('image_url',)
        # how to return check boxes for Many to Many fields.
        # https://stackoverflow.com/questions/18048172/django-forms-many-to-many-relationships
        categories1 = forms.MultipleChoiceField(
            widget=forms. CheckboxSelectMultiple,
            choices=[('', 'All'), ] + [ (char .name, char) for char in Category.objects.all()], required=True,
            )
        widgets = {
            'sizes': forms.CheckboxSelectMultiple(),
            'colours': forms.CheckboxSelectMultiple(),
        }
    



    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        categories = Category.objects.all()
        friendly_names = [(c.id, c.get_friendly_name()) for c in categories]
        self.fields['category'].choices = friendly_names
