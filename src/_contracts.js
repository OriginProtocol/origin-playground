import MarketplaceContract from './contracts/Marketplace'
import TokenContract from './contracts/Token'

const HOST = process.env.HOST || 'localhost'
let provider = 'https://eth-node.dapptix.com'

if (process.env.NODE_ENV !== 'production') {
  provider = `http://${HOST}:8545`
}

if (typeof window !== 'undefined') {
  provider = window.sessionStorage.provider || provider
  window.web3 = new Web3(provider)
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
  }
  if (window.localStorage.OGNContract) {
    contracts.ogn = new web3.eth.Contract(
      TokenContract.abi,
      window.localStorage.OGNContract
    )
  }
}

resetContracts()

export default contracts
