import { get } from 'utils/ipfsHash'

import getOffer from './helpers/getOffer'

export default {
  events: async listing =>
    await listing.contract.eventCache.listings(listing.id),
  ipfs: async (listing, args, context) => {
    const events = await listing.contract.eventCache.listings(listing.id)
    if (events.length) {
      let ipfsHash
      events.forEach(e => {
        if (e.event === 'ListingCreated') {
          ipfsHash = e.returnValues.ipfsHash
        }
        if (e.event === 'ListingUpdated') {
          ipfsHash = e.returnValues.ipfsHash
        }
      })
      let data
      try {
        data = await get(context.contracts.ipfsGateway, ipfsHash)
      } catch (e) {
        return null
      }
      return { ...data, id: ipfsHash }
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
  },
  createdEvent: async listing => {
    const events = await listing.contract.eventCache.listings(
      listing.id,
      'ListingCreated'
    )
    return events[0]
  }
}
