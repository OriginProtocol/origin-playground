export default async (contract, args) => {
  let listing
  try {
    listing = await contract.methods.listings(args.idx).call()
  } catch(e) {
    return null
  }
  let ipfsHash
  const events = await contract.eventCache.listings(args.idx, 'ListingCreated')
  if (events.length) {
    ipfsHash = events[0].returnValues.ipfsHash
  }

  return {
    id: String(args.idx),
    ipfs: { id: ipfsHash },
    deposit: listing.deposit,
    arbitrator: { id: listing.arbitrator },
    seller: { id: listing.seller },
    contract,
    status: 'active'
  }
}
