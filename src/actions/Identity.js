import keyMirror from 'utils/keyMirror'
import Identity from '../contracts/Identity'
import ClaimHolder from '../contracts/ClaimHolder'
import ClaimVerifier from '../contracts/ClaimVerifier'

window.contracts = {
  ClaimHolder: (addr) => new web3.eth.Contract(ClaimHolder.abi, addr),
  ClaimVerifier: (addr) => new web3.eth.Contract(ClaimVerifier.abi, addr),
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
  { id: '3', value: 'Contract Call' }
]
export const scheme = lookup(Schemes)

export const ClaimTypes = [
  { id: '3', value: 'Has Facebook' },
  { id: '4', value: 'Has Twitter' },
  { id: '5', value: 'Has GitHub' },
  { id: '6', value: 'Has Google' },
  { id: '7', value: 'Verified' },
  { id: '8', value: 'Email' }
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
      owner: web3.eth.defaultAccount
    }

    dispatch(sendTransaction(tx, IdentityConstants.DEPLOY, data))
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
      from: web3.eth.defaultAccount,
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
      gas: 4612388, from: web3.eth.defaultAccount
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
      from: web3.eth.defaultAccount, gas: 3000000
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
      from: web3.eth.defaultAccount, gas: 3000000
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
      from: web3.eth.defaultAccount, gas: 3000000
    })

    dispatch(sendTransaction(tx, IdentityConstants.CHECK_CLAIM, {}, () => {
      dispatch(getEvents('ClaimVerifier', verifier))
    }))
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
  signature
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
    };

    var hashedData = web3.utils.soliditySha3(data)

    if (!signature) {
      signature = await web3.eth.sign(
        web3.utils.soliditySha3(targetIdentity, claimType, hashedData),
        web3.eth.defaultAccount
      )
    }

    var UserIdentity = new web3.eth.Contract(ClaimHolder.abi, targetIdentity)

    var abi = await UserIdentity.methods
      .addClaim(claimType, scheme, claimIssuer, signature, hashedData, uri)
      .encodeABI()

    var tx = UserIdentity.methods
      .execute(targetIdentity, 0, abi)
      .send({
        gas: 4612388,
        from: web3.eth.defaultAccount
      })

    dispatch(sendTransaction(tx, IdentityConstants.ADD_CLAIM, txData, () => {
      if (web3.eth.defaultAccount === targetIdentity) {
        dispatch(getEvents('ClaimHolder', targetIdentity))
      }
    }))
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

    dispatch(sendTransaction(tx, IdentityConstants.REMOVE_CLAIM, {}, () => {
      dispatch(getEvents('ClaimHolder', identity))
    }))
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
