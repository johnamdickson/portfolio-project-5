from django.shortcuts import render, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import UserProfile
from .forms import UserProfileForm

from checkout.models import Order


def profile_details(request):
    
    if request.user.is_authenticated:
        """ Display the user's profile. """
        profile = get_object_or_404(UserProfile, user=request.user)
        form_regular = UserProfileForm(instance=profile, prefix='offcanvas_form_regular')
        form_small = UserProfileForm(instance=profile, prefix='offcanvas_form_small')
        orders = profile.orders.all().order_by('-date')
        context = {
            'form_small': form_small,
            'form_regular': form_regular,
            'orders': orders,
            'on_profile_page': True
        }

        return context

    else:
        context = {}
        return context