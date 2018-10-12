import Token from '../contracts/OriginToken'
import contracts from '../contracts'

import txHelper, { checkMetaMask } from './_txHelper'
async function deployToken(_, { symbol, supply }) {
  const web3 = contracts.web3Exec
  await checkMetaMask(web3.eth.defaultAccount)
  const Contract = new web3.eth.Contract(Token.abi)
  supply = web3.utils.toWei(supply, 'ether')
  const tx = Contract.deploy({
    data: '0x' + Token.data,
    arguments: [supply]
    // arguments: [name, symbol, decimals, supply]
  }).send({
    gas: 4612388,
    from: web3.eth.defaultAccount
  })

  return txHelper({
    tx,
    mutation: 'deployToken',
    onReceipt: receipt => {
      console.log("Token receipt", receipt)
      window.localStorage[`${symbol}Contract`] = receipt.contractAddress

      let tokens = {}
      try {
        tokens = JSON.parse(window.localStorage.tokens)
      } catch (e) {
        /* Ignore */
      }
      tokens[symbol] = receipt.contractAddress
      localStorage.tokens = JSON.stringify(tokens)
      contracts.ogn.options.address = receipt.contractAddress
      contracts[receipt.contractAddress] = contracts.ogn
    }
  })
}

export default deployToken


/*
mutation deployToken($name: String, $symbol: String, $decimals: Int, $supply: String) {
  deployToken(name: $name, symbol: $symbol, decimals: $decimals, supply: $supply)
}

{ "name": "OriginToken",
 "symbol": "OGN",
 "decimals": 2,
 "supply": "1000000"}

 */
