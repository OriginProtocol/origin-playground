import keyMirror from 'utils/keyMirror'
import Identity from '../contracts/Identity'
import ClaimHolder from '../contracts/ClaimHolder'
import ClaimVerifier from '../contracts/ClaimVerifier'

import { updateBalance } from './Wallet'

if (typeof window !== 'undefined') {
  window.contracts = {
    ClaimHolder: addr => new web3.eth.Contract(ClaimHolder.abi, addr),
    ClaimVerifier: addr => new web3.eth.Contract(ClaimVerifier.abi, addr),
    Identity: addr => {
      var i = new web3.eth.Contract(Identity.abi, addr)
      i.options.data = '0x' + Identity.data
      return i
    }
  }
}

function lookup(Types) {
  return function claimType(id) {
    var type = Types.find(t => t.id === id)
    return type ? type.value : id
  }
}

const chainConstants = c => ({
  [`${c}`]: null,
  [`${c}_HASH`]: null,
  [`${c}_RECEIPT`]: null,
  [`${c}_SUCCESS`]: null,
  [`${c}_CONFIRMATION`]: null,
  [`${c}_ERROR`]: null
})

export const KeyPurpose = [
  { id: '1', value: 'Management' },
  { id: '2', value: 'Action' },
  { id: '3', value: 'Claim Signer' },
  { id: '4', value: 'Encryption' }
]

export function keyPurpose(id) {
  var keyPurpose = KeyPurpose.find(t => t.id === id)
  return keyPurpose ? keyPurpose.value : id
}

export const KeyTypes = [{ id: '1', value: 'ECDSA' }, { id: '2', value: 'RSA' }]
export const keyType = lookup(KeyTypes)

export const Schemes = [
  { id: '1', value: 'ECDSA' },
  { id: '2', value: 'RSA' },
  { id: '3', value: 'Contract Call' },
  { id: '4', value: 'Self-Claim' }
]
export const scheme = lookup(Schemes)

export const ClaimTypes = [
  { id: '10', value: 'Full Name' },
  { id: '11', value: 'Origin Profile' },
  { id: '8', value: 'Email' },
  { id: '3', value: 'Has Facebook' },
  { id: '4', value: 'Has Twitter' },
  { id: '5', value: 'Has GitHub' },
  { id: '6', value: 'Has Google' },
  { id: '9', value: 'Has LinkedIn' },
  { id: '7', value: 'Verified' }
]
export const claimType = lookup(ClaimTypes)

export const IdentityConstants = keyMirror(
  {
    FIND: null,
    FIND_SUCCESS: null,
    REMOVE: null,
    REMOVE_SUCCESS: null,
    REMOVE_VERIFIER: null,
    GET_EVENTS: null,
    GET_EVENTS_SUCCESS: null,
    RESET: null,
    IMPORT: null,
    ...chainConstants('DEPLOY'),
    ...chainConstants('DEPLOY_VERIFIER'),
    ...chainConstants('ADD_KEY'),
    ...chainConstants('REMOVE_KEY'),
    ...chainConstants('ADD_CLAIM'),
    ...chainConstants('REMOVE_CLAIM'),
    ...chainConstants('APPROVE_EXECUTION'),
    ...chainConstants('CHECK_CLAIM')
  },
  'IDENTITY'
)

export function deployIdentityContract(
  name,
  identityType,
  uri,
  preAdd,
  icon,
  signerServices
) {
  return async function(dispatch) {
    var RawContract = preAdd ? Identity : ClaimHolder

    var Contract = new web3.eth.Contract(RawContract.abi)
    var tx = Contract.deploy({
      data: '0x' + RawContract.data,
      arguments: preAdd
    }).send({ gas: 4612388, from: web3.eth.defaultAccount })

    var data = {
      name,
      identityType,
      uri,
      preAdd,
      icon,
      owner: web3.eth.defaultAccount,
      signerServices
    }

    dispatch(sendTransaction(tx, IdentityConstants.DEPLOY, data))
  }
}

export function importIdentityContract(address, name) {
  return async function(dispatch) {
    var Contract = new web3.eth.Contract(ClaimHolder.abi, address)
    var events = await Contract.getPastEvents('allEvents', { fromBlock: 0 })
    var tx = await web3.eth.getTransaction(events[0].transactionHash)

    dispatch({
      type: IdentityConstants.IMPORT,
      name,
      address,
      identityType: 'identity',
      owner: tx.from
    })
  }
}

export function deployClaimVerifier(args) {
  return async function(dispatch) {
    var Contract = new web3.eth.Contract(ClaimVerifier.abi)
    var tx = Contract.deploy({
      data: '0x' + ClaimVerifier.data,
      arguments: [args.trustedIdentity]
    }).send({ gas: 4612388, from: web3.eth.defaultAccount })

    var data = {
      ...args,
      owner: web3.eth.defaultAccount
    }

    dispatch(sendTransaction(tx, IdentityConstants.DEPLOY_VERIFIER, data))
  }
}

export function addKey({ purpose, keyType, key, identity }) {
  return async function(dispatch) {
    var data = { purpose, keyType, key, identity }

    const Contract = new web3.eth.Contract(ClaimHolder.abi, identity)

    try {
      Contract.methods.addKey(key, purpose, keyType).encodeABI()
    } catch (e) {
      dispatch({
        type: IdentityConstants.ADD_KEY_ERROR,
        error: e,
        message: e.message
      })
      return
    }

    var tx = Contract.methods.addKey(key, purpose, keyType).send({
      gas: 4612388,
      from: web3.eth.defaultAccount
    })

    dispatch(
      sendTransaction(tx, IdentityConstants.ADD_KEY, data, () => {
        dispatch(getEvents('ClaimHolder', identity))
      })
    )
  }
}

