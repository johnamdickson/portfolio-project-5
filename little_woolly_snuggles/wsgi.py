"""
WSGI config for little_woolly_snuggles project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'little_woolly_snuggles.settings')

django_app = get_wsgi_application()



def https_app(environ, start_response):
    environ["wsgi.url_scheme"] = "https"
    return django_app(environ, start_response)


application = https_app