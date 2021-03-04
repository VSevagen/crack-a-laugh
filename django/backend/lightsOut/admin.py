from django.contrib import admin
from .models import Leaderboard

# Register your models here.

# Imma help you guys a bit here
#list_display = ('name', 'wins', 'loses')

admin.site.register(Leaderboard)
