# Generated by Django 3.0.5 on 2021-01-03 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0035_auto_20210102_1308'),
    ]

    operations = [
        migrations.AddField(
            model_name='position',
            name='order',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
