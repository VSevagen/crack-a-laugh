import graphene
from graphene_django import DjangoObjectType

from lightsOut.models import Entry


# Make your schema here, both for mutations and queries
# Very important part to get your graphql api working.


class EntryType(DjangoObjectType):
    class Meta:
        model = Entry
        fields = ("id", "name", "wins", "loses")


class Query(graphene.ObjectType):
    all_entries = graphene.List(EntryType)

    def resolve_all_entries(self, info):
        # We can easily optimize query count in the resolve method
        return Entry.objects.all()


class CreateOrUpdateEntry(graphene.Mutation):
    name = graphene.String()
    wins = graphene.Int()
    loses = graphene.Int()

    class Arguments:
        name = graphene.String()
        win = graphene.Int()
        lose = graphene.Int()

    def mutate(self, info, name, win, lose):
        entry, created = Entry.objects.get_or_create(
            name=name,
            defaults={
                'wins': 0, 'loses': 0
            }
        )
        entry.wins += win
        entry.loses += lose
        entry.save()

        return CreateOrUpdateEntry(
            name=entry.name,
            wins=entry.wins,
            loses=entry.loses,
        )


class Mutation(graphene.ObjectType):
    create_or_update_entry = CreateOrUpdateEntry.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
