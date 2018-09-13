export default `
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
    acceptOffer(listingID: String!, offerID: String!, from: String): Offer
    withdrawOffer(listingID: String!, offerID: String!, from: String): Offer
    finalizeOffer(listingID: String!, offerID: String!, from: String): Offer
    addFunds(listingID: String!, offerID: String!, amount: String!, from: String): Offer
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
