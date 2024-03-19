from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from django_countries.fields import CountryField


class UserProfile(models.Model):
    """
    A user profile model for maintaining default
    delivery information and order history
    """
    class Meta:
        verbose_name_plural = 'User Profiles'

    user = models.OneToOneField(
        User, on_delete=models.CASCADE,
        verbose_name='User')
    default_full_name = models.CharField(max_length=30,
                                            null=True, blank=True,
                                            verbose_name='Full Name')                      
    default_phone_number = models.CharField(max_length=20,
                                            null=True, blank=True,
                                            verbose_name='Phone Number')
    default_street_address1 = models.CharField(max_length=80,
                                               null=True, blank=True,
                                               verbose_name='Address 1')
    default_street_address2 = models.CharField(max_length=80,
                                               null=True, blank=True,
                                               verbose_name='Address 2')
    default_town_or_city = models.CharField(max_length=40,
                                            null=True, blank=True,
                                               verbose_name='Town/City')
    default_county = models.CharField(max_length=80,
                                      null=True, blank=True,
                                      verbose_name='County')
    default_postcode = models.CharField(max_length=20,
                                        null=True, blank=True,
                                        verbose_name='Postcode')
    default_country = CountryField(blank_label='Country',
                                   null=True, blank=True,
                                   verbose_name='Country')

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User, weak=False)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    """
    Create or update the user profile
    """
    if created:
        UserProfile.objects.create(user=instance)
    # Existing users: just save the profile
    instance.userprofile.save()