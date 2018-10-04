import MarketplaceContract from '../contracts/V00_Marketplace'
import UserRegistryContract from '../contracts/V00_UserRegistry'
import ClaimHolderRegisteredContract from '../contracts/ClaimHolderRegistered'
import TokenContract from '../contracts/OriginToken'
import eventCache from './eventCache'

const HOST = process.env.HOST || 'localhost'
let provider = 'https://eth-node.dapptix.com'

if (process.env.NODE_ENV !== 'production') {
  // provider = `wss://kovan.infura.io/ws`
  // provider = `wss://rinkeby.infura.io/ws`
  provider = `wss://mainnet.infura.io/ws`
  // provider = `https://mainnet.infura.io`
  // provider = `ws://${HOST}:8545`
  // provider = `http://${HOST}:8545`
} else {
  provider = `wss://mainnet.infura.io/ws`
  const ans = {
    V00_UserRegistry: '0xa4428439ec214cc68240552ec93298d1da391114',
    OriginIdentity: '0x1af44feeb5737736b6beb42fe8e5e6b7bb7391cd',
    OriginToken: '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26',
    V00_Marketplace: '0x819bb9964b6ebf52361f1ae42cf4831b921510f9'
  }
  localStorage.OGNContract = ans.OriginToken
  localStorage.tokens = JSON.stringify({ OGN: ans.OriginToken })
  localStorage.marketplaceContract = ans.V00_Marketplace
  localStorage.marketplaces = JSON.stringify({ '001': ans.V00_Marketplace })
  localStorage.userRegistryContract = ans.V00_UserRegistry
}
const EventBlock = 6400000

if (typeof window !== 'undefined') {
  provider = window.sessionStorage.provider || provider
  if (window.web3) {
    window.metaMask = new Web3(web3.currentProvider)
  }
  // window.web3 = new Web3(provider)
  window.web3 = new Web3(provider)

  if (window.localStorage.privateKeys) {
    JSON.parse(window.localStorage.privateKeys).forEach(key =>
      web3.eth.accounts.wallet.add(key)
    )
    web3.eth.defaultAccount = window.localStorage.defaultAccount
  }
}

const context = {
  // ipfsGateway: `http://localhost:9090`,
  ipfsGateway: `https://ipfs.originprotocol.com`,
  ipfsRPC: `http://localhost:5002`
}

export function resetContracts() {
  delete context.marketplace
  delete context.ogn
  delete context.marketplaces
  delete context.tokens
  context.EventBlock = EventBlock
  if (typeof window !== 'undefined') {
    if (typeof web3 !== 'undefined') {
      context.claimHolderRegistered = new web3.eth.Contract(
        ClaimHolderRegisteredContract.abi
      )
    }
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
      if (typeof metaMask !== 'undefined') {
        context.marketplaceMetaMask = new metaMask.eth.Contract(
          MarketplaceContract.abi,
          window.localStorage.marketplaceContract
        )
      }
      context.marketplace.eventCache = eventCache(
        context.marketplace,
        EventBlock
      )
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
      if (typeof metaMask !== 'undefined') {
        context.ognMetaMask = new metaMask.eth.Contract(
          TokenContract.abi,
          window.localStorage.OGNContract
        )
      }
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
        const contract = new web3.eth.Contract(
          TokenContract.abi,
          tokens[symbol]
        )
        contract.symbol = symbol
        contract.id = tokens[symbol]
        return contract
      })
      context.tokens.forEach(token => (context[token.id] = token))
    }
    window.context = context
  }
}
// window.resetContracts = resetContracts

resetContracts()

export default context
