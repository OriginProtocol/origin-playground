import Marketplace from '../../contracts/V00_Marketplace'
import { resetContracts } from '../context'
import txHelper from './_txHelper'

async function deployMarketplace(
  _,
  { token, version, from, autoWhitelist },
  context
) {
  const Contract = new web3.eth.Contract(Marketplace.abi)
  const tx = Contract.deploy({
    data: '0x' + Marketplace.data,
    arguments: [token]
  }).send({
    gas: 5500000,
    from: from || web3.eth.defaultAccount
  })

  return txHelper({
    tx,
    mutation: 'deployMarketplace',
    onReceipt: receipt => {
      window.localStorage.marketplaceContract = receipt.contractAddress

      let marketplaces = {}
      try {
        marketplaces = JSON.parse(window.localStorage.marketplaces)
      } catch (e) {
        /* Ignore */
      }
      marketplaces[version] = receipt.contractAddress
      localStorage.marketplaces = JSON.stringify(marketplaces)

      resetContracts()
      context.contracts.marketplace.eventCache.updateBlock(receipt.blockNumber)

      const Token = context.contracts[token]
      if (!autoWhitelist || !Token) {
        return
      }

      if (Token) {
        Token.methods
          .addCallSpenderWhitelist(receipt.contractAddress)
          .send({
            gas: 4000000,
            from: from || web3.eth.defaultAccount
          })
          .then(() => {})
          .catch()
      }
    }
  })

  // return new Promise((resolve, reject) => {
  //   if (
  //     context.contracts.marketplaces &&
  //     context.contracts.marketplaces.find(m => m.version === version)
  //   ) {
  //     return reject('Version already exists')
  //   }
  //   const Contract = new web3.eth.Contract(Marketplace.abi)
  //   Contract.deploy({
  //     data: '0x' + Marketplace.data,
  //     arguments: [token]
  //   })
  //     .send({
  //       gas: 4612388,
  //       from: from || web3.eth.defaultAccount
  //     })
  //     .on('receipt', receipt => {
  //       window.localStorage.marketplaceContract = receipt.contractAddress
  //
  //       let marketplaces = {}
  //       try {
  //         marketplaces = JSON.parse(window.localStorage.marketplaces)
  //       } catch (e) {
  //         /* Ignore */
  //       }
  //       marketplaces[version] = receipt.contractAddress
  //       localStorage.marketplaces = JSON.stringify(marketplaces)
  //
  //       resetContracts()
  //       context.contracts.marketplace.eventCache.updateBlock(
  //         receipt.blockNumber
  //       )
  //
  //       const Token = context.contracts[token]
  //       if (!autoWhitelist || !Token) {
  //         resolve(receipt.contractAddress)
  //         return
  //       }
  //
  //       if (Token) {
  //         Token.methods
  //           .addToApproveCallWhitelist(receipt.contractAddress)
  //           .send({
  //             gas: 4000000,
  //             from: from || web3.eth.defaultAccount
  //           })
  //           .on('receipt', () => {
  //             resolve(receipt.contractAddress)
  //           })
  //           .catch(reject)
  //       }
  //     })
  //     .catch(reject)
  //     .then(() => {})
  // })
}

export default deployMarketplace

/*
mutation deployMarketplace($token: String) {
  deployMarketplace(token: $token)
}
{ "token": "0x7c38A2934323aAa8dAda876Cfc147C8af40F8D0e"}
*/
