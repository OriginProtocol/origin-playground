import { get } from 'utils/ipfsHash'

import getListing from './getListing'

export default {
  listing: offer => getListing(offer.contract, { idx: offer.listingId }),
  ipfsHash: async offer => {
    const events = await offer.contract.getPastEvents('OfferCreated', {
      fromBlock: 0,
      filter: { listingID: String(offer.listingId), offerID: String(offer.id) }
    })
    if (events.length) {
      return events[0].returnValues.ipfsHash
    }
  },
  ipfs: async offer => {
    const events = await offer.contract.getPastEvents('OfferCreated', {
      fromBlock: 0,
      filter: { listingID: String(offer.listingId), offerID: String(offer.id) }
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
  }
}
