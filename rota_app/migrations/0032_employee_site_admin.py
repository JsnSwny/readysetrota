# Generated by Django 3.0.5 on 2020-12-29 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0031_department_site'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='site_admin',
            field=models.BooleanField(default=False),
        ),
    ]
