#import graphene
#from graphene_django import DjangoObjectType

# Make your schema here, both for mutations and queries
# Very important part to get your graphql api working.
import graphene
import lightsOut.schema

class Query(lightsOut.schema.Query, graphene.ObjectType):
    pass

class Mutation(lightsOut.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)