from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import UserProfile
from .forms import UserProfileForm

from checkout.models import Order


@login_required
def profile(request):
    """ Display the user's profile. """
    profile = get_object_or_404(UserProfile, user=request.user)

    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully')
        else:
            messages.error(request,
                           ('Update failed. Please ensure '
                            'the form is valid.'))
        # Solution to redirecting to same page after POST from SO:
        # https://stackoverflow.com/questions/70200186/how-to-realise-redirect-to-same-page-in-django-views 
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
    else:
        form = UserProfileForm(instance=profile, prefix="view_form")
    
    orders = profile.orders.all().order_by('-date')
    template = 'profiles/profile.html'
    context = {
        'form': form,
        'orders': orders,
        'on_profile_page': True
    }

    return render(request, template, context)
