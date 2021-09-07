# Generated by Django 3.0.5 on 2021-09-06 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rota_app', '0092_auto_20210904_1637'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeclock',
            name='stage',
            field=models.CharField(choices=[('DEFAULT', 'DEFAULT'), ('CLOCKED_IN', 'CLOCKED_IN'), ('CLOCKED_OUT', 'CLOCKED_OUT')], default='DEFAULT', max_length=11),
        ),
    ]
