import balancesFromWei from 'utils/balancesFromWei'

export default {
  balance: async (contract, args, context) => {
    const wei = await web3.eth.getBalance(contract.id)
    return balancesFromWei(wei, context)
  },
  type: contract => {
    let types = {}
    try {
      types = JSON.parse(window.localStorage.contractTypes)
    } catch (e) {
      /* Ignore */
    }
    return types[contract.id]
  },
  name: contract => {
    let names = {}
    try {
      names = JSON.parse(window.localStorage.contractNames)
    } catch (e) {
      /* Ignore */
    }
    return names[contract.id]
  },
  token: async (contract, args, context) => {
    if (args.symbol === 'OGN') {
      const balance = await context.contracts.ogn.methods
        .balanceOf(contract.id)
        .call()
      return {
        id: `${args.symbol}_${contract.id}`,
        account: contract.id,
        symbol: args.symbol,
        balance
      }
    }
    return null
  }
}
