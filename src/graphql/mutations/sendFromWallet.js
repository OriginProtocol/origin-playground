import txHelper from './_txHelper'

async function sendFromWallet(_, { from, to, value }) {
  return txHelper({
    tx: web3.eth.sendTransaction({ from, to, value, gas: 4612388 }),
    mutation: 'sendFromWallet'
  })
}

export default sendFromWallet
