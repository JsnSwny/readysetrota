# Generated by Django 3.0.5 on 2021-03-08 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0059_auto_20210307_2024'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitesettings',
            name='shift_approval',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='Settings',
        ),
    ]
