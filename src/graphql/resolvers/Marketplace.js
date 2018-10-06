import getListing from './helpers/getListing'
import offerFields from './helpers/offerFields'

export default {
  address: contract => {
    if (!contract) {
      return null
    }
    return contract._address
  },
  totalListings: contract => {
    if (!contract) {
      return null
    }
    return contract.methods.totalListings().call()
  },
  getListing,
  allListings: async (contract, { limit = 10, offset = 0 }) => {
    if (!contract) {
      return null
    }
    const totalListings = await contract.methods.totalListings().call()
    const ids = Array.from({ length: Number(totalListings) }, (v, i) => i)
      .reverse()
      .slice(offset, offset + limit)
    return Promise.all(ids.map(idx => getListing(contract, { idx })))
  },
  getOffer: async (contract, args) => {
    if (!contract) {
      return null
    }
    const offer = await contract.methods.offers(args.listingId, args.idx).call()
    return {
      id: args.idx,
      listingId: args.listingId,
      ...offerFields(offer),
      contract
    }
  },
  account: contract => {
    if (!contract) {
      return null
    }
    return { id: contract._address }
  },
  token: async contract => {
    if (!contract) {
      return null
    }
    return { id: await contract.methods.tokenAddr().call() }
  },
  owner: async contract => {
    if (!contract) {
      return null
    }
    return { id: await contract.methods.owner().call() }
  }
}
