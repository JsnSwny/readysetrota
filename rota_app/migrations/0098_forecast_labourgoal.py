# Generated by Django 3.0.5 on 2022-01-17 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0097_timeclock_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='forecast',
            name='labourGoal',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
    ]
