# Generated by Django 3.0.5 on 2021-01-13 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0036_position_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='wage',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=6),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employee',
            name='wage_type',
            field=models.CharField(choices=[('H', 'Hourly'), ('S', 'Salary')], default='H', max_length=1),
        ),
    ]