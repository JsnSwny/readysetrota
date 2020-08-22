# Generated by Django 3.0.5 on 2020-08-21 17:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0017_position_business'),
    ]

    operations = [
        migrations.AddField(
            model_name='department',
            name='business',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='department_business', to='rota_app.Business'),
        ),
    ]
