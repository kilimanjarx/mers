# Generated by Django 3.1.7 on 2021-02-28 06:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0003_logs'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Logs',
            new_name='Log',
        ),
    ]