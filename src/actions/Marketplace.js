import Marketplace from '../contracts/Marketplace'
import Arbitrator from '../contracts/CentralizedArbitrator'
import Token from '../contracts/Token'

import { sendTransaction } from './helpers'
import { generateConstants } from 'utils/generateConstants'
import { get, post } from 'utils/ipfsHash'

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
    'CREATE_LISTING',
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
      address = state.marketplace.contractAddress,
      tokenAddress = state.token.contractAddresses.OGN
    if (!address) {
      return
    }

    var ipfsHash = await post(state.network.ipfsRPC, json)

    const Contract = new web3.eth.Contract(Marketplace.abi)
    const TokenContract = new web3.eth.Contract(Token.abi, tokenAddress)
    const currency =
      json.currencyId === 'ETH'
        ? '0x0'
        : state.token.contractAddresses[json.currencyId]

    var listingAbi = Contract.methods
      .createListing(ipfsHash, json.deposit, currency, web3.eth.defaultAccount)
      .encodeABI()

    var tx = TokenContract.methods
      .approveAndCall(address, json.deposit, listingAbi)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    var data = {}

    dispatch(
      sendTransaction(tx, MarketplaceConstants.CREATE_LISTING, data, () => {
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
      var listing = await Contract.methods.listings(idx).call()
      var data = await get(state.network.ipfsGateway, listing.ipfsHash)
      listings.push({ ...data, ...listing })
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
      tokens = state.token.contractAddresses

    var ipfsHash = await post(state.network.ipfsRPC, json)
    var value =
      currency === 'ETH' ? web3.utils.toWei(json.amount, 'ether') : json.amount

    var Contract = new web3.eth.Contract(Marketplace.abi, marketplaceAddress)
    var tx = Contract.methods.makeOffer(
      listingID,
      ipfsHash,
      // json.expires,
      json.finalizes,
      json.affiliate || web3.eth.defaultAccount,
      json.commission,
      value
    )

    if (currency === 'ETH') {
      tx = tx.send({
        gas: 4612388,
        from: web3.eth.defaultAccount,
        value
      })
    } else {
      var TokenContract = new web3.eth.Contract(Token.abi, tokens[currency])
      var offerAbi = await tx.encodeABI()
      tx = TokenContract.methods
        .approveAndCall(marketplaceAddress, value, offerAbi)
        .send({ from: web3.eth.defaultAccount, gas: 4612388 })
    }

    var data = {}

    dispatch(
      sendTransaction(tx, MarketplaceConstants.MAKE_OFFER, data, () => {
        dispatch(getAllListings())
        dispatch(getOffers(listingID))
      })
    )
  }
}

export function acceptOffer(listingID, offerID) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .acceptOffer(listingID, offerID)
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

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .withdrawOffer(listingID, offerID)
      .send({ gas: 4612388, from: web3.eth.defaultAccount })

    dispatch(
      sendTransaction(tx, MarketplaceConstants.WITHDRAW_OFFER, {}, () => {
        dispatch(getAllListings())
        dispatch(getOffers(listingID))
      })
    )
  }
}

export function finalizeOffer(listingID, offerID) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.marketplace.contractAddress
    if (!address) {
      return
    }

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .buyerFinalize(listingID, offerID)
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

    var Contract = new web3.eth.Contract(Marketplace.abi, address)
    var tx = Contract.methods
      .dispute(listingID, offerID)
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
      address = state.marketplace.arbitratorAddress
    if (!address) {
      return
    }

    const disputeID = state.marketplace.offers[offerID].dispute

    var Contract = new web3.eth.Contract(Arbitrator.abi, address)
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
      address = state.marketplace.contractAddress
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
        data = await get(state.network.ipfsGateway, offer.ipfsHash)
      }
      offers.push({ ...data, ...offer })
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
      topics: [null, listingTopic, null],
      fromBlock: 0
    })

    dispatch({
      type: MarketplaceConstants.GET_EVENTS_SUCCESS,
      events,
      listingID
    })
  }
}
