import { IdentityConstants } from 'actions/Identity'
import { NetworkConstants } from 'actions/Network'

const officialIdentities =
  typeof OfficialIdentities !== 'undefined' ? OfficialIdentities : []

const initialState = {
  contract: null,
  officialIdentities: [],
  identities: [],
  claimVerifiers: [],
  keys: [],
  claims: [],
  createIdentityResponse: undefined,
  createVerifierResponse: undefined,
  createKeyResponse: undefined,
  createClaimResponse: undefined,
  removeClaimResponse: undefined,
  checkClaimResponse: undefined,
  approveExecutionResponse: undefined,
  eventsResponse: undefined,
  lastDeployedIdentity: undefined,
  events: []
}

function getInitialState() {
  var state = {
    ...initialState
  }
  try {
    state.identities = JSON.parse(localStorage.identities)
  } catch (e) {
    /* Ignore */
  }
  try {
    state.claimVerifiers = JSON.parse(localStorage.claimVerifiers)
  } catch (e) {
    /* Ignore */
  }
  return applyContractNames(state)
}

function applyContractNames(state) {
  var names = {}
  state.identities.forEach(i => (names[i.address] = i.name))
  state.claimVerifiers.forEach(i => (names[i.address] = i.name))
  return { ...state, names }
}

export const Purposes = [
  { id: '1', name: 'Management' },
  { id: '2', name: 'Action' },
  { id: '3', name: 'Claim Signer' },
  { id: '4', name: 'Encryption' }
]

export const KeyTypes = [{ id: '1', name: 'ECDSA' }, { id: '2', name: 'RSA' }]

export default function Identity(state = getInitialState(), action = {}) {
  switch (action.type) {
    case NetworkConstants.CHANGE_SUCCESS:
      return {
        ...state,
        officialIdentities: officialIdentities[action.id] || []
      }

    case IdentityConstants.RESET:
      return getInitialState()

    case IdentityConstants.CHECK_CLAIM:
      return { ...state, checkClaimResponse: 'submitted' }

    case IdentityConstants.CHECK_CLAIM_HASH:
      return { ...state, checkClaimResponse: 'in-pool' }

    case IdentityConstants.CHECK_CLAIM_SUCCESS:
      return { ...state, checkClaimResponse: 'success' }

    case IdentityConstants.CHECK_CLAIM_ERROR:
      return { ...state, checkClaimResponse: 'error' }

    case IdentityConstants.ADD_CLAIM:
      return { ...state, addClaimResponse: 'submitted' }

    case IdentityConstants.ADD_CLAIM_HASH:
      return { ...state, addClaimResponse: 'in-pool' }

    case IdentityConstants.ADD_CLAIM_SUCCESS:
      return { ...state, addClaimResponse: 'success' }

    case IdentityConstants.ADD_CLAIM_ERROR:
      return { ...state, addClaimResponse: 'error' }

    case IdentityConstants.REMOVE_CLAIM:
      return { ...state, removeClaimResponse: 'submitted' }

    case IdentityConstants.REMOVE_CLAIM_HASH:
      return { ...state, removeClaimResponse: 'in-pool' }

    case IdentityConstants.REMOVE_CLAIM_SUCCESS:
      return { ...state, removeClaimResponse: 'success' }

    case IdentityConstants.REMOVE_CLAIM_ERROR:
      return { ...state, removeClaimResponse: 'error' }

    case IdentityConstants.ADD_KEY:
      return { ...state, addKeyResponse: 'submitted' }

    case IdentityConstants.ADD_KEY_HASH:
      return { ...state, addKeyResponse: 'in-pool' }

    case IdentityConstants.ADD_KEY_SUCCESS:
      return { ...state, addKeyResponse: 'success' }

    case IdentityConstants.ADD_KEY_ERROR:
      return { ...state, addKeyResponse: 'error' }

    case IdentityConstants.REMOVE_KEY:
      return { ...state, removeKeyResponse: 'submitted' }

    case IdentityConstants.REMOVE_KEY_HASH:
      return { ...state, removeKeyResponse: 'in-pool' }

    case IdentityConstants.REMOVE_KEY_SUCCESS:
      return { ...state, removeKeyResponse: 'success' }

    case IdentityConstants.REMOVE_KEY_ERROR:
      return { ...state, removeKeyResponse: 'error' }

    case IdentityConstants.APPROVE_EXECUTION:
      return { ...state, approveExecutionResponse: 'submitted' }

    case IdentityConstants.APPROVE_EXECUTION_HASH:
      return { ...state, approveExecutionResponse: 'in-pool' }

    case IdentityConstants.APPROVE_EXECUTION_SUCCESS:
      return { ...state, approveExecutionResponse: 'success' }

    case IdentityConstants.APPROVE_EXECUTION_ERROR:
      return { ...state, approveExecutionResponse: 'error' }

    case IdentityConstants.DEPLOY:
      return { ...state, createIdentityResponse: 'submitted' }

    case IdentityConstants.DEPLOY_HASH:
      return { ...state, createIdentityResponse: 'in-pool' }

    case IdentityConstants.DEPLOY_RECEIPT: {
      let newState = {
        ...state,
        createIdentityResponse: 'success',
        identities: [
          ...state.identities,
          {
            name: action.name,
            address: action.receipt.contractAddress,
            owner: action.owner,
            type: action.identityType,
            signerServices: action.signerServices
          }
        ],
        lastDeployedIdentity: action.receipt.contractAddress
      }
      localStorage.identities = JSON.stringify(newState.identities)
      return applyContractNames(newState)
    }

    case IdentityConstants.IMPORT: {
      let newState = {
        ...state,
        identities: [
          ...state.identities,
          {
            name: action.name,
            address: action.address,
            owner: action.owner,
            type: action.identityType
          }
        ]
      }
      localStorage.identities = JSON.stringify(newState.identities)
      return applyContractNames(newState)
    }

    case IdentityConstants.DEPLOY_VERIFIER:
      return { ...state, createVerifierResponse: 'submitted' }

    case IdentityConstants.DEPLOY_VERIFIER_HASH:
      return {
        ...state,
        contract: action.contract,
        createVerifierResponse: 'in-pool'
      }

    case IdentityConstants.DEPLOY_VERIFIER_RECEIPT: {
      let newState = {
        ...state,
        createVerifierResponse: 'success',
        claimVerifiers: [
          ...state.claimVerifiers,
          {
            name: action.name,
            address: action.receipt.contractAddress,
            owner: action.owner,
            trustedIdentity: action.trustedIdentity,
            methodName: action.methodName,
            claimType: action.claimType
          }
        ]
      }
      localStorage.claimVerifiers = JSON.stringify(newState.claimVerifiers)
      return applyContractNames(newState)
    }

    case IdentityConstants.GET_EVENTS:
      return { ...state, eventsResponse: null }

    case IdentityConstants.GET_EVENTS_SUCCESS:
      return { ...state, events: action.events, eventsResponse: 200 }

    case IdentityConstants.REMOVE: {
      let newState = {
        ...state,
        identities: state.identities.filter(i => i.address !== action.address)
      }
      localStorage.identities = JSON.stringify(newState.identities)
      return applyContractNames(newState)
    }

    case IdentityConstants.REMOVE_VERIFIER: {
      let newState = {
        ...state,
        claimVerifiers: state.claimVerifiers.filter(
          i => i.address !== action.address
        )
      }
      localStorage.claimVerifiers = JSON.stringify(newState.claimVerifiers)
      return applyContractNames(newState)
    }
  }

  return state
}
