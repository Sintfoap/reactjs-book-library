# Generated by Django 3.1.6 on 2021-04-19 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booklibrary', '0004_auto_20210410_1116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='number_in_series',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
