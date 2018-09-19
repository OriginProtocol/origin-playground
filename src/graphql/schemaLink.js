import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'

import context from './context'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const schema = makeExecutableSchema({ typeDefs, resolvers })

const link = new SchemaLink({
  schema,
  context: () => ({ usd: 400, contracts: context })
})

export default link
