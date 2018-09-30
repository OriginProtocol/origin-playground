import txHelper from './_txHelper'

async function sendFromNode(_, { from, to, value }) {
  const tx = web3.eth.sendTransaction({
    from,
    to,
    value: web3.utils.toWei(value, 'ether'),
    gas: 4612388
  })
  return txHelper({
    tx,
    mutation: 'sendFromNode'
  })
}

export default sendFromNode
