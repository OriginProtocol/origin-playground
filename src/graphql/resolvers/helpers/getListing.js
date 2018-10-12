export default async (contract, args) => {
  let listing,
    seller,
    ipfsHash,
    status = 'active'
  try {
    listing = await contract.methods.listings(args.id).call()
  } catch (e) {
    return null
  }

  const events = await contract.eventCache.listings(args.id)

  events.forEach(e => {
    if (e.event === 'ListingCreated') {
      ipfsHash = e.returnValues.ipfsHash
      seller = e.returnValues.party
    }
    if (e.event === 'ListingUpdated') {
      ipfsHash = e.returnValues.ipfsHash
    }
    if (e.event === 'ListingWithdrawn') {
      status = 'withdrawn'
    }
    if (e.event === 'OfferFinalized') {
      status = 'sold'
    }
    if (e.event === 'OfferRuling') {
      status = 'sold'
    }
  })

  return {
    id: args.id,
    ipfs: ipfsHash ? { id: ipfsHash } : null,
    deposit: listing.deposit,
    arbitrator: listing.depositManager ? { id: listing.depositManager } : null,
    seller: seller ? { id: seller } : null,
    contract,
    status,
    events
  }
}
