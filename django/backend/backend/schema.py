import graphene

from graphene_django.types import DjangoObjectType, ObjectType
from lightsOut.models import Score

# Make your schema here, both for mutations and queries
# Very important part to get your graphql api working. 
# Very important part to get your graphql api working.


class ScoreType(DjangoObjectType):
    class Meta:
        model = Score

class Query(ObjectType):
    scores = graphene.List(ScoreType)

    def resolve_scores(self, info, **kwargs):
        return Score.objects.all()

schema = graphene.Schema(query=Query) 