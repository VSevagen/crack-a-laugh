import graphene
from graphene_django import DjangoObjectType
from lightsOut.models import Person
# Make your schema here, both for mutations and queries
# Very important part to get your graphql api working.

#Links:
#StackOverflow
#https://docs.graphene-python.org/projects/django/en/latest/tutorial-plain/

class PersonType(DjangoObjectType):
    class Meta:
        model = Person
        fields = ("id", "name", "wins","loses")
class Query(graphene.ObjectType):
    all_Persons = graphene.List(PersonType)

    def resolve_all_Persons(self, info):
        return Person.objects.all()

# Mutation
#Used links 
#https://stackabuse.com/building-a-graphql-api-with-django/
#https://www.queworx.com/django/django-get_or_create/
#And some doubts in the StackOverflow
class CreateOrUpdateperson(graphene.Mutation):
    name = graphene.String()
    wins = graphene.Int()
    loses = graphene.Int()

    class Arguments:
        name = graphene.String()
        win = graphene.Int()
        lose = graphene.Int()

    def mutate(root, info, name, wins, loses):
        person, created = Person.objects.get_or_create(
            name=name,
            defaults={
                'wins': 0, 'loses': 0
            }
        )
        person.wins += wins
        person.loses += loses
        person.save()

        return CreateOrUpdateperson(
            name=person.name,
            wins=person.wins,
            loses=person.loses,
        )


class Mutation(graphene.ObjectType):
    create_or_update_person = CreateOrUpdateperson.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)