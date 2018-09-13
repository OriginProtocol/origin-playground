/*
mutation updateTokenAllowance($token: String!, $from: String!, $to: String!, $value: String!) {
  updateTokenAllowance(token: $token, from: $from, to: $to, value: $value)
}
{
  "token": "ogn",
  "from": "0x0CdaA819eB0BC9649591eeB1D7B0b4255C06EFD2",
  "to": "0xD7ebe7707b5160DD211F4206ffca1f3169f2E376",
  "value": "1"
}
*/
async function updateTokenAllowance(_, { token, from, to, value }, context) {
  return new Promise((resolve, reject) => {
    if (!context.contracts[token]) {
      return
    }
    context.contracts[token].methods
      .approve(to, value)
      .send({
        gas: 4612388,
        from
      })
      .on('receipt', async () => {
        resolve(true)
      })
      .catch(reject)
      .then(() => {
        // data.marketplace.allListings[listingIdx].status = 'pending'
        // client.writeQuery({ query, data })
      })
  })
}

export default updateTokenAllowance
