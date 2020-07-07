# Generated by Django 3.0.5 on 2020-07-07 11:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0006_shift_published'),
    ]

    operations = [
        migrations.AddField(
            model_name='shift',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='shift',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='employee',
            name='position',
            field=models.ManyToManyField(blank=True, related_name='position', to='rota_app.Position'),
        ),
    ]
