from django.contrib import admin
from .models import Users

# Register your models here.
admin.site.register(Users)

# Imma help you guys a bit here
#  list_display = ('name', 'wins', 'loses')