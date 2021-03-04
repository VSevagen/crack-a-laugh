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
    
    
class Mut(graphene.Mutation):
    Name = graphene.String()
    Wins = graphene.Int()
    Loses = graphene.Int()

    class Arguments:
        name = graphene.String()
        win = graphene.Int()
        lose = graphene.Int()

    def mutate(self, info, name, win, lose):
        entry,created = UserData.objects.get_or_create(
            Name=name,
            defaults={
                'Wins': 0, 'Loses': 0
            }
        )
        entry.Wins +=1 if win else 0
        entry.Loses += 1 if lose else 0
        entry.save()

        return Mut(
            name=entry.Name,
            wins=entry.Wins,
            loses=entry.Loses,
        )