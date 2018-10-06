import { post } from 'utils/ipfsHash'
import txHelper, { checkMetaMask } from './_txHelper'

async function acceptOffer(_, data, context) {
  await checkMetaMask(context, data.from)
  const ipfsHash = await post(context.contracts.ipfsRPC, data)
  const tx = context.contracts.marketplaceExec.methods
    .acceptOffer(data.listingID, data.offerID, ipfsHash)
    .send({
      gas: 4612388,
      from: data.from || web3.eth.defaultAccount
    })
  return txHelper({
    tx,
    context,
    mutation: 'acceptOffer'
  })
}

export default acceptOffer

/*
mutation makeOffer($listingID: String, $offerID: String) {
  acceptOffer(listingID: $listingID, offerID: $offerID)
}
{
  "listingID": "0",
  "offerID": "0"
}
*/
