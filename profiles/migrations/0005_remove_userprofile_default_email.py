# Generated by Django 3.2.23 on 2024-03-14 20:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_auto_20240314_2009'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='default_email',
        ),
    ]