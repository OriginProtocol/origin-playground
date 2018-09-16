import { post } from 'utils/ipfsHash'

async function withdrawListing(_, data, context) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, data)

    context.contracts.marketplace.methods
      .withdrawListing(data.listingID, data.target, ipfsHash)
      .send({
        gas: 4612388,
        from: data.from || web3.eth.defaultAccount
      })
      .on('receipt', receipt => {
        context.contracts.marketplace.eventCache.updateBlock(receipt.blockNumber)
      })
      .on('confirmation', async (confirmations) => {
        if (confirmations === 1) {
          resolve(true)
        }
      })
      .catch(reject)
      .then(() => {})
  })
}

export default withdrawListing
