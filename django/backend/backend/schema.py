import graphene
from graphene_django import DjangoObjectType
from lightsOut.models import UserModel
# Make your schema here, both for mutations and queries
# Very important part to get your graphql api working.
class UserType(DjangoObjectType):
    class Meta:
        model = UserModel
class Query(graphene.ObjectType):
    all_entries = graphene.List(UserType)
    def resolve_all_entries(self, info):
        # We can easily optimize query count in the resolve method
        return UserModel.objects.all()
class CreateUser(graphene.Mutation):
    name = graphene.String()
    loses = graphene.Int()
    wins = graphene.Int()
    class Arguments:
        name = graphene.String()
        wins = graphene.Int()
        loses = graphene.Int()
    def mutate(self, info, name, wins, loses):
        user, created = UserModel.objects.get_or_create(
            name=name,
            defaults={
                'wins': 0, 'loses': 0
            }
        )
        user.wins += wins
        user.loses += loses
        user.save()
        return CreateUser(
            name=user.name,
            wins=user.wins,
            loses=user.loses,
        )
class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
schema = graphene.Schema(query=Query, mutation=Mutation)
