# Generated by Django 3.0.5 on 2021-03-14 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0064_sitesettings_forecasting'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='site',
            options={'permissions': [('manage_departments', 'Manage Departments'), ('manage_positions', 'Manage Positions'), ('manage_employees', 'Manage Employees'), ('manage_shifts', 'Manage Shifts')]},
        ),
        migrations.AlterField(
            model_name='sitesettings',
            name='forecasting',
            field=models.BooleanField(default=True),
        ),
    ]
