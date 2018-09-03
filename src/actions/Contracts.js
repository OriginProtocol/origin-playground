import { generateConstants } from 'utils/generateConstants'

export const ContractConstants = generateConstants('CONTRACT', {
  regular: ['FETCH', 'RESET']
})

export function fetchContracts() {
  return async function(dispatch) {
    // var accountsRaw = await web3.eth.getAccounts()
    let contracts = {}
    try {
      contracts = JSON.parse(window.localStorage.contracts)
    } catch (e) {
      /* Ignore */
    }
    dispatch({
      type: ContractConstants.FETCH,
      contracts
    })
  }
}

export function resetContracts() {
  delete window.localStorage.contracts
  return { type: ContractConstants.RESET }
}
