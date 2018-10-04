export default function eventCache(contract, fromBlock = 0) {
  let events = [],
    toBlock = 0,
    lastLookup = 0
  try {
    ({ events, toBlock, lastLookup } = JSON.parse(window.localStorage.eventCache))
  } catch(e) { /* Ignore */ }

  function updateBlock(block) {
    toBlock = block
  }

  async function getPastEvents() {
    if (lastLookup && lastLookup === toBlock) {
      return
    }
    if (!toBlock) {
      toBlock = await web3.eth.getBlockNumber()
    }
    lastLookup = toBlock
    const newEvents = await contract.getPastEvents('allEvents', {
      fromBlock,
      toBlock
    })

    events = [
      ...events,
      ...newEvents.map(e => ({ ...e, block: { id: e.blockNumber } }))
    ]
    window.localStorage.eventCache = JSON.stringify({
      toBlock,
      lastLookup,
      events
    })
    fromBlock = toBlock + 1
  }

  async function listings(listingId, eventName) {
    await getPastEvents()
    var listingTopic = web3.utils.padLeft(web3.utils.numberToHex(listingId), 64)
    return events.filter(e => {
      const topics = e.raw.topics
      return (
        topics[2] === listingTopic && (eventName ? e.event === eventName : true)
      )
    })
  }

  async function offers(listingId, offerId, eventName) {
    await getPastEvents()
    var listingTopic = web3.utils.padLeft(web3.utils.numberToHex(listingId), 64)
    var offerTopic = web3.utils.padLeft(web3.utils.numberToHex(offerId), 64)
    return events.filter(e => {
      const topics = e.raw.topics
      return (
        topics[2] === listingTopic &&
        topics[3] === offerTopic &&
        (eventName ? e.event === eventName : true)
      )
    })
  }

  return { listings, offers, updateBlock }
}
