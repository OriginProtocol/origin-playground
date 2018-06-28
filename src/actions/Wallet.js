import { generateConstants } from 'utils/generateConstants'
import balance from 'utils/balance'

export const WalletConstants = generateConstants('WALLET', {
  successError: [
    'LOAD',
    'LOAD_EXTERNAL',
    'ADD_ACCOUNT',
    'SELECT_ACCOUNT',
    'IMPORT_ACCOUNT',
    'SAVE',
    'UNSAFE_SAVE',
    'REMOVE_ACCOUNT',
    'UPDATE_BALANCE'
  ],
  regular: ['SET_CURRENCY', 'LOCK_WALLET', 'UNLOCK_WALLET', 'UNLOCKED_WALLET']
})

var watchMetaMaskInterval
function watchMetaMask(dispatch, currentAccount) {
  watchMetaMaskInterval = setInterval(async function() {
    var accounts = await web3.eth.getAccounts()
    if (currentAccount !== accounts[0]) {
      dispatch(loadWallet(true))
    }
  }, 1000)
}

export function loadWallet(external) {
  return async function(dispatch, getState) {
    var state = getState()

    dispatch({ type: WalletConstants.LOAD, external })
    var wallet = web3.eth.accounts.wallet,
      accounts = [],
      balanceWei,
      balances = {}

    clearInterval(watchMetaMaskInterval)

    try {
      if (external) {
        web3.setProvider(state.network.browserProvider)
        accounts = await web3.eth.getAccounts()

        balanceWei = await web3.eth.getBalance(accounts[0])
        balances[accounts[0]] = balance(balanceWei, state.wallet.exchangeRates)

        web3.eth.accounts.wallet.clear()
        web3.eth.defaultAccount = accounts[0]
        dispatch({
          type: WalletConstants.LOAD_EXTERNAL_SUCCESS,
          activeAddress: accounts[0],
          balances
        })
        watchMetaMask(dispatch, accounts[0])
        return
      }

      web3.setProvider(state.network.provider)

      // wallet.load is expensive, so cache private keys in sessionStorage
      if (window.sessionStorage.privateKeys) {
        JSON.parse(window.sessionStorage.privateKeys).forEach(key =>
          web3.eth.accounts.wallet.add(key)
        )
      } else {
        wallet = web3.eth.accounts.wallet.load('', 'originprotocol')

        var accountKeys = []
        for (var k = 0; k < wallet.length; k++) {
          accountKeys.push(wallet[k].privateKey)
        }
        if (accountKeys.length) {
          window.sessionStorage.privateKeys = JSON.stringify(accountKeys)
        }
      }

      for (var i = 0; i < wallet.length; i++) {
        accounts.push(wallet[i].address)
      }

      for (let hash of accounts) {
        balanceWei = await web3.eth.getBalance(hash)
        balances[hash] = balance(balanceWei, state.wallet.exchangeRates)
      }

      web3.eth.defaultAccount = accounts[0]

      dispatch({
        type: WalletConstants.LOAD_SUCCESS,
        wallet,
        accounts,
        balances
      })
    } catch (error) {
      dispatch({ type: WalletConstants.LOAD_ERROR, error })
    }
  }
}

export function selectAccount(address) {
  return async function(dispatch) {
    dispatch({ type: WalletConstants.SELECT_ACCOUNT, address })

    try {
      var account = web3.eth.accounts.wallet[address]
      web3.eth.defaultAccount = address

      dispatch({
        type: WalletConstants.SELECT_ACCOUNT_SUCCESS,
        account,
        activeAddress: address
      })
    } catch (error) {
      dispatch({ type: WalletConstants.SELECT_ACCOUNT_ERROR, error })
    }
  }
}

export function addAccount(num = 1, UNSAFE_save = true) {
  return async function(dispatch) {
    dispatch({ type: WalletConstants.ADD_ACCOUNT })

    try {
      var wallet,
        account,
        accounts = []
      for (let i = 0; i < num; i++) {
        wallet = web3.eth.accounts.wallet.create(1)
        account = wallet[wallet.length - 1]
        accounts.push(account)

        dispatch({
          type: WalletConstants.ADD_ACCOUNT_SUCCESS,
          wallet,
          account
        })
      }
      if (accounts[0]) {
        dispatch(selectAccount(accounts[0].address))
        if (UNSAFE_save) {
          dispatch(UNSAFE_saveWallet())
        }
      }
    } catch (error) {
      dispatch({ type: WalletConstants.ADD_ACCOUNT_ERROR, error })
    }
  }
}

export function importAccountFromKey(privateKey) {
  return async function(dispatch, getState) {
    var state = getState()
    dispatch({ type: WalletConstants.IMPORT_ACCOUNT })

    try {
      var account = web3.eth.accounts.wallet.add(privateKey)
      var wallet = web3.eth.accounts.wallet

      var balanceWei = await web3.eth.getBalance(account.address)

      dispatch({
        type: WalletConstants.IMPORT_ACCOUNT_SUCCESS,
        account: wallet[wallet.length - 1],
        wallet,
        balance: balance(balanceWei, state.wallet.exchangeRates)
      })
    } catch (error) {
      dispatch({ type: WalletConstants.IMPORT_ACCOUNT_ERROR, error })
    }
  }
}

export function removeAccount(hash) {
  return async function(dispatch) {
    dispatch({ type: WalletConstants.REMOVE_ACCOUNT })

    try {
      var wallet = web3.eth.accounts.wallet.remove(hash)

      dispatch({
        type: WalletConstants.REMOVE_ACCOUNT_SUCCESS,
        hash,
        wallet
      })
    } catch (error) {
      dispatch({ type: WalletConstants.REMOVE_ACCOUNT_ERROR, error })
    }
  }
}

export function saveWallet() {
  return async function(dispatch) {
    dispatch({ type: WalletConstants.SAVE })

    try {
      web3.eth.accounts.wallet.save('', 'originprotocol')
      dispatch({ type: WalletConstants.SAVE_SUCCESS })
    } catch (error) {
      dispatch({ type: WalletConstants.SAVE_ERROR, error })
    }
  }
}

export function UNSAFE_saveWallet() {
  return async function(dispatch, getState) {
    dispatch({ type: WalletConstants.UNSAFE_SAVE })
    var state = getState()

    try {
      window.sessionStorage.privateKeys = JSON.stringify(
        state.wallet.accounts.map(a => state.wallet.raw[a].privateKey)
      )
      dispatch({ type: WalletConstants.UNSAFE_SAVE_SUCCESS })
    } catch (error) {
      dispatch({ type: WalletConstants.UNSAFE_SAVE_ERROR, error })
    }
  }
}

export function updateBalance() {
  return async function(dispatch, getState) {
    dispatch({ type: WalletConstants.UPDATE_BALANCE })

    var state = getState()
    var account = state.wallet.activeAddress

    var wei = await web3.eth.getBalance(account)

    dispatch({
      type: WalletConstants.UPDATE_BALANCE_SUCCESS,
      account,
      balance: balance(wei, state.wallet.exchangeRates)
    })
  }
}

export function setCurrency(currency) {
  return {
    type: WalletConstants.SET_CURRENCY,
    currency
  }
}

export function lockWallet() {
  return {
    type: WalletConstants.LOCK_WALLET
  }
}

export function unlockWallet() {
  return {
    type: WalletConstants.UNLOCK_WALLET
  }
}

export function unlockedWallet() {
  return {
    type: WalletConstants.UNLOCKED_WALLET
  }
}
