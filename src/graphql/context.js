import MarketplaceContract from '../contracts/V00_Marketplace'
import UserRegistryContract from '../contracts/V00_UserRegistry'
import TokenContract from '../contracts/OriginToken'
import eventCache from './eventCache'

const HOST = process.env.HOST || 'localhost'
let provider = 'https://eth-node.dapptix.com'

if (process.env.NODE_ENV !== 'production') {
  // provider = `wss://kovan.infura.io/ws`
  // provider = `wss://rinkeby.infura.io/ws`
  // provider = `ws://${HOST}:8545`
  provider = `http://${HOST}:8545`
}

if (typeof window !== 'undefined') {
  provider = window.sessionStorage.provider || provider
  if (window.web3) {
    window.metaMask = new Web3(web3.currentProvider)
  }
  // window.web3 = new Web3(provider)
  window.web3 = new Web3(provider)
}

if (window.localStorage.privateKeys) {
  JSON.parse(window.localStorage.privateKeys).forEach(key =>
    web3.eth.accounts.wallet.add(key)
  )
  web3.eth.defaultAccount = window.localStorage.defaultAccount
}

const context = {
  ipfsGateway: `http://localhost:9090`,
  // ipfsGateway: `https://ipfs.staging.originprotocol.com`,
  ipfsRPC: `http://localhost:5002`
}

export function resetContracts() {
  delete context.marketplace
  delete context.ogn
  delete context.marketplaces
  delete context.tokens
  if (window.localStorage.userRegistryContract) {
    context.userRegistry = new web3.eth.Contract(
      UserRegistryContract.abi,
      window.localStorage.userRegistryContract
    )
  }
  if (window.localStorage.marketplaceContract) {
    context.marketplace = new web3.eth.Contract(
      MarketplaceContract.abi,
      window.localStorage.marketplaceContract
    )
    context.marketplaceMetaMask = new metaMask.eth.Contract(
      MarketplaceContract.abi,
      window.localStorage.marketplaceContract
    )
    context.marketplace.eventCache = eventCache(context.marketplace)
    // context.marketplaceExec = context.marketplaceMetaMask
    context.marketplaceExec = context.marketplace
    context[window.localStorage.marketplaceContract] = context.marketplace
    // contracts.marketplace.events.allEvents(async () => {
    //   const block = await web3.eth.getBlockNumber()
    //   contracts.marketplace.eventCache.updateBlock(block)
    //   gql.resetStore()
    // })
  }
  if (window.localStorage.OGNContract) {
    context.ogn = new web3.eth.Contract(
      TokenContract.abi,
      window.localStorage.OGNContract
    )
    // console.log('Set ogn')
    context.ognMetaMask = new metaMask.eth.Contract(
      TokenContract.abi,
      window.localStorage.OGNContract
    )
    // context.ognExec = context.ognMetaMask
    context.ognExec = context.ogn
    context[window.localStorage.OGNContract] = context.ogn
  }
  if (window.localStorage.marketplaces) {
    const marketplaces = JSON.parse(window.localStorage.marketplaces)
    context.marketplaces = Object.keys(marketplaces).map(version => {
      const contract = new web3.eth.Contract(
        MarketplaceContract.abi,
        marketplaces[version]
      )
      contract.version = version
      contract.id = marketplaces[version]
      return contract
    })
    context.marketplaces.forEach(
      marketplace => (context[marketplace.id] = marketplace)
    )
  }
  if (window.localStorage.tokens) {
    const tokens = JSON.parse(window.localStorage.tokens)
    context.tokens = Object.keys(tokens).map(symbol => {
      const contract = new web3.eth.Contract(TokenContract.abi, tokens[symbol])
      contract.symbol = symbol
      contract.id = tokens[symbol]
      return contract
    })
    context.tokens.forEach(token => (context[token.id] = token))
  }
  window.context = context
}
window.resetContracts = resetContracts

resetContracts()

export default context
