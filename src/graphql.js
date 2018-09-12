import { makeExecutableSchema } from 'graphql-tools'
import { SchemaLink } from 'apollo-link-schema'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import ApolloClient from 'apollo-client'

import Marketplace from './contracts/Marketplace'

import web3Resolvers from './resolvers/Web3'
import AccountResolvers from './resolvers/Account'
import MarketplaceResolvers from './resolvers/Marketplace'
import ListingResolvers from './resolvers/Listing'
import OfferResolvers from './resolvers/Offer'

import createWallet from './mutations/createWallet'
import removeWallet from './mutations/removeWallet'
import sendFromNode from './mutations/sendFromNode'
import deployToken from './mutations/deployToken'
import transferToken from './mutations/transferToken'
import updateTokenAllowance from './mutations/updateTokenAllowance'

import createListing from './mutations/createListing'
import makeOffer from './mutations/makeOffer'
import acceptOffer from './mutations/acceptOffer'
import withdrawOffer from './mutations/withdrawOffer'
import finalizeOffer from './mutations/finalizeOffer'
import addFunds from './mutations/addFunds'
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
    web3: Web3
    marketplace: Marketplace
    contracts: [Contract]
    contract(id: String!): Contract
  }

  type Mutation {
    deployToken(name: String!, symbol: String!, decimals: String!, supply: String!): String
    transferToken(token: String!, from: String!, to: String!, value: String!): TransferTokenOutput
    updateTokenAllowance(token: String!, from: String!, to: String!, value: String!): Boolean
    deployMarketplace(token: String!): String

    sendFromNode(from: String!, to: String!, value: String!): SendFromNodeOutput
    setActiveWallet(address: String!): Account
    createWallet(role: String, name: String): Account
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
    addFunds(listingID: String!, offerID: String!, amount: String!): Offer
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
    name: String
    token(symbol: String!): TokenHolder
  }
  type Balance {
    wei: String
    eth: String
    usd: String
  }
  type TokenHolder {
    id: String!
    account: String
    symbol: String
    balance: String
    allowance(contract: String!): String
  }
  type Contract {
    id: String!
    balance: Balance
    type: String
    name: String
    token(symbol: String!): TokenHolder
  }
  type SendFromNodeOutput {
    toAccount: Account
    fromAccount: Account
  }
  type TransferTokenOutput {
    to: TokenHolder
    from: TokenHolder
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
    ipfs: ListingData
    totalOffers: Int
    offers: [Offer]
    getOffer(idx: Int!): Offer
  }
  type ListingData {
    id: ID!
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
    ipfs: OfferData
  }
  type OfferData {
    id: ID!
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
      return localStorage.marketplaceContract
        ? new web3.eth.Contract(
            Marketplace.abi,
            localStorage.marketplaceContract
          )
        : null
    },
    contracts: () => {
      let contracts = []
      try {
        contracts = JSON.parse(window.localStorage.contracts2)
      } catch (e) {
        /* Ignore  */
      }
      console.log(contracts)
      return contracts
    }
  },
  Mutation: {
    createWallet,
    removeWallet,
    sendFromNode,
    deployToken,
    transferToken,
    updateTokenAllowance,
    deployMarketplace,
    createListing,
    makeOffer,
    acceptOffer,
    finalizeOffer,
    withdrawOffer,
    setActiveWallet,
    addFunds
  },
  Web3: web3Resolvers,
  Account: AccountResolvers,
  Marketplace: MarketplaceResolvers,
  Listing: ListingResolvers,
  Offer: OfferResolvers,
  TokenHolder: {
    allowance: async (token, args, context) => {
      if (token.symbol === 'OGN') {
        let contract = args.contract
        if (contract === 'marketplace') {
          contract = localStorage.marketplaceContract
        }
        const balance = await context.contracts.ogn.methods
          .allowance(token.account, contract)
          .call()
        return balance
      }
      return null
    }
  }
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

persistCache({
  cache,
  storage: window.localStorage
})

const client = new ApolloClient({
  link: ApolloLink.from([
    // stateLink,
    new SchemaLink({
      schema,
      context: () => ({
        usd: 400,
        contracts
      })
    })
  ]),
  cache
})

window.gql = client

export default client
