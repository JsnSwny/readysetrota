# Generated by Django 3.0.5 on 2021-06-06 15:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0076_auto_20210605_2319'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeclock',
            name='break_length',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='timeclock',
            name='shift',
            field=models.OneToOneField(default='', on_delete=django.db.models.deletion.CASCADE, to='rota_app.Shift'),
            preserve_default=False,
        ),
    ]