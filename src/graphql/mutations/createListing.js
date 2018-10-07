import { post } from 'utils/ipfsHash'
import txHelper, { checkMetaMask } from './_txHelper'
import validator from '../validator'

async function createListing(_, input, context) {
  const { arbitrator, data, from, autoApprove } = input
  await checkMetaMask(context, from)

  const ipfsData = {
    "schemaId": "http://schema.originprotocol.com/listing_v1.0.0",
    "listingType": "unit",
    "category": "schema.forSale",
    "subCategory": "schema.forSale.mushrooms",
    "language": "en-US",
    "title": data.title,
    "description": "description",
    "expiry": "1996-12-19T16:39:57-08:00",
    "media": [],
    "unitsTotal": 1,
    "price": data.price,
    "commission": {
      "currency": "OGN",
      "amount": "0"
    }
  }

  validator('http://schema.originprotocol.com/listing_v1.0.0', ipfsData)

  const ipfsHash = await post(context.contracts.ipfsRPC, ipfsData)

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
