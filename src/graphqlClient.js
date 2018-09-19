import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { persistCache } from 'apollo-cache-persist'

import schemaLink from './graphql/schemaLink'

const cache = new InMemoryCache()
// persistCache({ cache, storage: window.localStorage })

const client = new ApolloClient({ link: schemaLink, cache })

window.gql = client

export default client
