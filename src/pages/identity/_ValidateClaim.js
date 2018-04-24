import React, { Component } from 'react'
import {
  fromRpcSig,
  ecrecover,
  toBuffer,
  bufferToHex,
  pubToAddress
} from 'ethereumjs-util'

import ClaimHolder from '../../contracts/ClaimHolder'

class ValidateClaim extends Component {
  constructor() {
    super()
    this.state = { valid: false, icon: 'fa-spinner fa-spin' }
  }

  componentDidMount() {
    this.validate()
  }

  async validate() {
    var claim = this.props.claim,
      hasKey

    var hashedSignature = web3.utils.soliditySha3(
      this.props.subject,
      claim.claimType,
      claim.data
    )
    const prefixedMsg = web3.eth.accounts.hashMessage(hashedSignature)

    if (claim.scheme === '4') {
      hasKey = true
    } else {
      var dataBuf = toBuffer(prefixedMsg)
      var sig = fromRpcSig(claim.signature)
      var recovered = ecrecover(dataBuf, sig.v, sig.r, sig.s)
      var recoveredKeyBuf = pubToAddress(recovered)
      var recoveredKey = bufferToHex(recoveredKeyBuf)
      var hashedRecovered = web3.utils.soliditySha3(recoveredKey)

      var issuer = new web3.eth.Contract(ClaimHolder.abi, claim.issuer)
      try {
        hasKey = await issuer.methods.keyHasPurpose(hashedRecovered, 3).call()
      } catch (e) {
        /* Ignore */
      }
    }

    this.setState({
      icon: hasKey ? 'fa-check' : 'fa-times',
      className: hasKey ? 'text-success' : 'text-danger',
      text: hasKey ? 'Valid' : 'Invalid'
    })
  }

  render() {
    return (
      <span className={this.state.className}>
        {this.state.text}
        <i className={`ml-2 fa ${this.state.icon}`} />
      </span>
    )
  }
}

export default ValidateClaim
