import { generateConstants } from 'utils/generateConstants'
import Token from '../contracts/Token'

export const PartyConstants = generateConstants('WALLET', {
  regular: ['ADD'],
  successError: ['UPDATE']
})

export function addParty(party) {
  return async function(dispatch) {
    dispatch({ type: PartyConstants.ADD, party })
    dispatch(updateParties())
  }
}

export function updateParties() {
  return async function(dispatch, getState) {
    var state = getState(),
      contracts = state.token.contractAddresses,
      tokens = Object.keys(contracts)

    if (!tokens) {
      return
    }

    var balances = {}

    for (let party of state.parties.parties) {
      var ethBalance = await web3.eth.getBalance(party.address)
      balances[party.address] = { ETH: web3.utils.fromWei(ethBalance, 'ether') }
      for (let token of tokens) {
        var Contract = new web3.eth.Contract(Token.abi, contracts[token])
        var balance = await Contract.methods.balanceOf(party.address).call()
        balances[party.address][token] = balance
      }
    }

    dispatch({ type: PartyConstants.UPDATE_SUCCESS, balances })
  }
}
