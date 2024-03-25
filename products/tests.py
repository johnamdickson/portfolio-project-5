from django.test import TestCase, Client, RequestFactory
from .models import Category, Product, ProductSize, ProductColour
import constants as k
from django.urls import reverse
from django.contrib.messages import get_messages
from django.contrib.auth.models import User
from django.contrib.sessions.middleware import SessionMiddleware
import uuid
from .views import products


# Much of the testing methods below were influenced by my pp4 tests:
# https://github.com/johnamdickson/portfolio-project-4/blob/main/monitoring_tool/tests.py

class CategoryTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Category.objects.create(name='hats_test', friendly_name='Hats Test')

    def test_category_name(self):
        """
        Test category name assigned in setup is correct.
        """
        category = Category.objects.get(id=1)
        category_name = category.name
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'Assigned category name of "{category_name}"'
             f' should equal "hats_test"')
        self.assertEqual(category_name, 'hats_test')

    def test_category_friendly_name(self):
        """
        Test category friendly name assigned in setup is correct.
        """
        category = Category.objects.get(id=1)
        category_friendly_name = category.get_friendly_name()
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Friendly name of "{category_friendly_name}"'
            f' should equal "Hats Test"')
        self.assertEqual(category_friendly_name, 'Hats Test')


class ProductTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Category.objects.create(name='hats_test')
        Product.objects.create(
            name='Test Hat',
            description='A hat used for test purposes',
            price=19.99,
            category=Category.objects.get(name='hats_test')
            )
        
    def test_product_name_and_category(self):
        """
        Test product name and category assigned in setup is correct.
        """
        product = Product.objects.get(id=1)
        product.sizes.set([ProductSize.objects.create(name='Test Hat Size', size=k.SIZES[0])])
        product.category = Category.objects.get(name='hats_test')
        product_name = product.name
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'Assigned product name of "{product_name}"'
             ' should equal "Test Hat".\n'
            f' Assigned product category of "{product.category}"'
            f' should equal "{Category.objects.get(name="hats_test")}"'
            )
        self.assertEqual(product_name, 'Test Hat')
        self.assertEqual(product.category, Category.objects.get(name='hats_test'))

    def test_product_description(self):
        """
        Test product description assigned in setup is correct.
        """
        product = Product.objects.get(id=1)
        product_description = product.description
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'Assigned product description of "{product_description}"'
             f' should equal "A hat used for test purposes"')
        self.assertEqual(product_description, 'A hat used for test purposes')

    def test_product_attributes(self):
        """
        Test product attributes of sizes and colours assigned in test are correct.
        """
        product = Product.objects.get(id=1)
        # assign sizes to Hat Test
        product.sizes.set([
            ProductSize.objects.create(name='Test Hat Size 1', size=k.SIZES[0]), 
            ProductSize.objects.create(name='Test Hat Size 2', size=k.SIZES[1]), 
            ])
        # assign colours to Hat Test
        product.colours.set([
            ProductColour.objects.create(name='Test Hat Colour 1', colour=k.COLOURS[0]), 
            ProductColour.objects.create(name='Test Hat Colour 2', colour=k.COLOURS[1]), 
            ])
        first_size = product.sizes.all()[0]
        second_size = product.sizes.all()[1]
        first_colour = product.colours.all()[0]
        second_colour = product.colours.all()[1]
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'Assigned first size name of "{first_size.name}"'
             ' should equal "Test Hat Size 1".\n'
             f' Assigned first size of "{first_size.size}"'
             f' should equal "{k.SIZES[0]}".\n'
             f' Assigned second size name of "{second_size}"'
             ' should equal "Test Hat Size 2".\n'
             f' Assigned second size of "{second_size.size}"'
             f' should equal "{k.SIZES[1]}".\n'
             f' Assigned first colour name of "{first_colour.name}"'
             ' should equal "Test Hat Size 1".\n'
             f' Assigned first size of "{first_colour.colour}"'
             f' should equal "{k.COLOURS[0]}".\n'
             f' Assigned second size name of "{second_colour}"'
             ' should equal "Test Hat Size 2".\n'
             f' Assigned second size of "{second_colour.colour}"'
             f' should equal "{k.COLOURS[1]}".\n'
            )
        self.assertEqual(first_size.name, 'Test Hat Size 1')
        self.assertEqual(second_size.name, 'Test Hat Size 2')
        self.assertEqual(first_size.size, f"{k.SIZES[0]}")
        self.assertEqual(second_size.size, f"{k.SIZES[1]}")
        self.assertEqual(first_colour.name, 'Test Hat Colour 1')
        self.assertEqual(second_colour.name, 'Test Hat Colour 2')
        self.assertEqual(first_colour.colour, f"{k.COLOURS[0]}")
        self.assertEqual(second_colour.colour, f"{k.COLOURS[1]}")

class ProductSizeTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        ProductSize.objects.create(name='Test Hat Size', size=k.SIZES[0])

    def test_product_size(self):
        """
        Test product size assigned in setup is correct.
        """
        # use eval to extract tuple from string:
        # https://stackoverflow.com/questions/9763116/parse-a-tuple-from-a-string

        product_size = eval(ProductSize.objects.get(name='Test Hat Size').size)
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'Assigned product size of "{product_size}"'
             f' should equal "{k.SIZES[0]}"')
        self.assertEqual(product_size, k.SIZES[0])


class ProductColourTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        ProductColour.objects.create(name='Test Hat Colour', colour=k.COLOURS[0])

    def test_product_colour(self):
        """
        Test product colour assigned in setup is correct.
        """
        product_colour = eval(ProductColour.objects.get(name='Test Hat Colour').colour)
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'Assigned product colour of "{product_colour}"'
             f' should equal "{k.COLOURS[0]}"')
        self.assertEqual(product_colour, k.COLOURS[0])


class TestViews(TestCase):
    
    uuid_for_test = uuid.uuid4()

    # testing with users:
    # https://stackoverflow.com/questions/72421658/access-a-view-which-is-for-logged-in-users-in-django-testing
    def setUp(self):
        client = Client()
        self.factory = RequestFactory()
        hat_category = Category.objects.create(name='hats_test')
        z_category = Category.objects.create(name='z')
        blanket_category = Category.objects.create(name='blanket_add_test')
        admin_user = User.objects.create_superuser(username='test_admin', password='test_admin')
        regular_user = User.objects.create_user(username='test_regular', password='test_regular')

        self.product_1 = Product.objects.create(
            category=hat_category,
            name='Hat Test',
            unique_product_identifier=self.uuid_for_test,
            description='A hat used for test purposes',
            price=19.99,
        )
        self.product_1.sizes.set([ProductSize.objects.create(name='Test Hat Size', size=k.SIZES[0])])
        self.product_1.colours.set([ProductColour.objects.create(name='Test Hat Colour', colour=k.COLOURS[0])])

        self.product_2 = Product.objects.create(
            category=z_category,
            name='Z',
            unique_product_identifier=self.uuid_for_test,
            description='Last letter in alphabet for name and category with highest price',
            price=1999.99,
        )

    def test_products_view_GET(self):
        """
        Test get products view returns correct url, template and response code.
        """
        response = self.client.get(reverse('products'))
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'products/products.html')
    
    def test_products_sort_by_name(self):
        """
        Test sorting products by name returns correct sort.
        """
        url = reverse('products')
        response = self.client.get(url, {'sort': 'name'})
        sorted_products = response.context['products']
        print_list = [product.name for product in sorted_products]
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Products sorted by name:"{print_list}"'
            )
        self.assertEqual(sorted_products[0], self.product_1)
        self.assertEqual(sorted_products[1], self.product_2)

    def test_products_sort_by_category(self):
        """
        Test sorting products by category returns correct sort.
        """
        url = reverse('products')
        response = self.client.get(url, {'sort': 'category'})
        sorted_products = response.context['products']
        print_list = [{product.name:product.category.name} for product in sorted_products]
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Products sorted by category:"{print_list}"'
            )
        self.assertEqual(sorted_products[0], self.product_1)
        self.assertEqual(sorted_products[1], self.product_2)

    def test_products_sort_by_price(self):
        """
        Test sorting products by price returns correct sort.
        """
        url = reverse('products')
        response = self.client.get(url, {'sort': 'price'})
        sorted_products = response.context['products']
        print_list = [{product.name:product.price} for product in sorted_products]
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Products sorted by price:"{print_list}"'
            )
        self.assertEqual(sorted_products[0], self.product_1)
        self.assertEqual(sorted_products[1], self.product_2)

    def test_product_detail_view_GET(self):
        """
        Test get product detail view returns correct url, template and response code.
        """
        response = self.client.get(reverse('product_detail', args=[1]))
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'products/product-detail.html')

    def test_add_product_superuser(self):
        """
        Test adding product by the superuser adds a new product to DB, and redirects to
        the new products detail page.
        """
        blanket_colour = ProductColour.objects.create(name='Test Blanket Colour', colour=k.COLOURS[2])
        self.client.login(username='test_admin', password='test_admin')
        response = self.client.post(reverse('add_product'), {
            'category': Category.objects.get(name='blanket_add_test').id,
            'name': 'Test Blanket',
            'unique_product_identifier': uuid.uuid4(),
            'description': 'A blanket used for test purposes',
            'price': 39.00,
            'colours': [blanket_colour.id]
        })
        product = Product.objects.get(id=3)
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Added product "{product.name}"'
            f' with description "{product.description}":\n'
            f' price - "{product.price}"\n'
            f' colour - "{[product.colour for product in product.colours.all()]}"'
            )
        self.assertRedirects(response, reverse('product_detail', args=[3])) 

    def test_add_product_regular_user(self):
        """
        Test adding product by the regular user does not add a new product to DB, and redirects to
        the home page whilst also instantiating a message to user.
        """
        blanket_colour = ProductColour.objects.create(name='Test Blanket Colour', colour=k.COLOURS[2]) 
        self.client.login(username='test_regular', password='test_regular')
        response = self.client.post(reverse('add_product'), {
            'category': Category.objects.get(name='blanket_add_test').id,
            'name': 'Test Blanket',
            'unique_product_identifier': uuid.uuid4(),
            'description': 'A blanket used for test purposes',
            'price': 39.00,
            'colours': [blanket_colour.id]
        })
        messages = list(get_messages(response.wsgi_request))
        message_string = str(messages[0])
        product_exists = Product.objects.filter(id=3).exists()
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Attempting to add product as regular user.\n'
            f' Check for product existence: "{product_exists}"\n'
            f' Message returned to user: "{message_string}"\n'
            )
        self.assertEqual(len(messages), 1)
        self.assertEqual(
            message_string,
            'Sorry, only store owners can add products.' 
            )
        self.assertRedirects(response, reverse('home')) 
        self.assertFalse(product_exists)

    def test_add_product_no_user(self):
        """
        Test adding product by anonymous user does not add a new product to DB, and redirects to
        the login page.
        """
        response = self.client.post(reverse('add_product'), {
            'category': Category.objects.get(name='blanket_add_test').id,
            'name': 'Test Blanket',
            'unique_product_identifier': uuid.uuid4(),
            'description': 'A blanket used for test purposes',
            'price': 39.00,
        })
        # solution to redirect with next url parameter:
        # https://stackoverflow.com/questions/66449900/django-test-redirect-to-login-with-next-parameter
        login_url = reverse('login') + f"?next=/products/add/"
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'User redirected to "{login_url}"'
            ' when attempting to add a product'
            )
        self.assertRedirects(response, login_url) 

    def test_edit_product_superuser(self):
        """
        Test editing product by the superuser edits product in the DB, and redirects to
        the new products detail page.
        """
        self.client.login(username='test_admin', password='test_admin')
        product = Product.objects.get(id=1)
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Original product "{product.name}"'
            f' with description "{product.description}":\n'
            f' price - "{product.price}"\n'
            f' size -"{[product.size for product in product.sizes.all()]}"\n'
            f' colours - "{[product.colour for product in product.colours.all()]}"'
            )
        new_size = ProductSize.objects.create(name='Test Hat Size Edit', size=k.SIZES[3])
        first_colour = ProductColour.objects.create(name='Test Hat Colour', colour=k.COLOURS[2])
        second_colour = ProductColour.objects.create(name='Test Hat Colour', colour=k.COLOURS[1])
        response = self.client.post(reverse('edit_product', args=[1]), {
            'name': 'Edited Hat Test',
            'unique_product_identifier': self.uuid_for_test,
            'description': 'Changed description',
            'price': 21.99,
            'sizes': [new_size.id],
            'colours': [first_colour.id, second_colour.id]
        })
        print(
            f' \nEdited to "{product.name}"'
            f' with description "{product.description}":\n'
            f' price - "{product.price}"\n'
            f' size -"{[product.size for product in product.sizes.all()]}"\n'
            f' colours "{[product.colour for product in product.colours.all()]}"'
            )
        self.assertRedirects(response, reverse('product_detail', args=[1]))

    def test_edit_product_regular_user(self):
        """
        Test editing product by the regular user does not edit product in DB, and redirects to
        the home page whilst also instantiating a message to user.
        """
        self.client.login(username='test_regular', password='test_regular')
        original_product = Product.objects.get(id=1)
        product = Product.objects.get(id=1)
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Original product "{product.name}"'
            f' with description "{product.description}":\n'
            f' price - "{product.price}"\n'
            f' size -"{[product.size for product in product.sizes.all()]}"\n'
            f' colours - "{[product.colour for product in product.colours.all()]}"'
            )
        new_size = ProductSize.objects.create(name='Test Hat Size Edit', size=k.SIZES[3])
        first_colour = ProductColour.objects.create(name='Test Hat Colour', colour=k.COLOURS[2])
        second_colour = ProductColour.objects.create(name='Test Hat Colour', colour=k.COLOURS[1])
        response = self.client.post(reverse('edit_product', args=[1]), {
            'name': 'Edited Hat Test',
            'unique_product_identifier': self.uuid_for_test,
            'description': 'Changed description',
            'price': 21.99,
            'sizes': [new_size.id],
            'colours': [first_colour.id, second_colour.id]
        })
        print(
            f' \nProduct should remain unchanged as edit failed.\n'
            f' name {product.name}"'
            f' with description "{product.description}":\n'
            f' price - "{product.price}"\n'
            f' size -"{[product.size for product in product.sizes.all()]}"\n'
            f' colours "{[product.colour for product in product.colours.all()]}"\n'
            )
        # self.assertRedirects(response, reverse('product_detail', args=[1]))
        messages = list(get_messages(response.wsgi_request))
        message_string = str(messages[0])
        product_equal = product == original_product
        print(
            f' Attempting to edit product as regular user.\n'
            f' Check product has not changed returned: "{product_equal}"\n'
            f' Message returned to user: "{message_string}"\n'
            )
        self.assertEqual(len(messages), 1)
        self.assertEqual(
            message_string,
            'Sorry, only store owners can edit products.' 
            )
        self.assertRedirects(response, reverse('home')) 
        self.assertTrue(product_equal)

    def test_edit_product_no_user(self):
        """
        Test editing product by anonymous user does not edit product on DB, and redirects to
        the login page.
        """
        new_size = ProductSize.objects.create(name='Test Hat Size Edit', size=k.SIZES[3])
        first_colour = ProductColour.objects.create(name='Test Hat Colour', colour=k.COLOURS[2])
        second_colour = ProductColour.objects.create(name='Test Hat Colour', colour=k.COLOURS[1])
        response = self.client.post(reverse('edit_product', args=[1]), {
            'name': 'Edited Hat Test',
            'unique_product_identifier': self.uuid_for_test,
            'description': 'Changed description',
            'price': 21.99,
            'sizes': [new_size.id],
            'colours': [first_colour.id, second_colour.id]
        })
        # solution to redirect with next url parameter:
        # https://stackoverflow.com/questions/66449900/django-test-redirect-to-login-with-next-parameter
        login_url = reverse('login') + f"?next=/products/edit/1/"
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'User redirected to "{login_url}"'
            ' when attempting to add a product'
            )
        self.assertRedirects(response, login_url) 
        
    def test_delete_product_superuser(self):
        """
        Test deleting product by the superuser deletes the product from the DB, and redirects to
        the products page.
        """
        # use of exists to check product was deleted:
        # https://stackoverflow.com/questions/64883706/django-how-to-use-exists
        self.client.login(username='test_admin', password='test_admin')
        product = Product.objects.get(id=1)
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Product "{product.name}" exists prior to deletion'
            f' returning {Product.objects.filter(id=1).exists()}.'
            )
        response = self.client.get(reverse('delete_product', args=[1]))
        self.assertRedirects(response, reverse('products'))
        print(
            f' After deletion returning {Product.objects.filter(id=1).exists()}'
            )
        self.assertFalse(Product.objects.filter(id=1).exists())
        self.assertRedirects(response, reverse('products'))


    def test_delete_product_regular_user(self):
        """
        Test deleting product by the regular user does not delete product from DB, and redirects to
        the home page whilst also instantiating a message to user.
        """
        self.client.login(username='test_regular', password='test_regular')
        product = Product.objects.get(id=1)
        response = self.client.get(reverse('delete_product', args=[1]))
        messages = list(get_messages(response.wsgi_request))
        message_string = str(messages[0])
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Product "{product.name}" still exists after attempting deletion'
            f' returning {Product.objects.filter(id=1).exists()}.\n'
            f' Message returned to user: "{message_string}"\n'
            )
        self.assertEqual(len(messages), 1)
        self.assertEqual(
            message_string,
            'Sorry, only store owners can delete products.' 
            )
        self.assertRedirects(response, reverse('home')) 
        self.assertTrue(Product.objects.filter(id=1).exists())

    def test_delete_product_no_user(self):
        """
        Test deleting product by anonymous user does not delete the product from DB, and redirects to
        the login page.
        """
        # use of exists to check product was deleted:
        # https://stackoverflow.com/questions/64883706/django-how-to-use-exists
        product = Product.objects.get(id=1)
        response = self.client.get(reverse('delete_product', args=[1]))
        login_url = reverse('login') + f"?next=/products/delete/1/"
        print(
            '\n****** ', self._testMethodName.upper(), ' ******\n',
            f'Product "{product.name}" still exists after attempting deletion'
            f' returning {Product.objects.filter(id=1).exists()}.'
            )
        self.assertTrue(Product.objects.filter(id=1).exists())
        self.assertRedirects(response, login_url) 
