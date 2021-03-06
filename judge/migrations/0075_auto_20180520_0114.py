# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-05-19 16:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('judge', '0074_contest_use_balloons'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contest',
            name='use_balloons',
            field=models.BooleanField(default=False, help_text='If enabled, use ranking table with balloons', verbose_name='use balloons'),
        ),
    ]
