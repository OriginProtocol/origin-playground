import helper from '../test/_helper'

;(async () => {
  var { accounts, web3, deploy, server } = await helper(
    `${__dirname}/identity/`,
    'https://rinkeby.infura.io'
    // 'http://localhost:8545'
  )

  var account = web3.eth.accounts.wallet.add(
    '0xPRIV_KEY'
  )

  await deploy('ClaimHolder', { from: account, log: true })

  if (server) {
    server.close()
  }
})()
