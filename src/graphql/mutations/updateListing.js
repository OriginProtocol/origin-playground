import { post } from 'utils/ipfsHash'

import getListing from '../resolvers/helpers/getListing'

function updateRefund(
  _,
  { listingID, additionalDeposit, data, from, autoApprove },
  context
) {
  return new Promise(async (resolve, reject) => {
    const ipfsHash = await post(context.contracts.ipfsRPC, data)

    let updateListingCall

    if (autoApprove && additionalDeposit > 0) {
      const fnSig = web3.eth.abi.encodeFunctionSignature(
        'updateListingWithSender(address,uint256,bytes32,uint256)'
      )
      const params = web3.eth.abi.encodeParameters(
        ['uint256', 'bytes32', 'uint256'],
        [listingID, ipfsHash, additionalDeposit]
      )
      updateListingCall = context.contracts.ogn.methods.approveAndCallWithSender(
        context.contracts.marketplace._address,
        additionalDeposit,
        fnSig,
        params
      )
    } else {
      updateListingCall = context.contracts.marketplace.methods.updateListing(
        listingID,
        ipfsHash,
        additionalDeposit
      )
    }

    updateListingCall
      .send({
        gas: 4612388,
        from: from || web3.eth.defaultAccount
      })
      .on('receipt', receipt => {
        context.contracts.marketplace.eventCache.updateBlock(
          receipt.blockNumber
        )
      })
      .on('confirmation', async confirmations => {
        if (confirmations === 1) {
          resolve(
            getListing(context.contracts.marketplace, {
              idx: data.listingID
            })
          )
        }
      })
      .catch(reject)
      .then(() => {})
  })
}

export default updateRefund
