import { post } from 'utils/ipfsHash'
import txHelper from './_txHelper'

/*
mutation createListing($deposit: String, $arbitrator: String) {
  createListing(deposit: $deposit, arbitrator: $arbitrator)
}
{ "deposit": "0", "arbitrator": "0xBECf244F615D69AaE9648E4bB3f32161A87caFF1" }
*/

async function createListing(_, input, context) {
  const { deposit, arbitrator, data, from, autoApprove } = input
  const ipfsHash = await post(context.contracts.ipfsRPC, data)

  let createListingCall

  if (autoApprove) {
    const fnSig = web3.eth.abi.encodeFunctionSignature(
      'createListingWithSender(address,bytes32,uint256,address)'
    )
    const params = web3.eth.abi.encodeParameters(
      ['bytes32', 'uint', 'address'],
      [ipfsHash, deposit, arbitrator]
    )
    createListingCall = context.contracts.ognExec.methods.approveAndCallWithSender(
      context.contracts.marketplace._address,
      deposit,
      fnSig,
      params
    )
  } else {
    createListingCall = context.contracts.marketplaceExec.methods.createListing(
      ipfsHash,
      deposit,
      arbitrator
    )
  }

  return txHelper({
    tx: createListingCall.send({
      gas: 4612388,
      from: from || web3.eth.defaultAccount
    }),
    context,
    mutation: 'createListing'
  })

  //
  //
  // return new Promise(async (resolve, reject) => {
  //     .once('transactionHash', hash => {
  //       addTransaction(hash)
  //       resolve(hash)
  //       pubsub.publish('TRANSACTION_UPDATED', {
  //         transactionUpdated: { id: hash, status: 'pending' }
  //       })
  //     })
  //     .once('receipt', receipt => {
  //       // updateTransactionStatus(receipt.transactionHash, 'Receipt')
  //       context.contracts.marketplace.eventCache.updateBlock(
  //         receipt.blockNumber
  //       )
  //       pubsub.publish('TRANSACTION_UPDATED', {
  //         transactionUpdated: { id: receipt.transactionHash, status: 'receipt' }
  //       })
  //       // resolve()
  //     })
  //     .on('confirmation', function(confNumber, receipt) {
  //       if (confNumber === 1) {
  //         pubsub.publish('TRANSACTION_UPDATED', {
  //           transactionUpdated: {
  //             id: receipt.transactionHash,
  //             status: 'confirmed'
  //           }
  //         })
  //       }
  //       if (confNumber > 0 && confNumber < 4) {
  //         // updateTransactionStatus(
  //         //   receipt.transactionHash,
  //         //   `Confirmed ${confNumber} times`
  //         // )
  //       }
  //     })
  //     .catch(reject)
  //     .then(() => {})
  // })
}

export default createListing
