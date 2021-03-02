import graphene
from graphene_django import DjangoObjectType

# Make your schema here, both for mutations and queries
# Very important part to get your graphql api working.
from lightsOut.models import UserData

class UserdataType(DjangoObjectType):
    class Meta:
        model = UserData
        
class Query(graphene.ObjectType):
    data = graphene.List(UserdataType)
    def resolve_data(self, info, **kwargs):
        return UserData.objects.all()

