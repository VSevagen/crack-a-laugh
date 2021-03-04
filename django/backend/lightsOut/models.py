from django.db import models

# Create your models here.

# I want the model to have 3 fields:
#      - Name
#      - Wins
#      - Loses

class Person(models.Model):
    name = models.CharField(max_length = 100)
    wins = models.IntegerField()
    loses = models.IntegerField()
