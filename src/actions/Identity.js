import keyMirror from 'utils/keyMirror'
import Identity from '../contracts/Identity'
import ClaimHolder from '../contracts/ClaimHolder'
import ClaimVerifier from '../contracts/ClaimVerifier'

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
  { id: '3', value: 'Contract Call' }
]
export const scheme = lookup(Schemes)

export const ClaimTypes = [
  { id: '3', value: 'Has Facebook' },
  { id: '4', value: 'Has Twitter' },
  { id: '5', value: 'Has GitHub' },
  { id: '6', value: 'Has Google' }
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

export function deployIdentityContract(name, identityType, uri, preAdd, icon) {
  return async function(dispatch, getState) {
    dispatch({
      type: IdentityConstants.DEPLOY,
      name,
      identityType,
      uri,
      preAdd,
      icon
    })

    var RawContract = preAdd ? Identity : ClaimHolder

    var state = getState()
    var Contract = new web3.eth.Contract(RawContract.abi)
    var data = await Contract.deploy({
      data: '0x' + RawContract.data,
      arguments: preAdd
    }).encodeABI()

    var signedTx = await state.wallet.active.signTransaction({
      data,
      value: 0,
      gas: 4612388,
      from: state.wallet.active.address,
      chainId: state.network.id > 10 ? 1 : state.network.id
    })

    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .on('error', error => {
        dispatch({
          type: IdentityConstants.DEPLOY_ERROR,
          message: error.message,
          name
        })
      })
      .on('transactionHash', hash => {
        dispatch({ type: IdentityConstants.DEPLOY_HASH, name, hash })
      })
      .on('receipt', receipt => {
        dispatch({
          type: IdentityConstants.DEPLOY_RECEIPT,
          receipt,
          name,
          identityType,
          contract: new web3.eth.Contract(
            RawContract.abi,
            receipt.contractAddress
          )
        })
      })
      .on('confirmation', (num, receipt) => {
        if (num === 1) {
          dispatch({
            type: IdentityConstants.DEPLOY_SUCCESS,
            name,
            receipt,
            owner: state.wallet.activeAddress,
            identityType,
            uri,
            icon
          })
        } else {
          dispatch({ type: IdentityConstants.DEPLOY_CONFIRMATION, name, num })
        }
      })
  }
}

export function deployClaimVerifier(name, trustedIdentity) {
  return async function(dispatch, getState) {
    dispatch({ type: IdentityConstants.DEPLOY_VERIFIER })

    var state = getState()

    var Contract = new web3.eth.Contract(ClaimVerifier.abi)

    var deploy = {
      data: '0x' + ClaimVerifier.data,
      arguments: [trustedIdentity]
    }

    var data = await Contract.deploy(deploy).encodeABI()

    var signedTx = await state.wallet.active.signTransaction({
      data,
      value: 0,
      gas: 4612388,
      from: state.wallet.active.address,
      chainId: state.network.id > 10 ? 1 : state.network.id
    })

    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .on('error', error => {
        dispatch({
          type: IdentityConstants.DEPLOY_VERIFIER_ERROR,
          message: error.message
        })
      })
      .on('transactionHash', hash => {
        dispatch({ type: IdentityConstants.DEPLOY_VERIFIER_HASH, hash })
      })
      .on('receipt', async receipt => {
        dispatch({
          type: IdentityConstants.DEPLOY_VERIFIER_RECEIPT,
          receipt,
          name,
          contract: new web3.eth.Contract(
            ClaimVerifier.abi,
            receipt.contractAddress
          )
        })
      })
      .on('confirmation', (num, receipt) => {
        if (num === 1) {
          dispatch({
            type: IdentityConstants.DEPLOY_VERIFIER_SUCCESS,
            name,
            owner: state.wallet.activeAddress,
            trustedIdentity,
            receipt
          })
        } else {
          dispatch({
            type: IdentityConstants.DEPLOY_VERIFIER_CONFIRMATION,
            name,
            num
          })
        }
      })
  }
}

export function addKey({ purpose, keyType, key, identity }) {
  return async function(dispatch, getState) {
    dispatch({ type: IdentityConstants.ADD_KEY })

    var state = getState()

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
      from: state.wallet.activeAddress,
      gas: 3000000,
      chainId: state.network.id > 10 ? 1 : state.network.id
    })

    dispatchWeb3Events({
      tx,
      type: IdentityConstants.ADD_KEY,
      dispatch,
      callback: () => dispatch(getEvents('ClaimHolder', identity))
    })
  }
}

