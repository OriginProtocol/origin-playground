import balancesFromWei from 'utils/balancesFromWei'

async function sendFromNode(_, { from, to, value }, context) {
  return new Promise((resolve, reject) => {
    web3.eth
      .sendTransaction({
        from,
        to,
        value: web3.utils.toWei(value, 'ether'),
        gas: 4612388
      })
      .on('confirmation', async confirmations => {
        if (confirmations === 1) {
          const toBalance = await web3.eth.getBalance(to),
            fromBalance = await web3.eth.getBalance(from)
          resolve({
            toAccount: {
              id: to,
              balance: balancesFromWei(toBalance, context)
            },
            fromAccount: {
              id: from,
              balance: balancesFromWei(fromBalance, context)
            }
          })
        }
      })
      .catch(reject)
      .then(() => {
        // data.marketplace.allListings[listingIdx].status = 'pending'
        // client.writeQuery({ query, data })
      })
  })
}

export default sendFromNode
