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
    var claim = this.props.claim
    var dataBuf = toBuffer(claim.data)
    var sig = fromRpcSig(claim.signature)
    var recovered = ecrecover(dataBuf, sig.v, sig.r, sig.s)
    var recoveredAddrBuf = pubToAddress(recovered)
    var recoveredAddr = bufferToHex(recoveredAddrBuf)
    var hashedRecovered = web3.utils.soliditySha3(recoveredAddr)

    var issuer = new web3.eth.Contract(ClaimHolder.abi, claim.issuer)
    var hasKey = await issuer.methods.keyHasPurpose(hashedRecovered, 3).call()

    this.setState({
      icon: hasKey ? 'fa-check text-success' : 'fa-times text-danger'
    })
  }

  render() {
    return (
      <span>
        <i className={`fa ${this.state.icon}`} />
      </span>
    )
  }
}

export default ValidateClaim
