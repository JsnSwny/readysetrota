# Generated by Django 3.0.5 on 2021-08-02 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0080_leave'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leave',
            name='reason',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
