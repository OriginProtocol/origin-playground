import { post } from 'utils/ipfsHash'
import txHelper, { checkMetaMask } from './_txHelper'

async function addFunds(_, data, context) {
  await checkMetaMask(context, data.from)
  const ipfsHash = await post(context.contracts.ipfsRPC, data)

  const tx = context.contracts.marketplaceExec.methods
    .addFunds(data.listingID, data.offerID, ipfsHash, data.amount)
    .send({
      gas: 4612388,
      from: data.from || web3.eth.defaultAccount,
      value: data.amount
    })
  return txHelper({
    tx,
    context,
    mutation: 'addFunds'
  })
}

export default addFunds

/*
mutation addFunds($listingID: String, $offerID: String) {
  addFunds(listingID: $listingID, offerID: $offerID)
}
{
  "listingID": "0",
  "offerID": "0"
}
*/
