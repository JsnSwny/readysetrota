# Generated by Django 3.0.5 on 2020-07-24 15:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rota_app', '0009_remove_employee_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShiftSwap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee_approved', models.BooleanField()),
                ('admin_approved', models.BooleanField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('shift_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shift_from', to='rota_app.Shift')),
                ('shift_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shift_to', to='rota_app.Shift')),
                ('swap_from', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='swap_from', to=settings.AUTH_USER_MODEL)),
                ('swap_to', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='swap_to', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
