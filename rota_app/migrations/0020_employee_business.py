# Generated by Django 3.0.5 on 2020-08-24 16:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0019_availability_approved'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='business',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='employee_business', to='rota_app.Business'),
        ),
    ]
