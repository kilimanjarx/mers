# Generated by Django 3.1.7 on 2021-02-27 01:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='address',
            field=models.TextField(blank=True),
        ),
    ]