export default `
  type Query {
    web3: Web3
    marketplace: Marketplace
    marketplaces: [Marketplace]
    contracts: [Contract]
    contract(id: String!): Contract
    tokens: [Token]
  }

  type Mutation {
    deployToken(name: String!, symbol: String!, decimals: String!, supply: String!): String
    transferToken(token: String!, from: String!, to: String!, value: String!): TransferTokenOutput
    updateTokenAllowance(token: String!, from: String!, to: String!, value: String!): Boolean
    deployMarketplace(token: String!, version: String, from: String, autoWhitelist: Boolean): String

    sendFromNode(from: String!, to: String!, value: String!): SendFromNodeOutput
    setActiveWallet(address: String!): Account
    createWallet(role: String, name: String): Account
    removeWallet(address: String!): String

    createListing(
      deposit: String!
      arbitrator: String
      from: String
      data: NewListingInput
      autoApprove: Boolean
    ): Transaction

    updateListing(
      listingID: String!
      additionalDeposit: String
      from: String,
      data: NewListingInput
      autoApprove: Boolean
    ): Listing

    withdrawListing(
      listingID: String!
      target: String!
      reason: String
      from: String
    ): Boolean

    makeOffer(
      listingID: String,
      finalizes: String,
      affiliate: String,
      commission: String,
      value: String,
      currency: String,
      arbitrator: String,
      from: String,
      withdraw: String
    ): Offer

    executeRuling(
      listingID: String!
      offerID: String!
      ruling: String!
      commission: String!
      message: String
      refund: String
      from: String
    ): Offer

    addData(data: String!, listingID: String, offerID: String): Boolean

    acceptOffer(listingID: String!, offerID: String!, from: String): Offer
    withdrawOffer(listingID: String!, offerID: String!, from: String): Offer
    finalizeOffer(listingID: String!, offerID: String!, from: String): Offer
    disputeOffer(listingID: String!, offerID: String!, from: String): Offer
    addFunds(listingID: String!, offerID: String!, amount: String!, from: String): Offer
    updateRefund(listingID: String!, offerID: String!, amount: String!, from: String): Offer
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
    transactions: [Transaction]
    transaction(id: ID!): Transaction
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

  type Token {
    id: ID!
    address: String
    name: String
    symbol: String
    decimals: Int
    totalSupply: String
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
    version: String
    token: Token
    owner: Account
    account: Account
    totalListings: Int
    getListing(idx: Int!): Listing
    getOffer(idx: Int!, listingId: Int!): Offer
    allListings: [Listing]
  }

  type Listing {
    id: Int!
    status: String
    seller: Account
    deposit: Int
    arbitrator: Account
    ipfs: ListingData
    totalOffers: Int
    offers: [Offer]
    getOffer(idx: Int!): Offer
    events: [Event]
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
    withdrawnBy: Account
    ipfs: OfferData
  }

  type OfferData {
    id: ID!
    buyer: String
    finalizes: String
    affiliate: String
    commission: String
    value: String
    refund: String
    currency: String
    arbitrator: String
  }

  type Transaction {
    id: ID!
    status: String
    blockHash: String
    blockNumber: Int
    from: String
    gas: Int
    gasPrice: String
    hash: String
    input: String
    nonce: Int
    to: String
    value: String
    pct: Float
  }

  type Event {
    id: ID!
    address: String
    blockHash: String
    blockNumber: Int
    block: Block
    event: String
    logIndex: Int
    raw: EventRaw
    returnValues: EventReturnValues
    signature: String
    transactionHash: String
    transactionIndex: Int
    type: String
  }

  type EventRaw {
    data: String
    topics: [String]
  }

  type EventReturnValues {
    listingID: String
    offerID: String
    party: String!
    ipfsHash: String!
  }

  type Block {
    id: ID!
    number: Int
    hash: String
    parentHash: String
    mixHash: String
    nonce: String
    sha3Uncles: String
    logsBloom: String
    transactionsRoot: String
    stateRoot: String
    receiptsRoot: String
    miner: String
    difficulty: String
    totalDifficulty: String
    extraData: String
    size: Int
    gasLimit: Int
    gasUsed: Int
    timestamp: Int
    transactions: [String]
    uncles: [String]
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
