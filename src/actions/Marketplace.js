import Marketplace from '../contracts/Marketplace'
import Arbitrator from '../contracts/CentralizedArbitrator'
import OriginArbitrator from '../contracts/OriginArbitrator'

import { sendTransaction } from './helpers'
import { generateConstants } from 'utils/generateConstants'
import { get, post, postEnc } from 'utils/ipfsHash'

export const MarketplaceConstants = generateConstants('MARKETPLACE', {
  successError: [
    'GET_TOTAL_LISTINGS',
    'GET_ALL_LISTINGS',
    'GET_LISTING',
    'GET_OFFER',
    'GET_OFFERS',
    'GET_EVENTS',
    'GET_ARBITRATOR'
  ],
  chain: [
    'DEPLOY',
    'DEPLOY_ARBITRATOR',
    'DEPLOY_ORIGIN_ARBITRATOR',
    'CREATE_LISTING',
    'UPDATE_LISTING',
    'WITHDRAW_LISTING',
    'ARBITRATE_LISTING',
    'MAKE_OFFER',
    'FINALIZE_OFFER',
    'DISPUTE_OFFER',
    'DISPUTE_RULING',
    'UPDATE_REFUND',
    'ACCEPT_OFFER',
    'WITHDRAW_OFFER',
    'ADD_DATA',
  ]
})

export function deployMarketplaceContract(...args) {
  return async function(dispatch) {
    var Contract = new web3.eth.Contract(Marketplace.abi)
    var tx = Contract.deploy({
      data: '0x' + Marketplace.data,
      arguments: [...args]
    }).send({ gas: 4612388, from: web3.eth.defaultAccount })

    var data = {}

    dispatch(sendTransaction(tx, MarketplaceConstants.DEPLOY, data))
  }
}

export function deployArbitratorContract(...args) {
  return async function(dispatch) {
    var Contract = new web3.eth.Contract(Arbitrator.abi)
    var tx = Contract.deploy({
      data: '0x' + Arbitrator.data,
      arguments: [...args]
    }).send({ gas: 4612388, from: web3.eth.defaultAccount })

    var data = {}

    dispatch(sendTransaction(tx, MarketplaceConstants.DEPLOY_ARBITRATOR, data))
  }
}

export function deployOriginArbitratorContract(...args) {
  return async function(dispatch) {
    var Contract = new web3.eth.Contract(OriginArbitrator.abi)
    var tx = Contract.deploy({
      data: '0x' + OriginArbitrator.data,
      arguments: [...args]
    }).send({ gas: 4612388, from: web3.eth.defaultAccount })

    var data = {}

    dispatch(
      sendTransaction(tx, MarketplaceConstants.DEPLOY_ORIGIN_ARBITRATOR, data)
    )
  }
}

export function getArbitrator() {
  return async function(dispatch, getState) {
    var state = getState(),
      arbitratorAddress = state.marketplace.arbitratorAddress
    if (!arbitratorAddress) {
      return
    }
    var ArbitratorContract = new web3.eth.Contract(
      Arbitrator.abi,
      arbitratorAddress
    )
    var arbitrator = await ArbitratorContract.methods.owner().call()

    dispatch({
      type: MarketplaceConstants.GET_ARBITRATOR_SUCCESS,
      arbitrator
    })
  }
}

export function createListing(json) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var ipfsHash = await post(state.network.ipfsRPC, json.ipfs)

    const Contract = new web3.eth.Contract(Marketplace.abi, address)

    var tx = Contract.methods
      .createListing(ipfsHash, json.deposit, json.arbitrator || '0x0')
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    var data = {}

    dispatch(
      sendTransaction(tx, MarketplaceConstants.CREATE_LISTING, data, () => {
        dispatch(getAllListings())
      })
    )
  }
}

