import { post } from 'utils/ipfsHash'

import getOffer from '../resolvers/getOffer'

/*
mutation addFunds($listingID: String, $offerID: String) {
  addFunds(listingID: $listingID, offerID: $offerID)
}
{
  "listingID": "0",
  "offerID": "0"
}
*/

function addFunds(_, data, context) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, data)

    context.contracts.marketplace.methods
      .addFunds(data.listingID, data.offerID, ipfsHash, data.amount)
      .send({
        gas: 4612388,
        from: web3.eth.defaultAccount,
        value: data.amount
      })
      .on('confirmation', async (confirmations) => {
        if (confirmations === 1) {
          resolve(getOffer(context.contracts.marketplace, {
            listingId: data.listingID,
            idx: data.offerID
          }))
        }
      })
      .catch(reject)
      .then(() => {})
  })
}

export default addFunds
