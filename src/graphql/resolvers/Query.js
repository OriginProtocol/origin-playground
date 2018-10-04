let ethPrice

export default {
  web3: () => ({}),
  marketplace: (_, args, context) => context.contracts.marketplace,
  contracts: () => {
    let contracts = []
    try {
      contracts = JSON.parse(window.localStorage.contracts2)
    } catch (e) {
      /* Ignore  */
    }
    console.log(contracts)
    return contracts
  },
  marketplaces: (_, args, context) => context.contracts.marketplaces,
  tokens: (_, args, context) => context.contracts.tokens,
  ethUsd: () => new Promise((resolve, reject) => {
    if (ethPrice) { return resolve(ethPrice)}
    fetch("https://api.coinmarketcap.com/v2/ticker/1027/")
    .then(response => response.json())
    .then(response => {
      ethPrice = response.data.quotes.USD.price
      resolve(ethPrice)
    })
    .catch(reject)
  })
}
