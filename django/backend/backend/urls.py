from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    # you can import the graphql path here as i want you
    # guys to be able to access http://localhost:8000/graphql/
    # to test your queries
    # Also you might run into some issues if you try to
    # add any other path than admin, 
    # so keep an eye on that :)
    path('graphql/',csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('admin/', admin.site.urls)
]