export function addData(json, listingID, offerID) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress,
      tx

    if (!address) {
      return
    }

    var ipfsHash = await post(state.network.ipfsRPC, json)

    const Contract = new web3.eth.Contract(Marketplace.abi, address)

    if (offerID !== undefined) {
      tx = Contract.methods
        .addData(listingID, offerID, ipfsHash)
        .send({ gas: 4612388, from: web3.eth.defaultAccount })
    } else {
      tx = Contract.methods
        .addData(listingID, ipfsHash)
        .send({ gas: 4612388, from: web3.eth.defaultAccount })
    }

    var data = { listingID, offerID, json }

    dispatch(
      sendTransaction(tx, MarketplaceConstants.ADD_DATA, data, () => {
        dispatch(getEvents(listingID))
      })
    )
  }
}

export function updateListing(listingId, json) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress

    if (!address) {
      return
    }

    if (state.parties.active.publicKey) {
      json.publicKey = state.parties.active.publicKey
    }

    const Contract = new web3.eth.Contract(Marketplace.abi, address)
    const ipfsHash = await post(state.network.ipfsRPC, json.ipfs)

    var tx = Contract.methods
      .updateListing(listingId, ipfsHash, json.deposit)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    var data = {}

    dispatch(
      sendTransaction(tx, MarketplaceConstants.UPDATE_LISTING, data, () => {
        dispatch(getAllListings())
      })
    )
  }
}

export function withdrawListing(listingID, json) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var ipfsHash = await post(state.network.ipfsRPC, { withdrawn: true, ...json })

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .withdrawListing(listingID, json.target, ipfsHash)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    dispatch(
      sendTransaction(tx, MarketplaceConstants.WITHDRAW_LISTING, json, () => {
        dispatch(getAllListings())
      })
    )
  }
}

export function arbitrateListing(listingId, json) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    const Contract = new web3.eth.Contract(Marketplace.abi, address)
    var ipfsHash = await post(state.network.ipfsRPC, { ...json })

    var tx = Contract.methods
      .sendDeposit(listingId, json.target, json.value, ipfsHash)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    var data = {}

    dispatch(
      sendTransaction(tx, MarketplaceConstants.ARBITRATE_LISTING, data, () => {
        dispatch(getAllListings())
      })
    )
  }
}

export function getTotalListings() {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var totalListings = await Contract.methods.totalListings().call()

    dispatch({
      type: MarketplaceConstants.GET_TOTAL_LISTINGS_SUCCESS,
      totalListings
    })
  }
}

export function getAllListings() {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    window.mp = Contract
    var totalListings = await Contract.methods.totalListings().call()

    var events = await Contract.getPastEvents('allEvents', {
      fromBlock: 0
    })

    var ids = Array.from({ length: Number(totalListings) }, (v, i) => i).reverse()

    var listings = []
    for (let idx of ids) {
      var listing = await Contract.methods.listings(idx).call(),
        data = {},
        ipfsHash,
        withdrawn = false,
        listingEvents = events.filter(e => e.returnValues.listingID === String(idx))

      listingEvents.forEach(e => {
        if (e.event === 'ListingCreated') {
          ipfsHash = e.returnValues.ipfsHash
        } else if (e.event === 'ListingUpdated') {
          ipfsHash = e.returnValues.ipfsHash
        } else if (e.event === 'ListingWithdrawn') {
          withdrawn = true
        }
      })

      if (ipfsHash) {
        data = await get(
          state.network.ipfsGateway,
          ipfsHash,
          state.parties.active
        )
      }
      if (!ipfsHash || withdrawn){
        data.withdrawn = true
      }

      listings.push({ ...listing, id: idx, ipfs: data })
    }

    dispatch({
      type: MarketplaceConstants.GET_ALL_LISTINGS_SUCCESS,
      listings
    })

    dispatch(getArbitrator())
  }
}

export function getListing(idx) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var listing = await Contract.methods.listings(idx).call()

    var listingTopic = web3.utils.padLeft(web3.utils.numberToHex(idx), 64)

    var events = await Contract.getPastEvents('allEvents', {
      topics: [null, null, listingTopic, null],
      fromBlock: 0
    })

    dispatch({
      type: MarketplaceConstants.GET_LISTING_SUCCESS,
      idx,
      listing,
      events
    })
  }
}

