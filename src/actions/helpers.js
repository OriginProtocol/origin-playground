import { updateBalance } from './Wallet'
import { getLatestBlock } from './Network'
import { updateParties } from './Parties'

export function lookup(Types) {
  return function claimType(id) {
    var type = Types.find(t => t.id === id)
    return type ? type.value : id
  }
}

export const chainConstants = c => ({
  [`${c}`]: null,
  [`${c}_HASH`]: null,
  [`${c}_RECEIPT`]: null,
  [`${c}_SUCCESS`]: null,
  [`${c}_CONFIRMATION`]: null,
  [`${c}_ERROR`]: null
})

export const successErrorConstants = c => ({
  [`${c}`]: null,
  [`${c}_SUCCESS`]: null,
  [`${c}_ERROR`]: null
})

export function sendTransaction(transaction, type, data, callback) {
  return async function(dispatch) {
    dispatch({ type, ...data })

    transaction
      .on('transactionHash', hash => {
        dispatch({ type: `${type}_HASH`, hash })
      })
      .on('receipt', receipt => {
        dispatch({ type: `${type}_RECEIPT`, receipt, ...data })
        dispatch(updateBalance())
      })
      .on('confirmation', num => {
        if (num === 1) {
          dispatch(updateParties())
        }
        if (num <= 3) {
          dispatch({ type: `${type}_CONFIRMATION`, num })
        }
      })
      .then(receipt => {
        dispatch({ type: `${type}_SUCCESS`, receipt, ...data })
        dispatch(getLatestBlock())
        if (callback) {
          callback()
        }
      })
      .catch(error => {
        dispatch({
          type: `${type}_ERROR`,
          message: error.message
        })
      })
  }
}
