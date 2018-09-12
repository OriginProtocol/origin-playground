import { get } from 'utils/ipfsHash'

import getListing from './getListing'

export default {
  listing: offer => getListing(offer.contract, { idx: offer.listingId }),
  ipfs: offer =>
    new Promise(async (resolve, reject) => {
      const events = await offer.contract.getPastEvents('OfferCreated', {
        fromBlock: 0,
        filter: {
          listingID: String(offer.listingId),
          offerID: String(offer.id)
        }
      })
      if (!events.length) return resolve(null)

      const hash = events[0].returnValues.ipfsHash
      let data
      try {
        data = await get('http://localhost:5002', hash)
      } catch (e) {
        return reject(e)
      }
      resolve({ ...data, id: hash })
    })
}
