# Generated by Django 3.2 on 2022-05-20 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0105_auto_20220513_2108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='business',
            name='subscription_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]