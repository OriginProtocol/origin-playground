export default async (contract, args) => {
  const offer = await contract.methods.offers(args.listingId, args.idx).call()
  let ipfsHash,
    status = offer.status,
    lastEvent

  var listingTopic = web3.utils.padLeft(web3.utils.numberToHex(args.listingId), 64)
  var offerTopic = web3.utils.padLeft(web3.utils.numberToHex(args.idx), 64)
  var events = await contract.getPastEvents('allEvents', {
    topics: [null, null, listingTopic, offerTopic],
    fromBlock: 0
  })

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
    status
  }
}
