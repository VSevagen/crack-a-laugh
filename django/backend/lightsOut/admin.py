from django.contrib import admin
from lightsOut.models import Leaderboard

admin.site.register(Leaderboard)
# Register your models here.

# Imma help you guys a bit here
#  list_display = ('name', 'wins', 'loses')