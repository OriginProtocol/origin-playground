import txHelper from './_txHelper'
async function transferToken(_, { token, from, to, value }, context) {
  const contract = context.contracts[token]
  if (!contract) {
    console.log(token, 'not found')
    return
  }
  value = web3.utils.toWei(value, 'ether')
  const tx = contract.methods.transfer(to, value).send({ gas: 4612388, from })
  return txHelper({ tx, mutation: 'transferToken' })
}

export default transferToken

/*
mutation transferToken($token: String!, $from: String!, $to: String!, $value: String!) {
  transferToken(token: $token, from: $from, to: $to, value: $value)
}
{
  "token": "ogn",
  "from": "0x0CdaA819eB0BC9649591eeB1D7B0b4255C06EFD2",
  "to": "0xD7ebe7707b5160DD211F4206ffca1f3169f2E376",
  "value": "1"
}
*/