export function makeOffer(listingID, json) {
  return async function(dispatch, getState) {
    var state = getState(),
      marketplaceAddress = state.marketplace.contractAddress
    if (!marketplaceAddress) {
      return
    }

    var listing = state.marketplace.listings[listingID],
      currencyId = json.ipfs.currencyId,
      ipfsHash

    const currencyAddr =
      currencyId === 'ETH'
        ? '0x0'
        : state.token.contractAddresses[currencyId]

    var value =
      currencyId === 'ETH' ? web3.utils.toWei(json.amount, 'ether') : json.amount

    json.value = value
    json.buyer = web3.eth.defaultAccount

    if (json.encrypt && listing.ipfs.publicKey) {
      json.publicKey = state.parties.active.publicKey
      var keys = [listing.ipfs.publicKey, state.parties.active.publicKey]
      ipfsHash = await postEnc(state.network.ipfsRPC, json, keys)
    } else {
      ipfsHash = await post(state.network.ipfsRPC, json)
    }

    var Contract = new web3.eth.Contract(Marketplace.abi, marketplaceAddress)
    var args = [
      listingID,
      ipfsHash,
      json.finalizes,
      json.affiliate || web3.eth.defaultAccount,
      json.commission,
      value,
      currencyAddr,
      json.arbitrator
    ]
    if (json.withdraw !== null && json.withdraw !== undefined) {
      args.push(json.withdraw)
    }
    var tx = Contract.methods.makeOffer(...args)

    if (currencyId === 'ETH') {
      tx = tx.send({
        gas: 4612388,
        from: web3.eth.defaultAccount,
        value
      })
    } else {
      tx = tx.send({
        gas: 4612388,
        from: web3.eth.defaultAccount
      })
    }

    var data = { listingID, json }

    dispatch(
      sendTransaction(tx, MarketplaceConstants.MAKE_OFFER, data, () => {
        dispatch(getAllListings())
        dispatch(getOffers(listingID))
      })
    )
  }
}

export function acceptOffer(listingID, offerID, obj = {}) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var ipfsHash,
      json = { accept: true, ...obj },
      offer = state.marketplace.offers[offerID]

    if (offer && offer.publicKey) {
      var keys = [offer.publicKey, state.parties.active.publicKey]
      ipfsHash = await postEnc(state.network.ipfsRPC, json, keys)
    } else {
      ipfsHash = await post(state.network.ipfsRPC, json)
    }

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .acceptOffer(listingID, offerID, ipfsHash)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    dispatch(
      sendTransaction(tx, MarketplaceConstants.ACCEPT_OFFER, {}, () => {
        dispatch(getAllListings())
        dispatch(getOffers(listingID))
      })
    )
  }
}

export function withdrawOffer(listingID, offerID) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var ipfsHash = await post(state.network.ipfsRPC, { withdrawn: true })

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .withdrawOffer(listingID, offerID, ipfsHash)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    dispatch(
      sendTransaction(tx, MarketplaceConstants.WITHDRAW_OFFER, {}, () => {
        dispatch(getAllListings())
        dispatch(getOffers(listingID))
      })
    )
  }
}

export function finalizeOffer(listingID, offerID, obj = {}) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var ipfsHash = await post(state.network.ipfsRPC, { finalize: true, ...obj })

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .finalize(listingID, offerID, ipfsHash)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    dispatch(
      sendTransaction(tx, MarketplaceConstants.FINALIZE_OFFER, {}, () => {
        dispatch(getAllListings())
        dispatch(getOffers(listingID))
      })
    )
  }
}

export function updateRefund(listingID, offerID, refund, obj = {}) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var offer = state.marketplace.offers[offerID]
    if (offer.ipfs.currencyId === 'ETH') {
      refund = web3.utils.toWei(refund, 'ether')
    }

    var ipfsHash = await post(state.network.ipfsRPC, { ...obj, refund })

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .updateRefund(listingID, offerID, refund, ipfsHash)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    dispatch(
      sendTransaction(tx, MarketplaceConstants.UPDATE_REFUND, {}, () => {
        dispatch(getAllListings())
        dispatch(getOffers(listingID))
      })
    )
  }
}

