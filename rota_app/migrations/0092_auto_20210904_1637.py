# Generated by Django 3.0.5 on 2021-09-04 15:37

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0091_auto_20210903_1702'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='pin',
            field=models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(1000), django.core.validators.MaxValueValidator(9999)]),
        ),
        migrations.AddField(
            model_name='historicalemployee',
            name='pin',
            field=models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(1000), django.core.validators.MaxValueValidator(9999)]),
        ),
    ]