export function removeKey({ identity, key }) {
  return async function(dispatch) {
    const Contract = new web3.eth.Contract(ClaimHolder.abi, identity)
    var tx = Contract.methods.removeKey(key).send({
      from: web3.eth.defaultAccount,
      gas: 3000000
    })

    dispatch(
      sendTransaction(tx, IdentityConstants.REMOVE_KEY, null, () => {
        dispatch(getEvents('ClaimHolder', identity))
      })
    )
  }
}

export function approveExecution(identity, executionId) {
  return async function(dispatch) {
    const Contract = new web3.eth.Contract(ClaimHolder.abi, identity)
    var tx = Contract.methods.approve(executionId, true).send({
      from: web3.eth.defaultAccount,
      gas: 3000000
    })

    dispatch(
      sendTransaction(tx, IdentityConstants.APPROVE_EXECUTION, null, () => {
        dispatch(getEvents('ClaimHolder', identity))
      })
    )
  }
}

export function checkClaim(verifier, identity, claimType) {
  return function(dispatch) {
    dispatch({ type: IdentityConstants.CHECK_CLAIM })

    const Contract = new web3.eth.Contract(ClaimVerifier.abi, verifier)

    var tx = Contract.methods.checkClaim(identity, claimType).send({
      from: web3.eth.defaultAccount,
      gas: 3000000
    })

    dispatch(
      sendTransaction(tx, IdentityConstants.CHECK_CLAIM, {}, () => {
        dispatch(getEvents('ClaimVerifier', verifier))
      })
    )
  }
}

export function getEvents(type, address) {
  return async function(dispatch) {
    dispatch({ type: IdentityConstants.GET_EVENTS })

    var contract = new web3.eth.Contract(
      type === 'ClaimHolder' ? ClaimHolder.abi : ClaimVerifier.abi,
      address
    )

    var events = await contract.getPastEvents('allEvents', {
      fromBlock: 0,
      toBlock: 'latest'
    })

    dispatch({ type: IdentityConstants.GET_EVENTS_SUCCESS, events })
  }
}

export function removeIdentity(address) {
  return { type: IdentityConstants.REMOVE, address }
}

export function removeVerifier(address) {
  return { type: IdentityConstants.REMOVE_VERIFIER, address }
}

export function reset() {
  return { type: IdentityConstants.RESET }
}

export function addClaim({
  data,
  claimIssuer,
  targetIdentity,
  uri,
  claimType,
  scheme,
  signature,
  refresh
}) {
  return async function(dispatch) {
    var txData = {
      data,
      claimIssuer,
      targetIdentity,
      uri,
      claimType,
      scheme,
      signature
    }

    var hexedData = web3.utils.asciiToHex(data)

    if (!signature) {
      if (String(scheme) === '1') {
        signature = await web3.eth.sign(
          web3.utils.soliditySha3(targetIdentity, claimType, hexedData),
          web3.eth.defaultAccount
        )
      } else {
        signature = web3.utils.asciiToHex('')
      }
    }

    var UserIdentity = new web3.eth.Contract(ClaimHolder.abi, targetIdentity)

    var abi = await UserIdentity.methods
      .addClaim(claimType, scheme, claimIssuer, signature, hexedData, uri)
      .encodeABI()

    var tx = UserIdentity.methods.execute(targetIdentity, 0, abi).send({
      gas: 4612388,
      from: web3.eth.defaultAccount
    })

    dispatch(
      sendTransaction(tx, IdentityConstants.ADD_CLAIM, txData, () => {
        if (refresh) {
          dispatch(getEvents('ClaimHolder', targetIdentity))
        }
      })
    )
  }
}

export function removeClaim({ identity, claim }) {
  return async function(dispatch, getState) {
    dispatch({ type: IdentityConstants.REMOVE_CLAIM, claim })

    var state = getState()

    const Contract = new web3.eth.Contract(ClaimHolder.abi, identity)

    var tx = Contract.methods.removeClaim(claim).send({
      from: state.wallet.activeAddress,
      gas: 3000000
    })

    dispatch(
      sendTransaction(tx, IdentityConstants.REMOVE_CLAIM, {}, () => {
        dispatch(getEvents('ClaimHolder', identity))
      })
    )
  }
}

function sendTransaction(transaction, type, data, callback) {
  return async function(dispatch) {
    dispatch({ type, ...data })

    transaction
      .on('error', error => {
        dispatch({
          type: `${type}_ERROR`,
          message: error.message
        })
      })
      .on('transactionHash', hash => {
        dispatch({ type: `${type}_HASH`, hash })
      })
      .on('receipt', receipt => {
        dispatch({ type: `${type}_RECEIPT`, receipt, ...data })
        dispatch(updateBalance())
      })
      .on('confirmation', num => {
        dispatch({ type: `${type}_CONFIRMATION`, num })
      })
      .then(receipt => {
        dispatch({ type: `${type}_SUCCESS`, receipt, ...data })
        if (callback) {
          callback()
        }
      })
      .catch(err => {
        dispatch({
          type: `${type}_ERROR`,
          message: err.message
        })
      })
  }
}
