import MarketplaceContract from '../contracts/Marketplace'
import TokenContract from '../contracts/Token'
import eventCache from './eventCache'

const HOST = process.env.HOST || 'localhost'
let provider = 'https://eth-node.dapptix.com'

if (process.env.NODE_ENV !== 'production') {
  provider = `ws://${HOST}:8545`
}

if (typeof window !== 'undefined') {
  provider = window.sessionStorage.provider || provider
  window.web3 = new Web3(provider)
}

if (window.localStorage.privateKeys) {
  JSON.parse(window.localStorage.privateKeys).forEach(key =>
    web3.eth.accounts.wallet.add(key)
  )
  web3.eth.defaultAccount = window.localStorage.defaultAccount
}

const contracts = {
  ipfsGateway: `http://localhost:9090`,
  ipfsRPC: `http://localhost:5002`
}

export function resetContracts() {
  if (window.localStorage.marketplaceContract) {
    contracts.marketplace = new web3.eth.Contract(
      MarketplaceContract.abi,
      window.localStorage.marketplaceContract
    )
    contracts.marketplace.eventCache = eventCache(contracts.marketplace)
    // contracts.marketplace.events.allEvents(async () => {
    //   const block = await web3.eth.getBlockNumber()
    //   contracts.marketplace.eventCache.updateBlock(block)
    //   gql.resetStore()
    // })
  }
  if (window.localStorage.OGNContract) {
    contracts.ogn = new web3.eth.Contract(
      TokenContract.abi,
      window.localStorage.OGNContract
    )
  }
  window.contracts = contracts
}

resetContracts()

export default contracts
