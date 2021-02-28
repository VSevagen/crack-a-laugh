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


schema = graphene.Schema(query=Query)
