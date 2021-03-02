from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
    # you can import the graphql path here as i want you
    # guys to be able to access http://localhost:8000/graphql/
    # to test your queries
    path('graphql',GraphQLView.as_view(graphiql=True)) 
    # Also you might run into some issues if you try to
    # add any other path than admin, 
    # so keep an eye on that :)
]
