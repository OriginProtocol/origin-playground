export default async (contract, args) => {
  const offer = await contract.methods.offers(args.listingId, args.idx).call()
  let ipfsHash,
    status = offer.status,
    lastEvent

  const events = await contract.eventCache.offers(args.listingId, args.idx)

  events.forEach(e => {
    if (e.event === 'OfferCreated') {
      ipfsHash = e.returnValues.ipfsHash
    } else if (e.event === 'OfferUpdated') {
      ipfsHash = e.returnValues.ipfsHash
    }
    lastEvent = e.event
  })

  if (lastEvent === 'OfferFinalized') {
    status = 4
  } else if (lastEvent === 'OfferWithdrawn') {
    status = 0
  } else if (lastEvent === 'OfferRuling') {
    status = 5
  }

  return {
    id: args.idx,
    listingId: String(args.listingId),
    status,
    contract,
    value: offer.value,
    commission: offer.commission,
    refund: offer.refund,
    currency: offer.currency,
    finalizes: offer.finalizes,
    ipfs: { id: ipfsHash },
    buyer: { id: offer.buyer },
    affiliate: { id: offer.affiliate },
    arbitrator: { id: offer.arbitrator },
  }
}
