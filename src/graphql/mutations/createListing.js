import { post } from 'utils/ipfsHash'
import txHelper, { checkMetaMask } from './_txHelper'

async function createListing(_, input, context) {
  const { arbitrator, data, from, autoApprove } = input
  await checkMetaMask(context, from)
  const ipfsHash = await post(context.contracts.ipfsRPC, data)

  let createListingCall
  const deposit = web3.utils.toWei(String(input.deposit), 'ether')

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
}

export default createListing

/*
mutation createListing($deposit: String, $arbitrator: String) {
  createListing(deposit: $deposit, arbitrator: $arbitrator)
}
{ "deposit": "0", "arbitrator": "0xBECf244F615D69AaE9648E4bB3f32161A87caFF1" }
*/
