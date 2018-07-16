import { PartyConstants } from 'actions/Parties'
import { WalletConstants } from 'actions/Wallet'

let initialState = {
  parties: [],
  active: null
}

if (window.localStorage.parties) {
  try {
    initialState.parties = JSON.parse(window.localStorage.parties)
    initialState.active = initialState.parties.find(
      p => p.address === window.localStorage.activeAddress
    )
  } catch (e) {
    /* Ignore */
  }
}

export default function Token(state = initialState, action = {}) {
  switch (action.type) {
    case PartyConstants.ADD: {
      let parties = state.parties
      parties.push(action.party)
      window.localStorage.parties = JSON.stringify(parties)
      return { ...state, parties }
    }

    case PartyConstants.UPDATE_SUCCESS: {
      let parties = state.parties.map(p => {
        if (action.balances[p.address]) {
          return { ...p, ...action.balances[p.address] }
        }
        return p
      })
      window.localStorage.parties = JSON.stringify(parties)
      return { ...state, parties }
    }

    case WalletConstants.SELECT_ACCOUNT_SUCCESS:
      return {
        ...state,
        active: state.parties.find(p => p.address === action.activeAddress)
      }
  }

  return state
}
