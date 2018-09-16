import { post } from 'utils/ipfsHash'

import getListing from '../resolvers/helpers/getListing'

function updateRefund(
  _,
  { listingID, additionalDeposit, data, from },
  context
) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, data)

    context.contracts.marketplace.methods
      .updateListing(listingID, ipfsHash, additionalDeposit)
      .send({
        gas: 4612388,
        from: from || web3.eth.defaultAccount
      })
      .on('receipt', receipt => {
        context.contracts.marketplace.eventCache.updateBlock(
          receipt.blockNumber
        )
      })
      .on('confirmation', async confirmations => {
        if (confirmations === 1) {
          resolve(
            getListing(context.contracts.marketplace, {
              idx: data.listingID
            })
          )
        }
      })
      .catch(reject)
      .then(() => {})
  })
}

export default updateRefund
