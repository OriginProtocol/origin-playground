import { SchemaLink } from 'apollo-link-schema'

import contracts from './context'
import schema from './schema'

const link = new SchemaLink({
  schema,
  context: () => ({ usd: 400, contracts })
})

export default link
