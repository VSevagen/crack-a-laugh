# Generated by Django 2.2.17 on 2021-02-28 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('Wins', models.IntegerField()),
                ('Loses', models.IntegerField()),
            ],
        ),
    ]
