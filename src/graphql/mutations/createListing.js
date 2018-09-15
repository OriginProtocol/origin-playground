import { post } from 'utils/ipfsHash'

import getListing from '../resolvers/helpers/getListing'
import { addTransaction, updateTransactionStatus } from '../transactions'

/*
mutation createListing($deposit: String, $arbitrator: String) {
  createListing(deposit: $deposit, arbitrator: $arbitrator)
}
{ "deposit": "0", "arbitrator": "0xBECf244F615D69AaE9648E4bB3f32161A87caFF1" }
*/

async function createListing(_, { deposit, arbitrator, data, from }, context) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, data)

    context.contracts.marketplace.methods
      .createListing(ipfsHash, deposit, arbitrator)
      .send({ gas: 4612388, from: from || web3.eth.defaultAccount })
      .once('transactionHash', hash => {
        addTransaction(hash)
      })
      .once('receipt', receipt => {
        updateTransactionStatus(receipt.transactionHash, 'Receipt')
        context.contracts.marketplace.eventCache.updateBlock(
          receipt.blockNumber
        )
        resolve(
          getListing(context.contracts.marketplace, {
            idx: receipt.events.ListingCreated.returnValues.listingID
          })
        )
      })
      .on('confirmation', function(confNumber, receipt) {
        if (confNumber > 0 && confNumber < 4) {
          updateTransactionStatus(
            receipt.transactionHash,
            `Confirmed ${confNumber} times`
          )
        }
      })
      .catch(reject)
      .then(() => {})
  })
}

export default createListing
