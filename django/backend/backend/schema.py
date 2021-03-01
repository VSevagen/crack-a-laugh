import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from lightsOut.models import Score
# Make your schema here, both for mutations and queries
# Very important part to get your graphql api working.


class ScoreType(DjangoObjectType):
    class Meta:
        model = Score

class ScoreInput(graphene.InputObjectType):
    name = graphene.String()
    wins = graphene.Int()
    loses = graphene.Int()

class ScoreUpdateInput(graphene.InputObjectType):
    name = graphene.String()
    score = graphene.Int()

class CreateScore(graphene.Mutation):
    class Arguments:
        input = ScoreInput(required=True)
    
    ok = graphene.Boolean()
    score = graphene.Field(ScoreType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        score_instance = Score(name=input.name, wins=input.wins, loses=input.loses)
        score_instance.save()
        return CreateScore(ok=ok, score=score_instance)

class UpdateScore(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        input = graphene.Int(required=True) # If score is +ve 1 then increament wins, if it is -ve 1 then increament loses.

    ok = graphene.Boolean()
    score = graphene.Field(ScoreType)

    @staticmethod
    def mutate(root, info, name, input=None):
        score_instance = Score.objects.get(pk=name)
        ok = False
        if score_instance:
            ok = True
            if input == 1:
                current_wins = score_instance.wins
                score_instance.wins = current_wins + 1
                score_instance.save()
            elif input == -1:
                current_loses = score_instance.loses
                score_instance.loses = current_loses + 1
                score_instance.save()
            return UpdateScore(ok=ok, score=score_instance)
        return UpdateScore(ok=ok, score=None)

class Mutation(graphene.ObjectType):
    create_score = CreateScore.Field()
    update_score = UpdateScore.Field()

class Query(ObjectType):
    score = graphene.Field(ScoreType, id=graphene.Int())
    scores = graphene.List(ScoreType)

    def resolve_score(self, info, **kwargs):
        name = kwargs.get('name')

        if name is not None:
            return Score.objects.get(pk=name)

        return None

    def resolve_scores(self, info, **kwargs):
        return Score.objects.all()

schema = graphene.Schema(query=Query, mutation=Mutation)