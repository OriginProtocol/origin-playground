export default `
  type Subscription {
    newBlock: Block
    transactionUpdated: TransactionUpdate
  }

  type TransactionUpdate {
    id: ID!
    status: String
    mutation: String
    confirmations: Int
  }

  type Query {
    web3: Web3
    marketplace: Marketplace
    marketplaces: [Marketplace]
    contracts: [Contract]
    contract(id: String!): Contract
    tokens: [Token]
    ethUsd: String
  }

  type Mutation {
    refetch: Boolean
    setNetwork(network: String): Boolean
    toggleMetaMask: Boolean
    deployToken(name: String!, symbol: String!, decimals: String!, supply: String!): Transaction
    transferToken(token: String!, from: String!, to: String!, value: String!): Transaction
    updateTokenAllowance(token: String!, from: String!, to: String!, value: String!): Transaction
    deployMarketplace(token: String!, version: String, from: String, autoWhitelist: Boolean): Transaction

    sendFromNode(from: String!, to: String!, value: String!): Transaction
    sendFromWallet(from: String!, to: String!, value: String!): Transaction
    setActiveWallet(address: String!): Account
    createWallet(role: String, name: String): Account
    importWallet(role: String, name: String, privateKey: String!): Account
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
    ): Transaction

    withdrawListing(
      listingID: String!
      target: String!
      reason: String
      from: String
    ): Transaction

    makeOffer(
      listingID: String
      finalizes: Int
      affiliate: String
      commission: String
      value: String
      currency: String
      arbitrator: String
      from: String
      withdraw: String
    ): Transaction

    executeRuling(
      listingID: String!
      offerID: String!
      ruling: String!
      commission: String!
      message: String
      refund: String
      from: String
    ): Transaction

    addData(data: String!, listingID: String, offerID: String): Transaction
    addAffiliate(affiliate: String!, from: String): Transaction

    acceptOffer(listingID: String!, offerID: String!, from: String): Transaction
    withdrawOffer(listingID: String!, offerID: String!, from: String): Transaction
    finalizeOffer(listingID: String!, offerID: String!, from: String, rating: Int, review: String): Transaction
    disputeOffer(listingID: String!, offerID: String!, from: String): Transaction
    addFunds(listingID: String!, offerID: String!, amount: String!, from: String): Transaction
    updateRefund(listingID: String!, offerID: String!, amount: String!, from: String): Transaction
  }

  type Web3 {
    networkId: String
    nodeAccounts: [Account]
    nodeAccount(id: String!): Account
    accounts: [Account]
    account(id: String!): Account
    defaultAccount: Account
    transaction(id: ID!): Transaction
    metaMaskAvailable: Boolean
    metaMaskEnabled: Boolean
    metaMaskAccount: Account
  }

  type Price {
    currency: String
    amount: String
  }

  type Account {
    id: String!
    balance: Balance
    role: String
    name: String
    token(symbol: String!): TokenHolder
    identity: Identity
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
    allowance(contract: String): String
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
    id: String
    address: String
    version: String
    token: Token
    owner: Account
    account: Account
    totalListings: Int
    getListing(id: String!): Listing
    getOffer(id: String!, listingId: String!): Offer
    allListings(offset: Int, limit: Int): [Listing]
    totalEvents: Int
    events(offset: Int, limit: Int): [Event]
  }

  type Listing {
    id: String!
    status: String
    seller: Account
    deposit: String
    arbitrator: Account
    ipfs: ListingData
    totalOffers: Int
    offers: [Offer]
    getOffer(id: String!): Offer
    events: [Event]
    totalEvents: Int
    createdEvent: Event
  }

  type ListingData {
    id: ID!
    title: String
    description: String
    currencyId: String
    price: Price
    category: String
    media: [Media]
  }

  type Media {
    url: String
    contentType: String
  }

  type Offer {
    id: String!
    listingId: String!
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
    finalizes: Int
    affiliate: String
    commission: Price
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
    timestamp: Int
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

  type Identity {
    id: ID!
    name: String
    claims: [Claim]
    profile: ProfileData
  }

  type ProfileData {
    id: ID!
    firstName: String
    lastName: String
    description: String
    avatar: String
  }

  type Claim {
    id: String!
    topic: String
    scheme: String
    issuer: String
    signature: String
    data: String
    uri: String
  }

  input NewListingInput {
    title: String!
    description: String
    category: String
    price: PriceInput
  }

  input PriceInput {
    amount: String
    currency: String
  }

  input MakeOfferInput {
    currency: String
  }
`
