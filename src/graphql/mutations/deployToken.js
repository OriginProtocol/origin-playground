import Token from '../../contracts/Token'
import { resetContracts } from '../context'
/*
mutation deployToken($name: String, $symbol: String, $decimals: Int, $supply: String) {
  deployToken(name: $name, symbol: $symbol, decimals: $decimals, supply: $supply)
}

{ "name": "OriginToken",
 "symbol": "OGN",
 "decimals": 2,
 "supply": "1000000"}

 */

async function deployToken(_, { name, symbol, decimals, supply }) {
  return new Promise((resolve, reject) => {
    const Contract = new web3.eth.Contract(Token.abi)
    Contract.deploy({
      data: '0x' + Token.data,
      arguments: [name, symbol, decimals, supply]
    })
      .send({
        gas: 4612388,
        from: web3.eth.defaultAccount
      })
      .on('receipt', receipt => {
        window.localStorage[`${symbol}Contract`] = receipt.contractAddress

        let tokens = {}
        try {
          tokens = JSON.parse(window.localStorage.tokens)
        } catch (e) {
          /* Ignore */
        }
        tokens[symbol] = receipt.contractAddress
        localStorage.tokens = JSON.stringify(tokens)

        resetContracts()
        resolve(receipt.contractAddress)
      })
      .catch(reject)
      .then(() => {})
  })
}

export default deployToken
