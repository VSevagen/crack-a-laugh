import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from .models import Users

class UsersType(DjangoObjectType):
    class Meta:
        model = Users

class Query(ObjectType):
    users = graphene.Field(UsersType, id=graphene.Int())
    users = graphene.List(UsersType)

    def resolve_user(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Users.objects.get(pk=id)

    def resolve_users(self, info, **kwargs):
        return Users.objects.all()
    
class CreateUsers(graphene.Mutation):
    class Arguments:
        Username = graphene.String(required=True)
        Userwons = graphene.Int()
        Userloses = graphene.Int()
    
    users = graphene.Field(UsersType)

    @classmethod
    def mutate(cls, root, info, Username, Userwons, Userloses):
        users = Users(name=Username, wins=Userwons, loses=Userloses)
        users.save()
        return CreateUsers(users=users)

class UpdateUsers(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        Username = graphene.String(required=True)
        Userwons = graphene.Int()
        Userloses = graphene.Int()
    
    users = graphene.Field(UsersType)

    @classmethod
    def mutate(cls, root, info, id, Username, Userwons, Userloses):
        users = Users.objects.get(pk=id)
        users.name = Username
        users.wins = Userwons
        users.loses = Userloses
        users.save()
        return UpdateUsers(users=users)

class Mutation(graphene.ObjectType):
    update_users = UpdateUsers.Field()
    create_users = CreateUsers.Field()


schema = graphene.Schema(query=Query)