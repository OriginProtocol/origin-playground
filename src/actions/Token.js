import { generateConstants } from 'utils/generateConstants'
import Token from '../contracts/Token'
import { sendTransaction } from './helpers'

const Contract = new web3.eth.Contract(Token.abi)

export const TokenConstants = generateConstants('TOKEN', {
  chain: ['DEPLOY', 'TRANSFER', 'APPROVE']
})

export function deployTokenContract(args) {
  return async function(dispatch) {
    var tx = Contract.deploy({
      data: '0x' + Token.data,
      arguments: args
    }).send({
      gas: 4612388,
      from: web3.eth.defaultAccount
    })

    dispatch(sendTransaction(tx, TokenConstants.DEPLOY, { symbol: args[1] }))
  }
}

export function transferToken(token, to, value) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.token.contractAddresses[token]
    if (!address) {
      return
    }
    var Contract = new web3.eth.Contract(Token.abi, address)

    var tx = Contract.methods.transfer(to, value).send({
      gas: 4612388,
      from: web3.eth.defaultAccount
    })

    dispatch(sendTransaction(tx, TokenConstants.TRANSFER))
  }
}

export function approveToken(token, to, value) {
  return async function(dispatch, getState) {
    var state = getState(),
      address = state.token.contractAddresses[token]
    if (!address) {
      return
    }
    var Contract = new web3.eth.Contract(Token.abi, address)

    var tx = Contract.methods.approve(to, value).send({
      gas: 4612388,
      from: web3.eth.defaultAccount
    })

    dispatch(sendTransaction(tx, TokenConstants.APPROVE))
  }
}
