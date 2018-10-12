import contracts from '../contracts'
export default {
  id: contract => contract.id,
  address: contract => contract.id,
  name: async (contract) => {
    const Contract = contracts[contract.id]
    return await Contract.methods.name().call()
  },
  symbol: async (contract) => {
    const Contract = contracts[contract.id]
    return await Contract.methods.symbol().call()
  },
  decimals: async (contract) => {
    const Contract = contracts[contract.id]
    return await Contract.methods.decimals().call()
  },
  totalSupply: async (contract) => {
    const Contract = contracts[contract.id]
    return await Contract.methods.totalSupply().call()
  }
}
