import startCase from 'lodash/startCase'
import { get } from 'utils/ipfsHash'
import contracts from '../contracts'

import getOffer from './helpers/getOffer'

export default {
  events: async listing =>
    await listing.contract.eventCache.listings(listing.id),
  totalEvents: async listing =>
    (await listing.contract.eventCache.listings(listing.id)).length,
  ipfs: async (listing) => {
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
        data = await get(contracts.ipfsGateway, ipfsHash)
      } catch (e) {
        return null
      }
      if (data.category) {
        data.categoryStr = startCase(data.category.replace(/^schema\./, ''))
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
        await getOffer(listing.contract, { listingId: listing.id, id })
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
