import graphene
from graphene_django.types import DjangoObjectType, ObjectType

from lightsOut.models import Leaderboard

class LeaderboardType(DjangoObjectType):
    class Meta:
        model = Leaderboard
        
# Create a Query type
class Query(ObjectType):
    allNames = graphene.List(LeaderboardType)

    def resolve_allNames(self, info, **kwargs):
        return Leaderboard.objects.all()
