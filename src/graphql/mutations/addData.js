import { post } from 'utils/ipfsHash'

async function addData(_, data, context) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, data)

    const args = [ipfsHash]
    if (data.listingId) {
      args.push(data.listingId)
    }
    if (data.offerId) {
      args.push(data.offerId)
    }

    context.contracts.marketplace.methods
      .addData(...args)
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
          resolve(true)
        }
      })
      .catch(reject)
      .then(() => {})
  })
}

export default addData
