import { post } from 'utils/ipfsHash'

import getOffer from '../resolvers/helpers/getOffer'

async function executeRuling(_, data, context) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, data)
    let ruling = 0, refund = '0'
    if (data.ruling === 'partial-refund') {
      refund = data.refund
    }
    else if (data.ruling === 'refund-buyer') {
      ruling = 1
      refund = data.refund
    }
    if (data.commission === 'pay') {
      ruling += 2
    }
    context.contracts.marketplace.methods
      .executeRuling(data.listingID, data.offerID, ipfsHash, ruling, refund)
      .send({
        gas: 4612388,
        from: data.from || web3.eth.defaultAccount
      })
      .on('receipt', receipt => {
        context.contracts.marketplace.eventCache.updateBlock(receipt.blockNumber)
      })
      .on('confirmation', async (confirmations) => {
        if (confirmations === 1) {
          resolve(getOffer(context.contracts.marketplace, {
            listingId: data.listingID,
            idx: data.offerID
          }))
        }
      })
      .then(() => {})
      .catch(reject)
  })
}

export default executeRuling
