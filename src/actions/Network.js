import keyMirror from 'utils/keyMirror'
import balance from 'utils/balance'

import { loadWallet } from './Wallet'

export const NetworkConstants = keyMirror(
  {
    CHANGE: null,
    CHANGE_SUCCESS: null,
    CHANGE_ERROR: null,

    UPDATE_BALANCE: null,
    UPDATE_BALANCE_SUCCESS: null,
    UPDATE_BALANCE_ERROR: null,

    FETCH_ACCOUNTS: null,
    FETCH_ACCOUNTS_SUCCESS: null,

    FETCH_LOCAL_WALLET: null,
    FETCH_LOCAL_WALLET_SUCCESS: null,

    SELECT_ACCOUNT: null,
    SET_PROVIDER: null,
    SET_IPFS: null,

    SEND_FROM_NODE: null,
    SEND_FROM_NODE_SUCCESS: null,
    SEND_FROM_NODE_ERROR: null,

    SEND_FROM_ACCOUNT: null,
    SEND_FROM_ACCOUNT_SUCCESS: null,
    SEND_FROM_ACCOUNT_ERROR: null
  },
  'NETWORK'
)

export function init() {
  return async function(dispatch, getState) {
    var state = getState()
    dispatch({ type: NetworkConstants.CHANGE })
    dispatch(loadWallet())

    var accounts = [],
      balanceWei
    var id = await web3.eth.net.getId().catch(() => {
      dispatch({
        type: NetworkConstants.CHANGE_ERROR,
        error: 'Network unavailable'
      })
      return
    })
    if (!id) {
      return
    }

    var accountsRaw = await web3.eth.getAccounts()

    for (let hash of accountsRaw) {
      balanceWei = await web3.eth.getBalance(hash)
      accounts.push({
        hash,
        balanceWei,
        balance: balance(balanceWei, state.wallet.exchangeRates)
      })
    }

    dispatch({
      type: NetworkConstants.CHANGE_SUCCESS,
      id,
      accounts
    })
  }
}

export function fetchAccounts() {
  return async function(dispatch) {
    dispatch({ type: NetworkConstants.FETCH_ACCOUNTS })

    var accounts = []
    var accountsRaw = await web3.eth.getAccounts()
    for (let hash of accountsRaw) {
      var balanceWei = await web3.eth.getBalance(hash)
      accounts.push({
        hash,
        balanceWei,
        balance: web3.utils.fromWei(balanceWei, 'ether')
      })
    }

    dispatch({ type: NetworkConstants.FETCH_ACCOUNTS_SUCCESS, accounts })
  }
}

export function updateBalance(account) {
  return async function(dispatch, getState) {
    var state = getState()
    dispatch({ type: NetworkConstants.UPDATE_BALANCE })

    var balanceWei = await web3.eth.getBalance(account)

    dispatch({
      type: NetworkConstants.UPDATE_BALANCE_SUCCESS,
      account,
      balance: balance(balanceWei, state.wallet.exchangeRates)
    })
  }
}

export function sendFromNode(from, to, value) {
  return function(dispatch) {
    dispatch({ type: NetworkConstants.SEND_FROM_NODE, from, to, value })

    web3.eth
      .sendTransaction({
        from,
        to,
        value: web3.utils.toWei(value, 'ether'),
        gas: 4612388
      })
      .on('transactionHash', hash => {
        dispatch({ type: 'LOG', message: 'transactionHash', hash })
      })
      .on('receipt', receipt => {
        dispatch({ type: 'LOG', message: 'receipt', receipt })
      })
      .on('confirmation', function(num, receipt) {
        if (num === 1) {
          dispatch({ type: NetworkConstants.SEND_FROM_NODE_SUCCESS, receipt })
          dispatch(updateBalance(from))
          dispatch(updateBalance(to))
        }
      })
      .on('error', error => {
        dispatch({ type: NetworkConstants.SEND_FROM_NODE_ERROR, error })
      })
  }
}

export function sendFromAccount(from, to, value) {
  return async function(dispatch, getState) {
    var state = getState()
    var chainId = state.network.id
    var account = state.wallet.raw[from]
    var valEth = value
    if (state.wallet.currency !== 'eth') {
      valEth = String(
        Number(value) / state.wallet.exchangeRates[state.wallet.currency]
      )
    }

    dispatch({ type: NetworkConstants.SEND_FROM_ACCOUNT, from, to, value })

    var signedTx = await account.signTransaction({
      from: account.address,
      to,
      gas: 4612388,
      value: web3.utils.toWei(valEth, 'ether'),
      chainId: chainId > 10 ? 1 : chainId
    })

    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .on('error', error => {
        dispatch({
          type: NetworkConstants.SEND_FROM_ACCOUNT,
          message: error.message
        })
      })
      .on('transactionHash', hash => {
        dispatch({ type: 'LOG', message: 'transactionHash', hash })
      })
      .on('receipt', receipt => {
        dispatch({ type: 'LOG', message: 'receipt', receipt })
      })
      .on('confirmation', num => {
        if (num === 1) {
          dispatch({ type: NetworkConstants.SEND_FROM_ACCOUNT_SUCCESS })
          dispatch(updateBalance(from))
          dispatch(updateBalance(to))
        }
      })
  }
}

export function setProvider(provider) {
  return async function(dispatch, getState) {
    var state = getState()
    if (state.network.provider === provider) {
      return
    }
    web3.eth.setProvider(provider)
    dispatch({ type: NetworkConstants.SET_PROVIDER, provider })
    dispatch(init())
  }
}

export function selectAccount(hash) {
  return { type: NetworkConstants.SELECT_ACCOUNT, hash }
}
export function setIpfs(gateway, api) {
  return { type: NetworkConstants.SET_IPFS, gateway, api }
}
