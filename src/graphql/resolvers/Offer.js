import { get } from 'utils/ipfsHash'

import getListing from './helpers/getListing'

export default {
  listing: offer => getListing(offer.contract, { idx: offer.listingId }),
  ipfs: (offer, args, context) =>
    new Promise(async (resolve, reject) => {
      const events = await offer.contract.eventCache.offers(
        offer.listingId,
        offer.id,
        'OfferCreated'
      )
      if (!events.length) return resolve(null)

      const hash = events[0].returnValues.ipfsHash
      let data
      try {
        data = await get(context.contracts.ipfsGateway, hash)
      } catch (e) {
        return reject(e)
      }
      resolve({ ...data, id: hash })
    })
}
