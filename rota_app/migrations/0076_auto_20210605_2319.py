# Generated by Django 3.0.5 on 2021-06-05 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0075_auto_20210603_1646'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='start_date',
        ),
        migrations.RemoveField(
            model_name='historicalemployee',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='historicalemployee',
            name='start_date',
        ),
        migrations.AddField(
            model_name='employee',
            name='archived',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='historicalemployee',
            name='archived',
            field=models.BooleanField(default=False),
        ),
    ]