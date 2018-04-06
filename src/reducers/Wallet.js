import { WalletConstants } from 'actions/Wallet'
import { NetworkConstants } from 'actions/Network'

import balance from 'utils/balance'

const initialState = {
  unsaved: false,
  loaded: false,
  raw: {},
  accounts: [],
  active: null,
  activeAddress: null,
  balances: {},
  currency: 'usd',
  currencyStr: '$',
  exchangeRates: {
    usd: 400
  },
  locked: false,
  tryUnlock: false
}

export default function Wallet(state = initialState, action = {}) {
  switch (action.type) {
    case WalletConstants.SELECT_ACCOUNT_SUCCESS:
      return {
        ...state,
        active: action.account,
        activeAddress: action.account.address
      }

    case WalletConstants.LOAD_SUCCESS:
      return {
        ...state,
        raw: action.wallet,
        accounts: action.accounts,
        balances: action.balances,
        active: action.wallet[0] ? action.wallet[0] : null,
        activeAddress: action.wallet[0] ? action.wallet[0].address : null,
        loaded: true
      }

    case WalletConstants.ADD_ACCOUNT_SUCCESS:
      return {
        ...state,
        raw: action.wallet,
        accounts: [...state.accounts, action.account.address],
        balances: {
          ...state.balances,
          [action.account.address]: balance('0', state.exchangeRates)
        },
        unsaved: true
      }

    case WalletConstants.IMPORT_ACCOUNT_SUCCESS:
      return {
        ...state,
        raw: action.wallet,
        accounts: [...state.accounts, action.account.address],
        balances: {
          ...state.balances,
          [action.account.address]: action.balance
        },
        unsaved: true
      }

    case WalletConstants.REMOVE_ACCOUNT_SUCCESS:
      return {
        ...state,
        raw: action.wallet,
        accounts: state.accounts.filter(h => h !== action.hash),
        unsaved: true
      }

    case WalletConstants.SAVE_SUCCESS:
      return { ...state, unsaved: false }

    case WalletConstants.SET_CURRENCY:
      return {
        ...state,
        currency: action.currency,
        currencyStr: action.currency === 'usd' ? '$' : 'ETH'
      }

    case WalletConstants.UPDATE_BALANCE_SUCCESS:
      return {
        ...state,
        balances: {
          ...state.balances,
          [action.account]: action.balance
        }
      }

    case NetworkConstants.UPDATE_BALANCE_SUCCESS:
      return {
        ...state,
        balances: {
          ...state.balances,
          [action.account]: action.balance
        }
      }

    case WalletConstants.LOCK_WALLET:
      return {
        ...state,
        locked: true,
        tryUnlock: false
      }

    case WalletConstants.UNLOCK_WALLET:
      return {
        ...state,
        tryUnlock: true
      }

    case WalletConstants.UNLOCKED_WALLET:
      return {
        ...state,
        tryUnlock: false,
        locked: false
      }
  }

  return state
}
