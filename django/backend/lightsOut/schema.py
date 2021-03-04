import graphene
from graphene_django import DjangoObjectType

# Make your schema here, both for mutations and queries
# Very important part to get your graphql api working.
from lightsOut.models import Leaderboard

class LeaderboardType(DjangoObjectType):
    class Meta:
        model = Leaderboard
        

class Query(graphene.ObjectType):
    scores = graphene.List(LeaderboardType)

    def resolve_scores(self, info, **kwargs):
            return Leaderboard.objects.all()

        