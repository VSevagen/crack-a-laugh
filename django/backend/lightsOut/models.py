from django.db import models

# Create your models here.

class Score(models.Model):
     name = models.CharField(max_length=20)
     wins = models.IntegerField()
     loses = models.IntegerField()

     def __str__(self):
         return self.name

# I want the model to have 3 fields:
#      - Name
#      - Wins
#      - Loses