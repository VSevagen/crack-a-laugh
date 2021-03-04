from django.db import models

# Create your models here.

# I want the model to have 3 fields:
#      - Name
#      - Wins
#      - Loses

class Leaderboard(models.Model):
    Name=models.CharField(max_length=100)
    Wins=models.IntegerField()
    Loses=models.IntegerField()
