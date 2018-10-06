import { post } from 'utils/ipfsHash'
import txHelper, { checkMetaMask } from './_txHelper'

async function finalizeOffer(_, data, context) {
  await checkMetaMask(context, data.from)
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
