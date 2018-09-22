import { ApolloLink } from 'apollo-link'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'

import SchemaLink from './graphql/SchemaLink'
import SubscriptionsLink from './graphql/SubscriptionsLink'
// import { persistCache } from 'apollo-cache-persist'

const cache = new InMemoryCache()
// persistCache({ cache, storage: window.localStorage })

const link = ApolloLink.split(
  operation => {
    const definition = getMainDefinition(operation.query)
    return definition.operation === 'subscription'
  },
  new SubscriptionsLink(),
  SchemaLink
)

const client = new ApolloClient({ link, cache })

window.gql = client

export default client
