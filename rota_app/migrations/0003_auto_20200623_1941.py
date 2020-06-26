# Generated by Django 3.0.5 on 2020-06-23 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0002_position_department'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='position',
        ),
        migrations.AddField(
            model_name='employee',
            name='position',
            field=models.ManyToManyField(blank=True, null=True, related_name='position', to='rota_app.Position'),
        ),
    ]
