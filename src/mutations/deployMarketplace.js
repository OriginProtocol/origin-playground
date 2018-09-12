import Marketplace from '../contracts/Marketplace'

/*
mutation deployMarketplace($token: String) {
  deployMarketplace(token: $token)
}
{ "token": "0x7c38A2934323aAa8dAda876Cfc147C8af40F8D0e"}
*/

async function deployMarketplace(_, { token }) {
  return new Promise((resolve, reject) => {
    const Contract = new web3.eth.Contract(Marketplace.abi)
    Contract.deploy({
      data: '0x' + Marketplace.data,
      arguments: [token]
    }).send({
      gas: 4612388,
      from: web3.eth.defaultAccount
    })
    .on('confirmation', (confirmations, receipt) => {
      if (confirmations === 1) {
        window.localStorage.marketplaceContract = receipt.contractAddress
        resolve(receipt.contractAddress)
      }
    })
    .catch(reject)
    .then(() => {})
  })
}

export default deployMarketplace
