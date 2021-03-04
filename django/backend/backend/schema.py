import graphene
from graphene_django import DjangoObjectType
from lightsOut.models import Person
# Make your schema here, both for mutations and queries
# Very important part to get your graphql api working.

class PersonType(DjangoObjectType):
    class Meta:
        model = Person
        fields = ("id", "name", "wins","loses")
class Query(graphene.ObjectType):
    all_Persons = graphene.List(PersonType)

    def resolve_all_Persons(self, info):
        return Person.objects.all()

schema = graphene.Schema(query=Query)