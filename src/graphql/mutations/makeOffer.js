import { post } from 'utils/ipfsHash'
import txHelper, { checkMetaMask } from './_txHelper'

async function makeOffer(_, data, context) {
  await checkMetaMask(context, data.from)
  const buyer = data.from || web3.eth.defaultAccount
  const ipfsHash = await post(context.contracts.ipfsRPC, { ...data, buyer })

  const args = [
    data.listingID,
    ipfsHash,
    data.finalizes,
    data.affiliate,
    web3.utils.toWei(data.commission, 'ether'),
    data.value,
    data.currency,
    data.arbitrator
  ]
  if (data.withdraw) {
    args.push(data.withdraw)
  }

  const tx = context.contracts.marketplaceExec.methods.makeOffer(...args).send({
    gas: 4612388,
    from: buyer,
    value: data.value
  })
  return txHelper({
    tx,
    context,
    mutation: 'makeOffer'
  })

  // return new Promise(async (resolve, reject) => {
  //     .on('receipt', receipt => {
  //       context.contracts.marketplace.eventCache.updateBlock(
  //         receipt.blockNumber
  //       )
  //       resolve(
  //         getOffer(context.contracts.marketplace, {
  //           listingId: data.listingID,
  //           idx: receipt.events.OfferCreated.returnValues.offerID
  //         })
  //       )
  //     })
  //     .on('confirmation', async (confirmations, receipt) => {
  //       // if (confirmations === 1) {
  //       //   resolve(
  //       //     getOffer(context.contracts.marketplace, {
  //       //       listingId: data.listingID,
  //       //       idx: receipt.events.OfferCreated.returnValues.offerID
  //       //     })
  //       //   )
  //       // }
  //     })
  //     .catch(reject)
  //     .then(() => {})
  // })
}

export default makeOffer

/*
mutation makeOffer(
  $listingID: String,
  $finalizes: String,
  $affiliate: String,
  $commission: String,
  $value: String,
  $currency: String,
  $arbitrator: String
) {
  makeOffer(
    listingID: $listingID,
    finalizes: $finalizes,
    affiliate: $affiliate,
    commission: $commission,
    value: $value,
    currency: $currency,
    arbitrator: $arbitrator
  )
}
{
  "listingID": "0",
  "finalizes": "1536300000",
  "affiliate": "0x7c38A2934323aAa8dAda876Cfc147C8af40F8D0e",
  "commission": "0",
  "value": "100000000000000000",
  "currency": "0x0000000000000000000000000000000000000000",
  "arbitrator": "0x7c38A2934323aAa8dAda876Cfc147C8af40F8D0e"
}
*/
