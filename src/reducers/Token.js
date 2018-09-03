import { TokenConstants } from 'actions/Token'
import { ContractConstants } from 'actions/Contracts'

const initialState = {
  contractAddresses: {}
}

export default function Token(state = initialState, action = {}) {
  switch (action.type) {
    case ContractConstants.FETCH:
      return { ...state, contractAddresses: action.contracts.tokens || {} }

    case ContractConstants.RESET:
      return { ...state, contractAddresses: {} }

    case TokenConstants.DEPLOY_SUCCESS: {
      var addrs = state.contractAddresses
      addrs[action.symbol] = action.receipt._address
      let contracts = {}
      try {
        contracts = JSON.parse(localStorage.contracts)
      } catch (e) {
        /* Ignore */
      }
      window.localStorage.contracts = JSON.stringify({
        ...contracts,
        tokens: addrs
      })
      return {
        ...state,
        contractAddresses: addrs
      }
    }
  }

  return state
}
