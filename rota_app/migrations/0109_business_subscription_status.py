# Generated by Django 3.2 on 2022-05-27 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0108_alter_business_total_employees'),
    ]

    operations = [
        migrations.AddField(
            model_name='business',
            name='subscription_status',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
