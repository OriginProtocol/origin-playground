import { post } from 'utils/ipfsHash'

import getListing from '../resolvers/getListing'

/*
mutation createListing($deposit: String, $arbitrator: String) {
  createListing(deposit: $deposit, arbitrator: $arbitrator)
}
{ "deposit": "0", "arbitrator": "0xBECf244F615D69AaE9648E4bB3f32161A87caFF1" }
*/

async function createListing(_, { deposit, arbitrator, data }, context) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, data)

    context.contracts.marketplace.methods
      .createListing(ipfsHash, deposit, arbitrator)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })
      .on('confirmation', (confirmations, receipt) => {
        if (confirmations === 1) {
          resolve(
            getListing(
              context.contracts.marketplace,
              { idx: receipt.events.ListingCreated.returnValues.listingID }
            )
          )
        }
      })
      .on('error', reject)
      .then(() => {})
  })
}

export default createListing
