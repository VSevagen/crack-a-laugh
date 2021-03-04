from django.db import models

# Create your models here.

# I want the model to have 3 fields:
#      - Name
#      - Wins
#      - Loses
class Users(models.Model):
    name = models.CharField(max_length=20)
    wins = models.IntegerField(default=0)
    loses = models.IntegerField(default=0)

    def __str__(self):
        return self.name