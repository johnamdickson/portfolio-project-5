from django.test import TestCase, Client
from django.urls import reverse
from products.models import Product
import constants as k
from django.contrib.messages import get_messages
from decimal import Decimal
from django.conf import settings
from django.urls import resolve


# Testing follows guidance in these tutorials:
# https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Testing
# https://realpython.com/testing-in-django-part-1-best-practices-and-examples/
# I also referenced testing from my PP4:
# https://github.com/johnamdickson/portfolio-project-4/blob/main/monitoring_tool/tests.py

class CartTests(TestCase):
    def setUp(self):
        client = Client()

    def test_view_cart(self):
        """
        Test to confirm correct status code when view_cart url is accessed.
        """
        response = self.client.get(reverse('view_cart'))
        self.assertEqual(response.status_code, 200)

    def test_add_to_cart(self):
        """
        Add product to cart and test correct item added with appropriate
        redirection using passed in url and instantiated message.
        """
        # create a product, in this case a hat with a price of 30.99
        # and assign id to item_id variable
        product = Product.objects.create(name='Hat', price=30.99)
        item_id = product.id
        # post 2 products to cart using add_to_cart url
        response = self.client.post(
            reverse(
                'add_to_cart',
                args=[item_id]
                ), {
                    'quantity': 2,
                    'redirect_url': reverse('view_cart')
                    }
            )
        # assign request object to variable to access messages and
        # path info.
        request = response.wsgi_request
        # add messages to response. Solution from here:
        # https://stackoverflow.com/questions/2897609/how-can-i-unit-test-django-messages
        messages = list(get_messages(request))
        # retrieve session data to establish that cart is contained in it
        session_data = self.client.session
        self.assertIn('cart', session_data)
        self.assertIn(str(item_id), session_data['cart'])
        self.assertEqual(session_data['cart'][str(item_id)], 2)
        self.assertRedirects(response, '/cart/')
        print(
             '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'Successfully redirected from '
             f'"{resolve(request.path_info).url_name}" '
             'and the following message generated: \n'
             f' {str(messages[0])}')
        self.assertEqual(len(messages), 1)
        self.assertEqual(
            str(messages[0]),
            '<p class="mb-2"><strong>Two</strong> of '
            '<strong>Hat</strong> added to cart</p>'
            )

    def test_adjust_cart(self):
        """
        Adjust cart by mutating quantity and test correct item quantity
        with appropriate redirection using passed in url and
        instantiated message.
        """
        product = Product.objects.create(name='Blanket', price=49.99)
        item_id = product.id
        # capture original quantity for comparison purposes later
        original_quantity = 1
        self.client.post(
            reverse(
                'add_to_cart',
                args=[item_id]
                ), {
                    'quantity': original_quantity,
                    'redirect_url': reverse('view_cart')
                    }
            )
        # adjust quantity of item by posting to adjust cart url
        response = self.client.post(
            reverse(
                'adjust_cart',
                args=[item_id]
                ),
            {'quantity': 3}
            )
        request = response.wsgi_request
        messages = list(get_messages(request))
        session_data = self.client.session
        self.assertIn('cart', session_data)
        self.assertIn(str(item_id), session_data['cart'])
        self.assertNotEqual(
            session_data['cart'][str(item_id)],
            original_quantity
            )
        # check that item quantity has been adjusted to 3.
        self.assertEqual(session_data['cart'][str(item_id)], 3)
        self.assertRedirects(response, '/cart/')
        print(
             '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'Successfully redirected from '
             f'"{resolve(request.path_info).url_name}" '
             'and the following message generated: \n'
             f' {str(messages[1])}')
        # there are two messages in this instance due to adding and
        # updating the product. For this test, only second instance
        # is required as adding message addressed in earlier test.
        # Note same applies to remove from cart messages
        print(messages[0], messages[1])
        self.assertEqual(len(messages), 2)
        self.assertEqual(
            str(messages[1]),
            'Updated Blanket quantity to 3'
            )

    def test_remove_from_cart(self):
        """
        Remove item from cart by calling remove_from_cart and test item
        removed with appropriate redirection using passed in url and
        instantiated message.
        """
        product = Product.objects.create(name='Gift Set', price=10)
        item_id = product.id
        self.client.post(
            reverse(
                'add_to_cart',
                args=[item_id]
                ),
            {'quantity': 1, 'redirect_url': reverse('view_cart')}
            )
        # remove item by posting to remove_from_cart url
        response = self.client.post(
            reverse(
                'remove_from_cart',
                args=[item_id]
                )
            )
        request = response.wsgi_request
        messages = list(get_messages(request))
        session_data = self.client.session
        print(
             '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'Successfully redirected from '
             f'"{resolve(request.path_info).url_name}" '
             'and the following message generated: \n'
             f' {str(messages[1])}')
        self.assertIn('cart', session_data)
        self.assertNotIn(str(item_id), session_data['cart'])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(messages), 2)
        self.assertEqual(
            str(messages[1]),
            'GIFT SET removed from your cart'
            )


class CartContentsTest(TestCase):

    def setUp(self):
        self.client = Client()
        self.product_hat = Product.objects.create(name='Hat', price=10.41)
        self.product_blanket = Product.objects.create(
                                                    name='Blanket',
                                                    price=20.22)

    def test_empty_cart_contents(self):
        """
        Test that initial cart session is empty.
        """
        # Instantiate session and save without adding cart.
        session = self.client.session
        session.save()
        response = self.client.get('/')
        # create context var to enable access of cart.
        context = response.context
        request = response.wsgi_request
        print(
             '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'There are {len(context["cart_items"])}'
             ' items in the cart.'
             )
        self.assertTrue(len(context['cart_items']) == 0)
        self.assertEqual(context['total'], 0)
        self.assertEqual(context['product_count'], 0)
        self.assertEqual(context['delivery'], 0)
        self.assertEqual(
            context['free_delivery_delta'],
            Decimal(settings.FREE_DELIVERY_THRESHOLD)
            )
        self.assertEqual(context['grand_total'], 0)

    def test_cart_contents(self):
        """
        Test cart session contains items when they are added to cart.
        """
        # Instantiate session and add cart with products from setup.
        session = self.client.session
        session['cart'] = {
            str(self.product_hat.id): 2,
            str(self.product_blanket.id): 3,
        }
        session.save()
        response = self.client.get('/')
        context = response.context
        print(
             '\n****** ', self._testMethodName.upper(), ' ******\n',
             f'There are {len(context["cart_items"])}'
             ' items in the cart.'
             )
        self.assertTrue(len(context['cart_items']) == 2)
        self.assertEqual(
            context['total'],
            (round(
                Decimal(
                    2 * self.product_hat.price +
                    3 * self.product_blanket.price
                    ),
             2)
             )
            )
        self.assertEqual(context['product_count'], 5)
