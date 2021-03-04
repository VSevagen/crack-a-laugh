import graphene
import lightsOut.schema 
from lightsOut.models import UserData

class Query(lightsOut.schema.Query, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass

class Mut(lightsOut.schema.Mut,graphene.Mutation):
    pass


class Mutation(graphene.ObjectType):
    makemut = Mut.Field()

schema = graphene.Schema(query=Query,mutation=Mutation)