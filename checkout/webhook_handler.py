from django.shortcuts import render, redirect, reverse, get_object_or_404, HttpResponse
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
import mailtrap as mt
import os
import base64
from pathlib import Path

from .models import Order, OrderLineItem, UserProfile
from products.models import Product

import json
import time
import stripe


class StripeWH_Handler:
    """Handle Stripe webhooks"""

    def __init__(self, request):
        self.request = request

    def _send_learn_pdf_email(self, product, order):
        """
        A function which takes in any product that is a learn_product and along with the customer
        email from the passed in order, the product learn_product_pdf is sent to the customer as 
        an email attachment.
        """
        print('function called')
        cust_email = order.email
        pdf_attachment = Path(product.learn_product_pdf.path).read_bytes()
        filename = product.filename()
        print('got filename', filename)
        text = render_to_string(
            'checkout/confirmation_emails/learn_product_email_text.txt',
            {
                'order': order,
                'product': product
                }
             )
        mail = mt.Mail(
            sender=mt.Address(email="mailtrap@littlewoollysnuggles.com", name="Little Woolly Snuggles"),
            to=[mt.Address(email=cust_email)],
            subject="Here is your Tutorial!",
            text=text,
            attachments=[
                mt.Attachment(
                                content=base64.b64encode(pdf_attachment),
                                filename=filename,
                                disposition=mt.Disposition.ATTACHMENT,
                                mimetype="application/pdf",
                            )
                        ],
            headers={"X-MT-Header": "Custom header"},
            custom_variables={"year": 2024},
                    )
        print('here is info on the mail', mail)
        client = mt.MailtrapClient(token=os.environ.get('MAILTRAP_TOKEN'))
        client.send(mail)

    def _send_confirmation_email(self, order):
        """Send the user a confirmation email"""
        cust_email = order.email
        subject = render_to_string(
            'checkout/confirmation_emails/confirmation_email_subject.txt',
            {'order': order})
        body = render_to_string(
            'checkout/confirmation_emails/confirmation_email_body.txt',
            {'order': order, 'contact_email': settings.DEFAULT_FROM_EMAIL})

        mail = mt.Mail(
            sender=mt.Address(email="mailtrap@littlewoollysnuggles.com", name="Little Woolly Snuggles"),
            to=[mt.Address(email=cust_email)],
            subject=subject,
            text=body,
            )

        client = mt.MailtrapClient(token=os.environ.get('MAILTRAP_TOKEN'))
        client.send(mail)

    def handle_event(self, event):
        """
        Handle a generic/unknown/unexpected webhook event
        """
        return HttpResponse(
            content=f'Unhandled webhook received: {event["type"]}',
            status=200)

    def handle_payment_intent_succeeded(self, event):
        """
        Handle the payment_intent.succeeded webhook from Stripe
        """
        intent = event.data.object
        pid = intent.id
        cart = intent.metadata.cart
        order_number = intent.metadata.order_number

        # Get the Charge object
        stripe_charge = stripe.Charge.retrieve(
            intent.latest_charge
        )

        billing_details = stripe_charge.billing_details # updated
        shipping_details = intent.shipping
        grand_total = round(stripe_charge.amount / 100, 2) # updated
        # Clean data in the shipping details
        for field, value in shipping_details.address.items():
            if value == "":
                shipping_details.address[field] = None

        # Update order data with profile information.
        profile = None
        username = intent.metadata.username
        if username != 'AnonymousUser':
            profile = UserProfile.objects.get(user__username=username)

        order_exists = False
        attempt = 1
        while attempt <= 5:
            try:
                order = Order.objects.get(order_number=order_number)
                order_exists = True
                break
            except Order.DoesNotExist:
                attempt += 1
                time.sleep(1)
        if order_exists:
            self._send_confirmation_email(order)
            for item in order.lineitems.all():
                if item.product.learn_product:
                    self._send_learn_pdf_email(item.product, order)
            return HttpResponse(
                content=(f'Webhook received: {event["type"]} | SUCCESS: '
                         'Verified order already in database'),
                status=200)
        else:
            order = None
            try:
                order = Order.objects.create(
                    order_number=order_number,
                    full_name=shipping_details.name,
                    user_profile=profile,
                    email=billing_details.email,
                    phone_number=shipping_details.phone,
                    country=shipping_details.address.country,
                    postcode=shipping_details.address.postal_code,
                    town_or_city=shipping_details.address.city,
                    street_address1=shipping_details.address.line1,
                    street_address2=shipping_details.address.line2,
                    county=shipping_details.address.state,
                )
                for item_id, item_data in json.loads(cart).items():
                    product = Product.objects.get(id=item_id)
                    if isinstance(item_data, int):
                        order_line_item = OrderLineItem(
                            order=order,
                            product=product,
                            quantity=item_data,
                        )
                        order_line_item.save()
                    else:
                        for properties, quantity in item_data['items_size_and_or_colour'].items():
                            property_list = properties.split(',')
                            size = property_list[0]
                            size = None if size == 'None' else size
                            colour = property_list[1]
                            colour = None if colour == 'None' else colour
                            secondary_colour = property_list[2]
                            secondary_colour = None if secondary_colour == 'None' else secondary_colour  
                            order_line_item = OrderLineItem(
                                order=order,
                                product=product,
                                quantity=quantity,
                                product_size=size,
                                product_primary_colour = colour,
                                product_secondary_colour = secondary_colour,
                            )
                        order_line_item.save()
            except Exception as e:
                if order:
                    order.delete()
                return HttpResponse(
                    content=f'Webhook received: {event["type"]} | ERROR: {e}',
                    status=500)
        self._send_confirmation_email(order)
        for item in order.lineitems.all():
            if item.product.learn_product:
                self._send_learn_pdf_email(item.product, order)
        return HttpResponse(
            content=(f'Webhook received: {event["type"]} | SUCCESS: '
                     'Created order in webhook'),
            status=200)
            

    def handle_payment_intent_payment_failed(self, event):
        """
        Handle the payment_intent.payment_failed webhook from Stripe
        """
        return HttpResponse(
            content=f'Webhook received: {event["type"]}',
            status=200)