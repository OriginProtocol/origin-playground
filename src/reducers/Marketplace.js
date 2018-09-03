import { MarketplaceConstants } from 'actions/Marketplace'
import { ContractConstants } from 'actions/Contracts'

const initialState = {
  listings: [],
  offers: [],
  events: []
}

export default function Token(state = initialState, action = {}) {
  function chainAction(toHandle, prop) {
    if (action.type === toHandle) {
      state = { ...state, [`${prop}Response`]: 'submitted' }
    } else if (action.type === `${toHandle}_HASH`) {
      state = { ...state, [`${prop}Response`]: 'in-pool' }
    } else if (action.type === `${toHandle}_RECEIPT`) {
      state = {
        ...state,
        [`${prop}Response`]: 'success',
        [`${prop}Gas`]: action.receipt.gasUsed
      }
    } else if (action.type === `${toHandle}_ERROR`) {
      state = {
        ...state,
        [`${prop}Response`]: 'error',
        [`${prop}Error`]: action.message
      }
    }
  }

  chainAction(MarketplaceConstants.CREATE_LISTING, 'createListing')
  chainAction(MarketplaceConstants.MAKE_OFFER, 'makeOffer')
  chainAction(MarketplaceConstants.UPDATE_LISTING, 'updateListing')
  chainAction(MarketplaceConstants.ADD_DATA, 'addData')
  chainAction(MarketplaceConstants.ACCEPT_OFFER, 'acceptOffer')
  chainAction(MarketplaceConstants.UPDATE_REFUND, 'updateRefund')
  chainAction(MarketplaceConstants.FINALIZE_OFFER, 'finalizeOffer')
  chainAction(MarketplaceConstants.DISPUTE_OFFER, 'disputeOffer')
  chainAction(MarketplaceConstants.ADD_FUNDS, 'addFunds')
  chainAction(MarketplaceConstants.DISPUTE_RULING, 'disputeRuling')
  chainAction(MarketplaceConstants.WITHDRAW_LISTING, 'withdrawListing')
  chainAction(MarketplaceConstants.WITHDRAW_OFFER, 'withdrawOffer')
  chainAction(MarketplaceConstants.ARBITRATE_LISTING, 'arbitrateListing')

  switch (action.type) {
    case ContractConstants.FETCH:
      return { ...state, contractAddress: action.contracts.marketplace }

    case ContractConstants.RESET:
      return initialState

    case MarketplaceConstants.DEPLOY_RECEIPT:
      return { ...state, deployMarketplaceGas: action.receipt.gasUsed }

    case MarketplaceConstants.DEPLOY_SUCCESS: {
      let contracts = {}
      try {
        contracts = JSON.parse(localStorage.contracts)
      } catch (e) {
        /* Ignore */
      }
      window.localStorage.contracts = JSON.stringify({
        ...contracts,
        marketplace: action.receipt._address
      })
      return { ...state, contractAddress: action.receipt._address }
    }

    case MarketplaceConstants.DEPLOY_ARBITRATOR_RECEIPT:
      return { ...state, deployArbitratorGas: action.receipt.gasUsed }

    case MarketplaceConstants.DEPLOY_ARBITRATOR_SUCCESS:
      window.localStorage.arbitratorContract = action.receipt._address
      return {
        ...state,
        arbitratorAddress: action.receipt._address
      }

    case MarketplaceConstants.MAKE_OFFER_RECEIPT:
      return {
        ...state,
        lastOfferId: action.receipt.events.OfferCreated.returnValues.offerID
      }

    case MarketplaceConstants.DEPLOY_ORIGIN_ARBITRATOR_RECEIPT:
      return { ...state, deployOriginArbitratorGas: action.receipt.gasUsed }

    case MarketplaceConstants.DEPLOY_ORIGIN_ARBITRATOR_SUCCESS:
      window.localStorage.originArbitratorContract = action.receipt._address
      return {
        ...state,
        originArbitratorAddress: action.receipt._address
      }

    case MarketplaceConstants.GET_ALL_LISTINGS_SUCCESS:
      return { ...state, listings: action.listings }

    case MarketplaceConstants.GET_OFFERS:
      if (action.opts.refresh) {
        return { ...state, offers: [] }
      } else {
        return state
      }

    case MarketplaceConstants.GET_OFFERS_SUCCESS:
      return { ...state, offers: action.offers }

    case MarketplaceConstants.GET_EVENTS:
      return { ...state, eventsResponse: null, events: [] }

    case MarketplaceConstants.GET_EVENTS_SUCCESS:
      return { ...state, events: action.events, eventsResponse: 200 }

    case MarketplaceConstants.GET_ARBITRATOR_SUCCESS:
      return { ...state, arbitrator: action.arbitrator }
  }

  return state
}
