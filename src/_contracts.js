import MarketplaceContract from './contracts/Marketplace'
import TokenContract from './contracts/Token'

const contracts = {
  ipfsGateway: `http://localhost:9090`,
  ipfsRPC: `http://localhost:5002`
}

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

export default contracts
