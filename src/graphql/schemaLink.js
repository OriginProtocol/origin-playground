import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'

import contracts from './contracts'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const schema = makeExecutableSchema({ typeDefs, resolvers })

const link = new SchemaLink({
  schema,
  context: () => ({ usd: 400, contracts })
})

export default link
