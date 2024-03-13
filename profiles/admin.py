from django.contrib import admin
from .models import UserProfile


class ProfileAdmin(admin.ModelAdmin):

    fields = ('user', 
            'default_phone_number',
            'default_postcode',
            'default_town_or_city',
            'default_street_address1',
            'default_street_address2',
            'default_county',
            'default_country',
        )

    list_display = ('user',)


admin.site.register(UserProfile, ProfileAdmin)