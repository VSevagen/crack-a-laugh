from django.db import models

# Create your models here.

# I want the model to have 3 fields:
#      - Name
#      - Wins
#      - Loses


class UserModel(models.Model):
    name=models.CharField(max_length=1000)
    wins=models.IntegerField()
    loses=models.IntegerField()
