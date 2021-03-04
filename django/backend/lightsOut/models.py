from django.db import models

class Leaderboard(models.Model):
    name = models.CharField(max_length = 30)
    wins = models.IntegerField()
    loses = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name' ,)

# Create your models here.

# I want the model to have 3 fields:
#      - Name
#      - Wins
#      - Loses
