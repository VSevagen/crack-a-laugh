import graphene

import lightsOut.schema


class Query(lightsOut.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)