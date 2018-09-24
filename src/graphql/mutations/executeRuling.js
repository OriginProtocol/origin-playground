import { post } from 'utils/ipfsHash'
import txHelper from './_txHelper'

async function executeRuling(_, data, context) {
  const ipfsHash = await post(context.contracts.ipfsRPC, data)
  let ruling = 0,
    refund = '0'
  if (data.ruling === 'partial-refund') {
    refund = data.refund
  } else if (data.ruling === 'refund-buyer') {
    ruling = 1
    refund = data.refund
  }
  if (data.commission === 'pay') {
    ruling += 2
  }
  const tx = context.contracts.marketplaceExec.methods
    .executeRuling(data.listingID, data.offerID, ipfsHash, ruling, refund)
    .send({
      gas: 4612388,
      from: data.from || web3.eth.defaultAccount
    })
  return txHelper({
    tx,
    context,
    mutation: 'executeRuling'
  })
}

export default executeRuling