export function disputeOffer(listingID, offerID) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var ipfsHash = await post(state.network.ipfsRPC, { dispute: true })

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .dispute(listingID, offerID, ipfsHash)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    dispatch(
      sendTransaction(tx, MarketplaceConstants.DISPUTE_OFFER, {}, () => {
        dispatch(getAllListings())
        dispatch(getOffers(listingID))
      })
    )
  }
}

export function disputeRuling(listingID, offerID, ruling) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.arbitratorAddress,
      marketplaceAddress = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var MarketplaceContract = new web3.eth.Contract(
      Marketplace.abi,
      marketplaceAddress
    )
    var Contract = new web3.eth.Contract(Arbitrator.abi, address)

    var events = await MarketplaceContract.getPastEvents('OfferDisputed', {
      filter: { listingID, offerID },
      fromBlock: 0
    })

    var disputeID = events[0].returnValues.disputeID

    var tx = Contract.methods
      .giveRuling(disputeID, ruling)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    dispatch(
      sendTransaction(tx, MarketplaceConstants.DISPUTE_RULING, {}, () => {
        dispatch(getAllListings())
        dispatch(getOffers(listingID))
      })
    )
  }
}

export function getOffers(listingID, opts = {}) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress,
      tokens = state.token.contractAddresses

    if (!address) {
      return
    }

    dispatch({ type: MarketplaceConstants.GET_OFFERS, opts })

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var totalOffers = await Contract.methods.totalOffers(listingID).call()

    var ids = Array.from({ length: Number(totalOffers) }, (v, i) => i)
    var listingTopic = web3.utils.padLeft(web3.utils.numberToHex(listingID), 64)
    var listingEvents = await Contract.getPastEvents('allEvents', {
      topics: [null, null, listingTopic, null],
      fromBlock: 0
    })

    var offers = []
    for (let idx of ids) {
      var offer = await Contract.methods.offers(listingID, idx).call(),
        data = {},
        ipfsHash,
        lastEvent = ''

      var offerEvents = listingEvents.filter(e => e.returnValues.offerID === String(idx))

      offerEvents.forEach(e => {
        if (e.event === 'OfferCreated') {
          ipfsHash = e.returnValues.ipfsHash
        } else if (e.event === 'OfferUpdated') {
          ipfsHash = e.returnValues.ipfsHash
        }
        lastEvent = e.event
      })

      if (ipfsHash) {
        data = await get(
          state.network.ipfsGateway,
          ipfsHash,
          state.parties.active
        )
      }
      var currencyId = Object.keys(tokens).find(
        t => tokens[t] === offer.currency
      )
      var offerObj = { currencyId, ...offer, ...data }
      if (lastEvent === 'OfferFinalized') {
        offerObj.status = 4
      } else if (lastEvent === 'OfferWithdrawn') {
        offerObj.status = 0
      }
      offers.push(offerObj)
    }

    dispatch({
      type: MarketplaceConstants.GET_OFFERS_SUCCESS,
      listingID,
      offers
    })
  }
}

export function getOffer(listingID, offerID) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var offer = await Contract.methods.offers(listingID, offerID).call()

    dispatch({
      type: MarketplaceConstants.GET_OFFER_SUCCESS,
      listingID,
      offerID,
      offer
    })
  }
}

export function getEvents(listingID) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }
    dispatch({ type: MarketplaceConstants.GET_EVENTS, listingID })

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var listingTopic = web3.utils.padLeft(web3.utils.numberToHex(listingID), 64)

    var events = await Contract.getPastEvents('allEvents', {
      topics: [null, null, listingTopic, null],
      fromBlock: 0
    })

    dispatch({
      type: MarketplaceConstants.GET_EVENTS_SUCCESS,
      events,
      listingID
    })
  }
}
