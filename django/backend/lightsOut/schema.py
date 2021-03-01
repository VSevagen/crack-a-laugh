import graphene
import backend.schema


class Query(backend.schema.Query, graphene.ObjectType):
    pass

class Mutation(backend.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)