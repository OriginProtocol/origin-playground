import { post } from 'utils/ipfsHash'

import getOffer from '../resolvers/getOffer'

/*
mutation makeOffer($listingID: String, $offerID: String) {
  acceptOffer(listingID: $listingID, offerID: $offerID)
}
{
  "listingID": "0",
  "offerID": "0"
}
*/

async function acceptOffer(_, data, context) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, {})

    context.contracts.marketplace.methods
      .acceptOffer(data.listingID, data.offerID, ipfsHash)
      .send({
        gas: 4612388,
        from: web3.eth.defaultAccount
      })
      .on('confirmation', async (confirmations) => {
        if (confirmations === 1) {
          resolve(getOffer(context.contracts.marketplace, {
            listingId: data.listingID,
            idx: data.offerID
          }))
        }
      })
      .on('error', reject)
      .then(() => {})
  })
}

export default acceptOffer
