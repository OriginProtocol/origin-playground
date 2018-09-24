import { post } from 'utils/ipfsHash'
import txHelper from './_txHelper'

async function finalizeOffer(_, data, context) {
  const ipfsHash = await post(context.contracts.ipfsRPC, data)
  const tx = context.contracts.marketplaceExec.methods
    .finalize(data.listingID, data.offerID, ipfsHash)
    .send({
      gas: 4612388,
      from: data.from || web3.eth.defaultAccount
    })
  return txHelper({
    tx,
    context,
    mutation: 'finalizeOffer'
  })
}

export default finalizeOffer

/*
mutation finalizeOffer($listingID: String, $offerID: String) {
  finalizeOffer(listingID: $listingID, offerID: $offerID)
}
{
  "listingID": "0",
  "offerID": "0"
}
*/
