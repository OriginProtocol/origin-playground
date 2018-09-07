import MarketplaceContract from './contracts/Marketplace'

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

export default contracts
