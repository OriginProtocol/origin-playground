import contracts from '../contracts'

export default {
  networkId: () => web3.eth.net.getId(),
  nodeAccounts: () => new Promise((resolve) => {
    web3.eth.getAccounts().then(accts => resolve(accts.map(id => ({ id }))))
    .catch(() => resolve([]))
  }),
  nodeAccount: (_, args) => ({ id: args.id }),
  accounts: async () => {
    const accounts = []
    for (let i = 0; i < web3.eth.accounts.wallet.length; i++) {
      accounts.push({ id: web3.eth.accounts.wallet[i].address })
    }
    return accounts
  },
  account: (_, args) => ({ id: args.id }),
  defaultAccount: () =>
    web3.eth.defaultAccount ? { id: web3.eth.defaultAccount } : null,
  transaction: async (_, args) => {
    let status = 'submitted'
    let transaction = await web3.eth.getTransaction(args.id)
    return {
      id: args.id,
      status,
      ...transaction
    }
  },
  metaMaskAvailable: () => contracts.metaMask ? true : false,
  metaMaskEnabled: () => contracts.metaMaskEnabled,
  metaMaskAccount: async () => {
    if (!contracts.metaMask) return null
    const accounts = await contracts.metaMask.eth.getAccounts()
    return { id: accounts[0] }
  }
}
