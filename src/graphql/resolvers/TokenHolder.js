export default {
  allowance: async (token, args, context) => {
    if (token.symbol === 'OGN') {
      let contract = args.contract
      if (contract === 'marketplace') {
        contract = localStorage.marketplaceContract
      }
      if (!context.contracts.ogn) return null
      const balance = await context.contracts.ogn.methods
        .allowance(token.account, contract)
        .call()
      return balance
    }
    return null
  }
}
