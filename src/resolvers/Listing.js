import { get } from 'utils/ipfsHash'

import getOffer from './getOffer'

export default {
  ipfsHash: async listing => {
    const events = await listing.contract.getPastEvents('ListingCreated', {
      // fromBlock: 0,
      filter: { listingID: listing.id }
    })
    if (events.length) {
      return events[0].returnValues.ipfsHash
    }
  },
  ipfs: async listing => {
    const events = await listing.contract.getPastEvents('ListingCreated', {
      fromBlock: 0,
      filter: { listingID: String(listing.id) }
    })
    if (events.length) {
      const hash = events[0].returnValues.ipfsHash
      let data
      try {
        data = await get('http://localhost:5002', hash)
      } catch (e) {
        return null
      }
      return data
    }
  },
  totalOffers: listing => {
    return listing.contract.methods.totalOffers(listing.id).call()
  },
  getOffer: async (listing, args) => {
    const contract = listing.contract
    return await getOffer(contract, args)
  },
  offers: async listing => {
    if (!listing.contract) {
      return null
    }
    const totalOffers = await listing.contract.methods
      .totalOffers(listing.id)
      .call()

    const offers = []
    for (const id of Array.from({ length: Number(totalOffers) }, (v, i) => i)) {
      offers.push(
        await getOffer(listing.contract, { listingId: listing.id, idx: id })
      )
    }
    return offers
  }
}
