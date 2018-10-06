import txHelper, { checkMetaMask } from './_txHelper'

async function sendFromWallet(_, { from, to, value }, context) {
  await checkMetaMask(context, from)
  const web3 = context.contracts.web3Exec
  return txHelper({
    tx: web3.eth.sendTransaction({ from, to, value, gas: 4612388 }),
    mutation: 'sendFromWallet'
  })
}

export default sendFromWallet
