import keyMirror from 'utils/keyMirror'
import balance from 'utils/balance'

export const WalletConstants = keyMirror(
  {
    LOAD: null,
    LOAD_SUCCESS: null,
    LOAD_ERROR: null,

    LOAD_EXTERNAL: null,
    LOAD_EXTERNAL_SUCCESS: null,
    LOAD_EXTERNAL_ERROR: null,

    ADD_ACCOUNT: null,
    ADD_ACCOUNT_SUCCESS: null,
    ADD_ACCOUNT_ERROR: null,

    SELECT_ACCOUNT: null,
    SELECT_ACCOUNT_SUCCESS: null,
    SELECT_ACCOUNT_ERROR: null,

    IMPORT_ACCOUNT: null,
    IMPORT_ACCOUNT_SUCCESS: null,
    IMPORT_ACCOUNT_ERROR: null,

    SAVE: null,
    SAVE_SUCCESS: null,
    SAVE_ERROR: null,

    REMOVE_ACCOUNT: null,
    REMOVE_ACCOUNT_SUCCESS: null,
    REMOVE_ACCOUNT_ERROR: null,

    UPDATE_BALANCE: null,
    UPDATE_BALANCE_SUCCESS: null,
    UPDATE_BALANCE_ERROR: null,

    SET_CURRENCY: null,
    LOCK_WALLET: null,
    UNLOCK_WALLET: null,
    UNLOCKED_WALLET: null
  },
  'WALLET'
)

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

export function addAccount() {
  return async function(dispatch) {
    dispatch({ type: WalletConstants.ADD_ACCOUNT })

    try {
      var wallet = web3.eth.accounts.wallet.create(1),
        account = wallet[wallet.length - 1]

      dispatch({
        type: WalletConstants.ADD_ACCOUNT_SUCCESS,
        wallet,
        account
      })
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
