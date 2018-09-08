import balancesFromWei from 'utils/balancesFromWei'

export default (_, args, context) => {
  const existing = Object.keys(web3.eth.accounts.wallet)
    .filter(k => k.match(/^[0-9]$/))
    .map(idx => web3.eth.accounts.wallet[idx].address)

  const wallet = web3.eth.accounts.wallet.create(1)
  const id = Object.keys(web3.eth.accounts.wallet)
    .filter(k => k.match(/^[0-9]$/))
    .map(idx => web3.eth.accounts.wallet[idx].address)
    .find(id => existing.indexOf(id) < 0)

  let privateKeys = [], roles = {}
  try {
    privateKeys = JSON.parse(window.localStorage.privateKeys)
  } catch (e) {
    /* Ignore */
  }
  try {
    roles = JSON.parse(window.localStorage.accountRoles)
  } catch (e) {
    /* Ignore */
  }
  window.localStorage.privateKeys = JSON.stringify([
    ...privateKeys,
    wallet[id].privateKey
  ])
  window.localStorage.accountRoles = JSON.stringify({
    ...roles, [id]: args.role
  })
  web3.eth.defaultAccount = window.localStorage.defaultAccount = id
  return {
    id,
    role: args.role,
    balance: balancesFromWei(id, context)
  }
}
