import graphene
from graphene_django import DjangoObjectType
import lightsOut.schema

# Make your schema here, both for mutations and queries
# Very important part to get your graphql api working.

class Query(lightsOut.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)
