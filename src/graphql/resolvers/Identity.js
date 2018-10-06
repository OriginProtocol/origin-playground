import { get } from 'utils/ipfsHash'

export default {
  claims: (identity, args, context) =>
    new Promise(async resolve => {

      const contract = context.contracts.claimHolderRegistered
      contract.options.address = identity.id

      const claims = await contract.getPastEvents('ClaimAdded', {
        fromBlock: context.contracts.EventBlock
      })

      resolve(
        claims.map(c => {
          const {
            claimId,
            data,
            issuer,
            scheme,
            signature,
            topic,
            uri
          } = c.returnValues

          return {
            id: claimId,
            data,
            issuer,
            scheme,
            signature,
            topic,
            uri
          }
        })
      )
    }),
  profile: async function(identity, args, context) {
    if (identity.id.indexOf('0x0000') === 0) return null

    const contract = context.contracts.claimHolderRegistered
    contract.options.address = identity.id

    const claims = await contract.getPastEvents('ClaimAdded', {
      fromBlock: context.contracts.EventBlock,
      filter: { topic: '13'}
    })

    if (!claims.length) { return null }

    const claim = claims[claims.length - 1]
    const ipfsHash = claim.returnValues.data

    let data
    try {
      data = await get(context.contracts.ipfsGateway, ipfsHash)
    } catch (e) {
      return null
    }
    return { ...data, id: ipfsHash }
  }
}
