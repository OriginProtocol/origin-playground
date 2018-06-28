import { TokenConstants } from 'actions/Token'

let initialState = {
  contractAddresses: {}
}

if (window.localStorage.tokenContracts) {
  try {
    initialState.contractAddresses = JSON.parse(window.localStorage.tokenContracts)
  } catch(e) { /* Ignore */ }
}

export default function Token(state = initialState, action = {}) {
  switch (action.type) {
    case TokenConstants.DEPLOY_SUCCESS: {
      var addrs = state.contractAddresses
      addrs[action.symbol] = action.receipt._address
      window.localStorage.tokenContracts = JSON.stringify(addrs)
      return {
        ...state,
        contractAddresses: addrs
      }
    }
  }

  return state
}
