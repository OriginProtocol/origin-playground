import { post } from 'utils/ipfsHash'
import txHelper, { checkMetaMask } from './_txHelper'

async function updateRefund(_, data, context) {
  await checkMetaMask(context, data.from)
  const ipfsHash = await post(context.contracts.ipfsRPC, data)

  const tx = context.contracts.marketplaceExec.methods
    .updateRefund(data.listingID, data.offerID, data.amount, ipfsHash)
    .send({
      gas: 4612388,
      from: data.from || web3.eth.defaultAccount
    })
  return txHelper({
    tx,
    context,
    mutation: 'updateRefund'
  })
}

export default updateRefund

/*
mutation addFunds($listingID: String, $offerID: String) {
  addFunds(listingID: $listingID, offerID: $offerID)
}
{
  "listingID": "0",
  "offerID": "0"
}
*/
