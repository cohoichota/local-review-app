# Generated by Django 4.0.3 on 2022-03-19 02:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0003_rename_url_business_website'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='stars',
            field=models.DecimalField(decimal_places=1, max_digits=2),
        ),
    ]