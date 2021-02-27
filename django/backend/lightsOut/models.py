from django.db import models

# Create your models here.

# I want the model to have 3 fields:
#      - Name
#      - Wins
#      - Loses
class Score(models.Model):
    name = models.CharField(max_length=20)
    wins = models.PositiveIntegerField()
    loses = models.PositiveIntegerField()

    def __str__(self):
        return self.name

    