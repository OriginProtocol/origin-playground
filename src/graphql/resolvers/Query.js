import Marketplace from '../../contracts/Marketplace'

export default {
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
}
