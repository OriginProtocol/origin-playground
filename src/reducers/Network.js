import { NetworkConstants } from 'actions/Network'

import Providers from 'constants/Providers'

const HOST = process.env.HOST || 'localhost'
let ipfsGateway = 'https://gateway.originprotocol.com',
  ipfsRPC = 'https://gateway.originprotocol.com',
  provider = 'https://rinkeby.infura.io',
  browserProvider = false

if (process.env.NODE_ENV !== 'production') {
  ipfsGateway = `http://${HOST}:9090`
  ipfsRPC = `http://${HOST}:5002`
  provider = `http://${HOST}:8545`
}

if (typeof window !== 'undefined') {
  provider = window.sessionStorage.provider || provider
  if (window.web3) {
    browserProvider = web3.currentProvider
  }
  window.web3 = new Web3(provider)
}

const initialState = {
  id: null,
  contract: null,
  accounts: [],
  account: null,
  status: 'disconnected',

  browserProvider,
  providers: Providers,
  provider,

  ipfsGateway,
  ipfsRPC
}

export default function Network(state = initialState, action = {}) {
  switch (action.type) {
    case NetworkConstants.GET_CONTRACT_SUCCESS:
      return {
        ...state,
        contract: action.contract
      }

    case NetworkConstants.CHANGE_SUCCESS:
      return {
        ...state,
        status: 'connected',
        id: action.id,
        contract: action.contract,
        accounts: action.accounts,
        account: action.accounts[0]
      }

    case NetworkConstants.CHANGE_ERROR:
      return {
        ...state,
        status: 'error'
      }

    case NetworkConstants.SELECT_ACCOUNT:
      return {
        ...state,
        account: state.accounts.find(a => a.hash === action.hash)
      }

    case NetworkConstants.UPDATE_BALANCE_SUCCESS:
      var acctIdx = state.accounts.findIndex(a => a.hash === action.account)
      if (acctIdx < 0) {
        return state
      }
      var accounts = [...state.accounts],
        account = {
          hash: action.account,
          balance: action.balance
        }
      accounts[acctIdx] = account
      return {
        ...state,
        accounts,
        account
      }

    case NetworkConstants.SET_PROVIDER:
      window.sessionStorage.provider = action.provider
      return {
        ...state,
        status: 'connecting',
        provider: action.provider
      }

    case NetworkConstants.SET_IPFS:
      return {
        ...state,
        ipfsGateway: action.gateway,
        ipfsRPC: action.api
      }
  }

  return state
}
