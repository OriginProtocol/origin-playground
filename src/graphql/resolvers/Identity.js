import { get } from 'utils/ipfsHash'

export default {
  ipfs: offer =>
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
        data = await get('http://localhost:5002', hash)
      } catch (e) {
        return reject(e)
      }
      resolve({ ...data, id: hash })
    })
}
