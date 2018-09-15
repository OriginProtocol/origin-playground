export default async (contract, args) => {
  const offer = await contract.methods.offers(args.listingId, args.idx).call()
  let ipfsHash,
    status = offer.status,
    lastEvent,
    withdrawnBy

  const events = await contract.eventCache.offers(args.listingId, args.idx)

  events.forEach(e => {
    if (e.event === 'OfferCreated') {
      ipfsHash = e.returnValues.ipfsHash
    } else if (e.event === 'OfferUpdated') {
      ipfsHash = e.returnValues.ipfsHash
    }
    lastEvent = e
  })

  if (lastEvent.event === 'OfferFinalized') {
    status = 4
  } else if (lastEvent.event === 'OfferWithdrawn') {
    status = 0
    withdrawnBy = { id: lastEvent.returnValues.party }
  } else if (lastEvent.event === 'OfferRuling') {
    status = 5
  }

  return {
    id: args.idx,
    listingId: String(args.listingId),
    status,
    contract,
    withdrawnBy,
    value: offer.value,
    commission: offer.commission,
    refund: offer.refund,
    currency: offer.currency,
    finalizes: offer.finalizes,
    ipfs: { id: ipfsHash },
    buyer: { id: offer.buyer },
    affiliate: { id: offer.affiliate },
    arbitrator: { id: offer.arbitrator }
  }
}
