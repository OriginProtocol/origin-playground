import getListing from './getListing'
import offerFields from './offerFields'

export default {
  address: contract => contract._address,
  totalListings: contract => {
    if (!contract) { return null; }
    return contract.methods.totalListings().call()
  },
  getListing,
  allListings: async (contract, { limit = 10 }) => {
    if (!contract) { return null; }
    const totalListings = await contract.methods.totalListings().call()
    const listings = []
    for (const id of Array.from(
      { length: Number(totalListings) },
      (v, i) => i
    )) {
      listings.push(await getListing(contract, { idx: id }))
    }
    return listings.reverse().slice(0, limit)
  },
  getOffer: async (contract, args) => {
    const offer = await contract.methods
      .offers(args.listingId, args.idx)
      .call()
    return {
      id: args.idx,
      listingId: args.listingId,
      ...offerFields(offer),
      contract
    }
  }
}
