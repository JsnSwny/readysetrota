# Generated by Django 3.0.5 on 2020-08-10 19:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rota_app', '0013_business'),
    ]

    operations = [
        migrations.AlterField(
            model_name='business',
            name='owner',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='business', to=settings.AUTH_USER_MODEL),
        ),
    ]
