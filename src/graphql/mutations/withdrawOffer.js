import { post } from 'utils/ipfsHash'

import getOffer from '../resolvers/helpers/getOffer'

async function withdrawOffer(_, data, context) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, data)

    context.contracts.marketplace.methods
      .withdrawOffer(data.listingID, data.offerID, ipfsHash)
      .send({
        gas: 4612388,
        from: data.from || web3.eth.defaultAccount
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

export default withdrawOffer
