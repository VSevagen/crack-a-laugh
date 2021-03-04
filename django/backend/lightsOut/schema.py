import graphene
import backend.schema

class Query(backend.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query) 