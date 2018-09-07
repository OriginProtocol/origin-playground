export default async (contract, args) => {
  const offer = await contract.methods.offers(args.listingId, args.idx).call()
  let ipfsHash
  const events = await contract.getPastEvents('OfferCreated', {
    fromBlock: 0,
    filter: { offerID: args.idx }
  })
  if (events.length) {
    ipfsHash = events[0].returnValues.ipfsHash
  }

  return {
    id: args.idx,
    ipfsHash,
    contract,
    value: offer.value,
    commission: offer.commission,
    refund: offer.refunt,
    currency: offer.currency,
    buyer: { id: offer.buyer },
    affiliate: { id: offer.affiliate },
    arbitrator: { id: offer.arbitrator },
    finalizes: offer.finalizes,
    status: offer.status
  }
}
