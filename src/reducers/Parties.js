import { PartyConstants } from 'actions/Parties'

let initialState = {
  parties: []
}

if (window.localStorage.parties) {
  try {
    initialState.parties = JSON.parse(window.localStorage.parties)
  } catch(e) { /* Ignore */ }
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
  }

  return state
}
