# Generated by Django 3.0.5 on 2021-01-21 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0038_auto_20210120_2222'),
    ]

    operations = [
        migrations.AddField(
            model_name='shift',
            name='positions',
            field=models.ManyToManyField(blank=True, null=True, related_name='shift_positions', to='rota_app.Position'),
        ),
    ]