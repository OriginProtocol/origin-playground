import { SchemaLink } from 'apollo-link-schema'

import context from './context'
import schema from './schema'

const link = new SchemaLink({
  schema,
  context: () => ({ usd: 400, contracts: context })
})

export default link
