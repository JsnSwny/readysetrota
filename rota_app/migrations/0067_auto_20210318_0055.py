# Generated by Django 3.0.5 on 2021-03-18 00:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0066_auto_20210316_2145'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='site',
            options={'permissions': [('manage_departments', 'Manage Departments'), ('manage_positions', 'Manage Positions'), ('manage_employees', 'Manage Employees'), ('manage_shifts', 'Manage Shifts'), ('manage_wages', 'Manage Employee Wages'), ('create_forecasts', 'Create Forecasts'), ('view_forecasts', 'View Forecasts'), ('manage_availabilities', 'Manage Availabilities'), ('view_stats', 'View Stats')]},
        ),
    ]