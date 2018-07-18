import { MarketplaceConstants } from 'actions/Marketplace'

const initialState = {
  listings: [],
  offers: [],
  events: []
}

if (window.localStorage.marketplaceContract) {
  initialState.contractAddress = window.localStorage.marketplaceContract
}
if (window.localStorage.arbitratorContract) {
  initialState.arbitratorAddress = window.localStorage.arbitratorContract
}
if (window.localStorage.originArbitratorContract) {
  initialState.originArbitratorAddress =
    window.localStorage.originArbitratorContract
}

export default function Token(state = initialState, action = {}) {
  switch (action.type) {
    case MarketplaceConstants.DEPLOY_RECEIPT:
      return { ...state, deployMarketplaceGas: action.receipt.gasUsed }

    case MarketplaceConstants.DEPLOY_SUCCESS:
      window.localStorage.marketplaceContract = action.receipt._address
      return { ...state, contractAddress: action.receipt._address }

    case MarketplaceConstants.DEPLOY_ARBITRATOR_RECEIPT:
      return { ...state, deployArbitratorGas: action.receipt.gasUsed }

    case MarketplaceConstants.DEPLOY_ARBITRATOR_SUCCESS:
      window.localStorage.arbitratorContract = action.receipt._address
      return {
        ...state,
        arbitratorAddress: action.receipt._address
      }

    case MarketplaceConstants.DEPLOY_ORIGIN_ARBITRATOR_RECEIPT:
      return { ...state, deployOriginArbitratorGas: action.receipt.gasUsed }

    case MarketplaceConstants.DEPLOY_ORIGIN_ARBITRATOR_SUCCESS:
      window.localStorage.originArbitratorContract = action.receipt._address
      return {
        ...state,
        originArbitratorAddress: action.receipt._address
      }

    case MarketplaceConstants.CREATE_LISTING:
      return { ...state, createListingResponse: 'submitted' }

    case MarketplaceConstants.CREATE_LISTING_HASH:
      return { ...state, createListingResponse: 'in-pool' }

    case MarketplaceConstants.CREATE_LISTING_RECEIPT:
      return {
        ...state,
        createListingResponse: 'success',
        createListingGas: action.receipt.gasUsed
      }

    case MarketplaceConstants.UPDATE_LISTING:
      return { ...state, updateListingResponse: 'submitted' }

    case MarketplaceConstants.UPDATE_LISTING_HASH:
      return { ...state, updateListingResponse: 'in-pool' }

    case MarketplaceConstants.UPDATE_LISTING_RECEIPT:
      return {
        ...state,
        updateListingResponse: 'success',
        updateListingGas: action.receipt.gasUsed
      }

    case MarketplaceConstants.MAKE_OFFER:
      return { ...state, makeOfferResponse: 'submitted' }

    case MarketplaceConstants.MAKE_OFFER_HASH:
      return { ...state, makeOfferResponse: 'in-pool' }

    case MarketplaceConstants.MAKE_OFFER_RECEIPT:
      return {
        ...state,
        makeOfferResponse: 'success',
        makeOfferGas: action.receipt.gasUsed
      }

    case MarketplaceConstants.MAKE_OFFER_ERROR:
      return {
        ...state,
        makeOfferResponse: 'error',
        makeOfferError: action.message
      }

    case MarketplaceConstants.ACCEPT_OFFER:
      return { ...state, acceptOfferResponse: 'submitted' }

    case MarketplaceConstants.ACCEPT_OFFER_RECEIPT:
      return {
        ...state,
        acceptOfferResponse: 'success',
        acceptOfferGas: action.receipt.gasUsed
      }

    case MarketplaceConstants.FINALIZE_OFFER_RECEIPT:
      return {
        ...state,
        finalizeOfferResponse: 'success',
        finalizeOfferGas: action.receipt.gasUsed
      }

    case MarketplaceConstants.ARBITRATE_LISTING:
      return { ...state, arbitrateListingResponse: 'submitted' }

    case MarketplaceConstants.ARBITRATE_LISTING_RECEIPT:
      return {
        ...state,
        arbitrateListingResponse: 'success',
        arbitrateListingGas: action.receipt.gasUsed
      }

    case MarketplaceConstants.WITHDRAW_LISTING:
      return { ...state, withdrawListingResponse: 'submitted' }

    case MarketplaceConstants.WITHDRAW_LISTING_RECEIPT:
      return {
        ...state,
        withdrawListingResponse: 'success',
        withdrawListingGas: action.receipt.gasUsed
      }

    case MarketplaceConstants.GET_ALL_LISTINGS_SUCCESS:
      return { ...state, listings: action.listings }

    case MarketplaceConstants.GET_OFFERS_SUCCESS:
      return { ...state, offers: action.offers }

    case MarketplaceConstants.GET_EVENTS:
      return { ...state, eventsResponse: null }

    case MarketplaceConstants.GET_EVENTS_SUCCESS:
      return { ...state, events: action.events, eventsResponse: 200 }

    case MarketplaceConstants.GET_ARBITRATOR_SUCCESS:
      return { ...state, arbitrator: action.arbitrator }
  }

  return state
}
