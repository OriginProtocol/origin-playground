import { makeExecutableSchema } from 'graphql-tools'
import { SchemaLink } from 'apollo-link-schema'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'

import { post } from 'utils/ipfsHash'
import balancesFromWei from 'utils/balancesFromWei'
import Marketplace from './contracts/Marketplace'

import web3Resolvers from './resolvers/Web3'
import MarketplaceResolvers from './resolvers/Marketplace'
import ListingResolvers from './resolvers/Listing'
import OfferResolvers from './resolvers/Offer'

import createWallet from './mutations/createWallet'
import removeWallet from './mutations/removeWallet'
import sendFromNode from './mutations/sendFromNode'
import deployToken from './mutations/deployToken'
import createListing from './mutations/createListing'
import makeOffer from './mutations/makeOffer'
import acceptOffer from './mutations/acceptOffer'
import finalizeOffer from './mutations/finalizeOffer'
import deployMarketplace from './mutations/deployMarketplace'
import setActiveWallet from './mutations/setActiveWallet'

const HOST = process.env.HOST || 'localhost'
let provider = 'https://eth-node.dapptix.com'

if (process.env.NODE_ENV !== 'production') {
  provider = `http://${HOST}:8545`
}

if (typeof window !== 'undefined') {
  provider = window.sessionStorage.provider || provider
  window.web3 = new Web3(provider)
}

const contracts = require('./_contracts').default

if (window.sessionStorage.privateKeys) {
  JSON.parse(window.sessionStorage.privateKeys).forEach(key =>
    web3.eth.accounts.wallet.add(key)
  )
}

const typeDefs = `
  type Query {
    web3: Web3,
    marketplace: Marketplace
  }

  type Mutation {
    deployToken(name: String!, symbol: String!, decimals: String!, supply: String!): String
    deployMarketplace(token: String!): String

    sendFromNode(from: String!, to: String!, value: String!): SendFromNodeOutput
    setActiveWallet(address: String!): Account
    createWallet(role: String): Account
    removeWallet(address: String!): String

    createListing(
      deposit: String!,
      arbitrator: String,
      from: String,
      data: NewListingInput
    ): Listing
    makeOffer(
      listingID: String,
      finalizes: String,
      affiliate: String,
      commission: String,
      value: String,
      currency: String,
      arbitrator: String,
      from: String
    ): Offer
    acceptOffer(listingID: String!, offerID: String!): Offer
    withdrawOffer(listingID: String!, offerID: String!): Offer
    finalizeOffer(listingID: String!, offerID: String!): Offer
  }

  type Web3 {
    networkId: String
    nodeAccounts: [Account]
    nodeAccountAt(idx: Int!): Account
    nodeAccount(id: String!): Account
    accounts: [Account]
    accountAt(idx: Int!): Account
    account(id: String!): Account
    defaultAccount: Account
  }
  type Account {
    id: String!
    balance: Balance
    role: String
  }
  type Balance {
    wei: String
    eth: String
    usd: String
  }
  type SendFromNodeOutput {
    toAccount: Account
    fromAccount: Account
  }
  type Marketplace {
    address: String
    totalListings: Int
    getListing(idx: Int!): Listing
    getOffer(idx: Int!, listingId: Int!): Offer
    allListings: [Listing]
  }
  type Listing {
    id: Int!
    seller: Account
    deposit: Int
    arbitrator: Account
    ipfsHash: String
    ipfs: ListingData
    totalOffers: Int
    offers: [Offer]
    getOffer(idx: Int!): Offer
  }
  type ListingData {
    hash: String
    title: String
    currencyId: String
    price: String
    category: String
  }
  type Offer {
    id: Int!
    listingId: Int!
    listing: Listing
    value: String
    commission: String
    refund: String
    currency: String
    buyer: Account
    affiliate: Account
    arbitrator: Account
    finalizes: Int
    status: Int
    ipfsHash: String
    ipfs: OfferData
  }
  type OfferData {
    buyer: String
    finalizes: String
    affiliate: String
    commission: String
    value: String
    currency: String
    arbitrator: String
  }

  input NewListingInput {
    title: String!
    currencyId: String
    category: String
    price: String
  }
  input MakeOfferInput {
    currency: String
  }
`

if (window.localStorage.privateKeys) {
  JSON.parse(window.localStorage.privateKeys).forEach(key =>
    web3.eth.accounts.wallet.add(key)
  )
  web3.eth.defaultAccount = window.localStorage.defaultAccount
}

const resolvers = {
  Query: {
    web3: () => ({}),
    marketplace: () => {
      return localStorage.marketplaceContract ? new web3.eth.Contract(
        Marketplace.abi,
        localStorage.marketplaceContract
      ) : null
    }
  },
  Mutation: {
    createWallet,
    removeWallet,
    sendFromNode,
    deployToken,
    deployMarketplace,
    createListing,
    makeOffer,
    acceptOffer,
    finalizeOffer,
    setActiveWallet
  },
  Web3: web3Resolvers,
  Account: {
    balance: async (account, args, context) => {
      const wei = await web3.eth.getBalance(account.id)
      return balancesFromWei(wei, context)
    },
    role: (account) => {
      let roles = {}
      try {
        roles = JSON.parse(window.localStorage.accountRoles)
      } catch(e) { /* Ignore */ }
      return roles[account.id]
    }
  },
  Marketplace: MarketplaceResolvers,
  Listing: ListingResolvers,
  Offer: OfferResolvers
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      transaction: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Transaction', id: args.id })
    }
  }
})

const stateLink = withClientState({
  cache,
  typeDefs: `
    type Transaction {
      id: String!
      status: String
      confirmations: Int
    }
    type Query {
      transactions: [Transaction]
      transaction(id: String!): Transaction
      activeWallet: String
    }
  `,
  resolvers: {
    Mutation: {
      createListing: async (_, { obj, transactionId, from }, { cache }) => {
        const contract = new web3.eth.Contract(
          Marketplace.abi,
          localStorage.marketplaceContract
        )
        const ipfsHash = await post('http://localhost:5002', obj.ipfs)
        // const from = web3.eth.defaultAccount // accounts[3]

        const query = gql`
          query AllTransactions {
            transactions @client {
              id
              status
              confirmations
            }
          }
        `

        const data = client.readQuery({ query })
        data.transactions.push({
          __typename: 'Transaction',
          id: transactionId,
          status: 'submitted',
          confirmations: 0
        })
        client.writeQuery({ query, data })

        return new Promise((resolve, reject) => {
          contract.methods
            .createListing(ipfsHash, obj.deposit, obj.arbitrator)
            .send({ gas: 4612388, from })
            .on('confirmation', confirmations => {
              const id = `Transaction:${transactionId}`
              const fragment = gql`
                fragment transactionConfirmations on Transaction {
                  confirmations
                  status
                }
              `
              const transaction = cache.readFragment({ fragment, id })
              const data = { ...transaction, confirmations, status: 'success' }
              client.writeFragment({ fragment, id, data })

              if (confirmations === 1) {
                resolve(null)
              }
            })
            .on('error', reject)
            .then(() => {
              // data.marketplace.allListings[listingIdx].status = 'pending'
              // client.writeQuery({ query, data })
            })
        })
      }
    }
  },
  defaults: {
    transactions: [],
    activeWallet: 'abc' //web3.eth.accounts.wallet[0].address
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([
    // stateLink,
    new SchemaLink({
      schema,
      context: () => ({
        usd: 400, contracts
      })
    })
  ]),
  cache
})

client.onResetStore(stateLink.writeDefaults)

window.gql = client

export default client
