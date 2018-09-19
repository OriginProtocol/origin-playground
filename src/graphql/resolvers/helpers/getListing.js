export default async (contract, args) => {
  let listing,
    seller,
    ipfsHash,
    status = 'active'
  try {
    listing = await contract.methods.listings(args.idx).call()
  } catch (e) {
    return null
  }

  const events = await contract.eventCache.listings(args.idx)

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
  })

  return {
    id: String(args.idx),
    ipfs: { id: ipfsHash },
    deposit: listing.deposit,
    arbitrator: { id: listing.arbitrator },
    seller: { id: seller },
    contract,
    status,
    events
  }
}
