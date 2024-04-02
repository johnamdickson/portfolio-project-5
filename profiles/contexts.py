from django.shortcuts import render, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import UserProfile
from .forms import UserProfileForm

from checkout.models import Order


def profile_details(request):
    """
    Method to make profile data available across the whole site
    specifically for offcanvases. Two forms created to ensure system
    assigned IDs are unique.
    """
    if request.user.is_authenticated:
        """ Display the user's profile. """
        profile = get_object_or_404(UserProfile, user=request.user)
        form_regular = UserProfileForm(
            instance=profile,
            prefix='profile_offcanvas_form_regular'
        )
        form_small = UserProfileForm(
            instance=profile,
            prefix='profile_offcanvas_form_small'
        )
        orders = profile.orders.all().order_by('-date')
        context = {
            'profile_form_small': form_small,
            'profile_form_regular': form_regular,
            'orders': orders,
        }

        return context

    else:
        context = {}
        return context
