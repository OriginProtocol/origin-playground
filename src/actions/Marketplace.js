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
    'ACCEPT_OFFER',
    'WITHDRAW_OFFER'
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

    if (state.parties.active.publicKey) {
      json.publicKey = state.parties.active.publicKey
    }

    var ipfsHash = await post(state.network.ipfsRPC, json)

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

export function updateListing(listingId, json) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    const Contract = new web3.eth.Contract(Marketplace.abi, address)
    const ipfsHash = await post(state.network.ipfsRPC, json)

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

export function withdrawListing(listingID) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var ipfsHash = await post(state.network.ipfsRPC, { withdrawn: true })

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .withdrawListing(listingID, ipfsHash)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    dispatch(
      sendTransaction(tx, MarketplaceConstants.WITHDRAW_LISTING, {}, () => {
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

    var ids = Array.from({ length: Number(totalListings) }, (v, i) => i)

    var listings = []
    for (let idx of ids) {
      var listing = await Contract.methods.listings(idx).call(),
        data = {}
      if (listing.seller === '0x0000000000000000000000000000000000000000') {
        data = { withdrawn: true }
      } else {
        data = await get(
          state.network.ipfsGateway,
          listing.ipfsHash,
          state.parties.active
        )
      }
      listings.push({ ...data, ...listing, id: idx })
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

    dispatch({
      type: MarketplaceConstants.GET_LISTING_SUCCESS,
      idx,
      listing
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
      currency = listing.currencyId,
      ipfsHash

    const currencyAddr =
      listing.currencyId === 'ETH'
        ? '0x0'
        : state.token.contractAddresses[listing.currencyId]

    json.currencyId = listing.currencyId

    if (json.encrypt && listing.publicKey) {
      json.publicKey = state.parties.active.publicKey
      var keys = [listing.publicKey, state.parties.active.publicKey]
      ipfsHash = await postEnc(state.network.ipfsRPC, json, keys)
    } else {
      ipfsHash = await post(state.network.ipfsRPC, json)
    }

    var value =
      currency === 'ETH' ? web3.utils.toWei(json.amount, 'ether') : json.amount

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

    if (currency === 'ETH') {
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

export function getOffers(listingID) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress,
      tokens = state.token.contractAddresses

    if (!address) {
      return
    }

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var totalOffers = await Contract.methods.totalOffers(listingID).call()

    var ids = Array.from({ length: Number(totalOffers) }, (v, i) => i)

    var offers = []
    for (let idx of ids) {
      var offer = await Contract.methods.offers(listingID, idx).call(),
        data = {}
      if (offer.status !== '0') {
        data = await get(
          state.network.ipfsGateway,
          offer.ipfsHash,
          state.parties.active
        )
      }
      var currencyId = Object.keys(tokens).find(
        t => tokens[t] === offer.currency
      )
      offers.push({ currencyId, ...data, ...offer })
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
