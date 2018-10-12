import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import link from './graphql/link'
// import { persistCache } from 'apollo-cache-persist'

const cache = new InMemoryCache()
// persistCache({ cache, storage: window.localStorage })

const client = new ApolloClient({ link, cache })

window.gql = client

export default client


// import ApolloClient from "apollo-boost";
// import './graphql/context'
//
// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql"
// });
// window.gql = client
//
// export default client
