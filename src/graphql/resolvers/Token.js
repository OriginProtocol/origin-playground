export default {
  id: contract => contract.id,
  address: contract => contract.id,
  name: async (contract, args, context) => {
    const Contract = context.contracts[contract.id]
    return await Contract.methods.name().call()
  },
  symbol: async (contract, args, context) => {
    const Contract = context.contracts[contract.id]
    return await Contract.methods.symbol().call()
  },
  decimals: async (contract, args, context) => {
    const Contract = context.contracts[contract.id]
    return await Contract.methods.decimals().call()
  },
  totalSupply: async (contract, args, context) => {
    const Contract = context.contracts[contract.id]
    return await Contract.methods.totalSupply().call()
  }
}
