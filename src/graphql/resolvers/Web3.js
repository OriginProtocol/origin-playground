export default {
  networkId: () => web3.eth.net.getId(),
  nodeAccounts: async () => (await web3.eth.getAccounts()).map(id => ({ id })),
  nodeAccount: (_, args) => ({ id: args.id }),
  nodeAccountAt: async (_, args) => {
    const accounts = await web3.eth.getAccounts()
    return { id: accounts[args.idx] }
  },
  accounts: async () => {
    const accounts = []
    for (let i = 0; i < web3.eth.accounts.wallet.length; i++) {
      accounts.push({ id: web3.eth.accounts.wallet[i].address })
    }
    return accounts
  },
  account: (_, args) => ({ id: args.id }),
  defaultAccount: () =>
    web3.eth.defaultAccount ? { id: web3.eth.defaultAccount } : null
}
