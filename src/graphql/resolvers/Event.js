export default {
  block: event =>
    new Promise(async (resolve, reject) => {
      const id = event.blockNumber
      web3.eth
        .getBlock(id)
        .then(block => resolve({ ...block, id }))
        .catch(reject)
    })
}
