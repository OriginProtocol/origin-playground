
export default async (contract, args) => {
  const listing = await contract.methods.listings(args.idx).call()
  let ipfsHash
  const events = await contract.getPastEvents('ListingCreated', {
    fromBlock: 0,
    filter: { listingID: args.idx }
  })
  if (events.length) {
    ipfsHash = events[0].returnValues.ipfsHash
  }

  return {
    id: args.idx,
    ipfsHash,
    deposit: listing.deposit,
    arbitrator: { id: listing.arbitrator },
    seller: { id: listing.seller },
    contract,
    status: 'active'
  }
}