export function removeKey({ identity, key }) {
  return async function(dispatch, getState) {
    dispatch({ type: IdentityConstants.REMOVE_KEY })

    var state = getState()

    const Contract = new web3.eth.Contract(ClaimHolder.abi, identity)

    var tx = Contract.methods.removeKey(key).send({
      from: state.wallet.activeAddress,
      gas: 3000000,
      chainId: state.network.id > 10 ? 1 : state.network.id
    })

    dispatchWeb3Events({
      tx,
      type: IdentityConstants.REMOVE_KEY,
      dispatch,
      callback: () => dispatch(getEvents('ClaimHolder', identity))
    })
  }
}

export function removeClaim({ identity, claim }) {
  return async function(dispatch, getState) {
    dispatch({ type: IdentityConstants.REMOVE_CLAIM, claim })

    var state = getState()

    const Contract = new web3.eth.Contract(ClaimHolder.abi, identity)

    var tx = Contract.methods.removeClaim(claim).send({
      from: state.wallet.activeAddress,
      gas: 3000000,
      chainId: state.network.id > 10 ? 1 : state.network.id
    })

    dispatchWeb3Events({
      tx,
      type: IdentityConstants.REMOVE_CLAIM,
      dispatch,
      callback: () => dispatch(getEvents('ClaimHolder', identity))
    })
  }
}

export function approveExecution(identity, executionId) {
  return async function(dispatch, getState) {
    dispatch({ type: IdentityConstants.APPROVE_EXECUTION })

    var state = getState()

    const Contract = new web3.eth.Contract(ClaimHolder.abi, identity)

    var tx = Contract.methods.approve(executionId, true).send({
      from: state.wallet.activeAddress,
      gas: 3000000,
      chainId: state.network.id > 10 ? 1 : state.network.id
    })

    dispatchWeb3Events({
      tx,
      type: IdentityConstants.APPROVE_EXECUTION,
      dispatch,
      callback: () => dispatch(getEvents('ClaimVerifier', identity))
    })
  }
}

export function checkClaim(verifier, identity, claimType) {
  return async function(dispatch, getState) {
    dispatch({ type: IdentityConstants.CHECK_CLAIM })

    var state = getState()

    const Contract = new web3.eth.Contract(ClaimVerifier.abi, verifier)

    var tx = Contract.methods.checkClaim(identity, claimType).send({
      from: state.wallet.activeAddress,
      gas: 3000000,
      chainId: state.network.id > 10 ? 1 : state.network.id
    })

    dispatchWeb3Events({
      tx,
      type: IdentityConstants.CHECK_CLAIM,
      dispatch,
      callback: () => dispatch(getEvents('ClaimVerifier', verifier))
    })
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
  messageHash
}) {
  return async function(dispatch, getState) {
    dispatch({
      type: IdentityConstants.ADD_CLAIM,
      data: {
        data,
        claimIssuer,
        targetIdentity,
        uri,
        claimType,
        scheme,
        signature,
        messageHash
      }
    })

    var state = getState()

    if (!signature && !messageHash) {
      ({ signature, messageHash } = await web3.eth.accounts.sign(
        data,
        state.wallet.active.privateKey
      ))
    }

    var UserIdentity = new web3.eth.Contract(ClaimHolder.abi, targetIdentity)

    var abi = await UserIdentity.methods
      .addClaim(claimType, scheme, claimIssuer, signature, messageHash, uri)
      .encodeABI()

    var executeAbi = await UserIdentity.methods
      .execute(targetIdentity, 0, abi)
      .encodeABI()

    var signedTx = await state.wallet.active.signTransaction({
      data: executeAbi,
      gas: 4612388,
      to: UserIdentity._address,
      value: 0,
      chainId: state.network.id > 10 ? 1 : state.network.id
    })

    dispatchWeb3Events({
      tx: web3.eth.sendSignedTransaction(signedTx.rawTransaction),
      type: IdentityConstants.ADD_CLAIM,
      dispatch,
      callback: () => dispatch(getEvents('ClaimHolder', targetIdentity))
    })
  }
}

function dispatchWeb3Events({ tx, type, dispatch, callback }) {
  tx
    .on('error', error => {
      dispatch({
        type: `${type}_ERROR`,
        message: error.message
      })
    })
    .on('transactionHash', hash => {
      dispatch({ type: `${type}_HASH`, hash })
    })
    .on('receipt', async receipt => {
      dispatch({
        type: `${type}_RECEIPT`,
        receipt
      })
    })
    .on('confirmation', (num, receipt) => {
      if (num === 1) {
        dispatch({ type: `${type}_SUCCESS`, receipt })
        callback()
      } else {
        dispatch({ type: `${type}_CONFIRMATION`, num })
      }
    })
}
