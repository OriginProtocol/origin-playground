import balancesFromWei from 'utils/balancesFromWei'

export default (_, { address }, context) => {
  web3.eth.defaultAccount = window.localStorage.defaultAccount = address
  return {
    id: address,
    balance: balancesFromWei(address, context)
  }
}
