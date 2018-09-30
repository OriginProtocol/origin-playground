import { post } from 'utils/ipfsHash'
import txHelper from './_txHelper'

async function updateListing(_, args, context) {
  const { listingID, data, from, autoApprove } = args
  const ipfsHash = await post(context.contracts.ipfsRPC, data)

  let updateListingCall
  const additionalDeposit = web3.utils.toWei(
    String(args.additionalDeposit),
    'ether'
  )

  if (autoApprove && additionalDeposit > 0) {
    const fnSig = web3.eth.abi.encodeFunctionSignature(
      'updateListingWithSender(address,uint256,bytes32,uint256)'
    )
    const params = web3.eth.abi.encodeParameters(
      ['uint256', 'bytes32', 'uint256'],
      [listingID, ipfsHash, additionalDeposit]
    )
    updateListingCall = context.contracts.ognExec.methods.approveAndCallWithSender(
      context.contracts.marketplace._address,
      additionalDeposit,
      fnSig,
      params
    )
  } else {
    updateListingCall = context.contracts.marketplaceExec.methods.updateListing(
      listingID,
      ipfsHash,
      additionalDeposit
    )
  }

  const tx = updateListingCall.send({
    gas: 4612388,
    from: from || web3.eth.defaultAccount
  })
  return txHelper({
    tx,
    context,
    mutation: 'updateListing'
  })
}

export default updateListing
