import pubsub from '../pubsub'

export async function checkMetaMask(context, from) {
  if (context.contracts.metaMask) {
    const net = await web3.eth.net.getId()
    const mmNet = await context.contracts.metaMask.eth.net.getId()
    if (net !== mmNet) {
      throw(new Error(`MetaMask is not on network ${net}`))
    }
    const mmAccount = await context.contracts.metaMask.eth.getAccounts()
    if (!mmAccount || mmAccount[0] !== from) {
      throw(new Error(`MetaMask is not set to account ${from}`))
    }
  }
}

export default function txHelper({
  tx,
  mutation,
  onConfirmation,
  onReceipt,
  context
}) {
  return new Promise((resolve, reject) => {
    tx.once('transactionHash', hash => {
      resolve({ id: hash })
      pubsub.publish('TRANSACTION_UPDATED', {
        transactionUpdated: {
          id: hash,
          status: 'pending',
          mutation
        }
      })
    })
      .once('receipt', receipt => {
        if (context) {
          context.contracts.marketplace.eventCache.updateBlock(
            receipt.blockNumber
          )
        }
        if (onReceipt) {
          onReceipt(receipt)
        }
        pubsub.publish('TRANSACTION_UPDATED', {
          transactionUpdated: {
            id: receipt.transactionHash,
            status: 'receipt',
            mutation
          }
        })
      })
      .on('confirmation', function(confNumber, receipt) {
        if (context) {
          context.contracts.marketplace.eventCache.updateBlock(
            receipt.blockNumber
          )
        }
        if (confNumber === 1 && onConfirmation) {
          onConfirmation(receipt)
        }
        if (confNumber > 0) {
          pubsub.publish('TRANSACTION_UPDATED', {
            transactionUpdated: {
              id: receipt.transactionHash,
              status: 'confirmed',
              mutation,
              confirmations: confNumber
            }
          })
        }
      })
      .on('error', function(err) {
        console.log('TX error')
        console.log(err)
      })
      .catch(reject)
  })
}
