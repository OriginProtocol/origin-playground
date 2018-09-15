import { post } from 'utils/ipfsHash'

import getOffer from '../resolvers/helpers/getOffer'

/*
mutation addFunds($listingID: String, $offerID: String) {
  addFunds(listingID: $listingID, offerID: $offerID)
}
{
  "listingID": "0",
  "offerID": "0"
}
*/

function updateRefund(_, data, context) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, data)

    context.contracts.marketplace.methods
      .updateRefund(data.listingID, data.offerID, data.amount, ipfsHash)
      .send({
        gas: 4612388,
        from: data.from || web3.eth.defaultAccount
      })
      .on('receipt', receipt => {
        context.contracts.marketplace.eventCache.updateBlock(
          receipt.blockNumber
        )
      })
      .on('confirmation', async confirmations => {
        if (confirmations === 1) {
          resolve(
            getOffer(context.contracts.marketplace, {
              listingId: data.listingID,
              idx: data.offerID
            })
          )
        }
      })
      .catch(reject)
      .then(() => {})
  })
}

export default updateRefund
