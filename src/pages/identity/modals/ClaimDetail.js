import React, { Component } from 'react'
import {
  fromRpcSig,
  ecrecover,
  toBuffer,
  bufferToHex,
  pubToAddress
} from 'ethereumjs-util'

import { claimType, scheme } from 'actions/Identity'

import Identity from 'contracts/ClaimHolder'
import Modal from 'components/Modal'

class Row extends Component {
  constructor() {
    super()
    this.state = { expanded: false }
  }
  render() {
    var { label, val, className } = this.props
    return (
      <tr
        className={className}
        onClick={() => this.setState({ expanded: !this.state.expanded })}
      >
        <th className="pr-2 text-right">{label}</th>
        <td className="w-100 position-relative">
          <div className={this.state.expanded ? 'wb' : 'ellipsis'}>{val}</div>
        </td>
      </tr>
    )
  }
}

class ClaimDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    var identity = new web3.eth.Contract(
      Identity.abi,
      this.props.identity.address
    )
    var claim = await identity.methods.getClaim(this.props.claimId).call()
    if (claim) {
      var dataBuf = toBuffer(claim.data)
      var sig = fromRpcSig(claim.signature)
      var recovered = ecrecover(dataBuf, sig.v, sig.r, sig.s)
      var recoveredKeyBuf = pubToAddress(recovered)
      var recoveredKey = bufferToHex(recoveredKeyBuf)
      var hashedRecovered = web3.utils.soliditySha3(recoveredKey)

      var issuer = new web3.eth.Contract(Identity.abi, claim.issuer)
      var hasKey = await issuer.methods.keyHasPurpose(hashedRecovered, 3).call()

      this.setState({ claim, recoveredKey, hasKey, hashedRecovered })
    }
  }

  render() {
    const { claim, hasKey } = this.state
    if (!claim) {
      return null
    }

    return (
      <Modal style={{ maxWidth: 375 }} onClose={() => this.props.onClose()}>
        <div className="p-3">
          <a
            href="#"
            className="close"
            onClick={e => {
              e.preventDefault()
              this.props.onClose()
            }}
          >
            &times;
          </a>
          <b>Claim Detail</b>
          <table className="table table-sm mt-3 table-hover mb-0">
            <tbody>
              <Row label="ID" val={this.props.claimId} />
              <Row
                label="Type"
                val={`${claimType(claim.claimType)} (${claim.claimType})`}
              />
              <Row
                label="Scheme"
                val={`${scheme(claim.scheme)} (${claim.scheme})`}
              />
              <Row label="Issuer" val={claim.issuer} />
              <Row label="Signature" val={claim.signature} />
              <Row label="Data" val={claim.data} />
              <Row label="URI" val={claim.uri} />
              <Row
                className="bt"
                label="Recovered"
                val={this.state.recoveredKey}
              />
              <Row label="Hashed" val={this.state.hashedRecovered} />
              <Row
                label="Valid?"
                val={
                  <span
                    className={`font-weight-bold text-${
                      hasKey ? 'success' : 'danger'
                    }`}
                  >
                    {hasKey ? 'Yes' : 'No'}
                  </span>
                }
              />
            </tbody>
          </table>
        </div>
      </Modal>
    )
  }
}

export default ClaimDetail

require('react-styl')(`
  .bt td, .bt th
    border-top-width: 3px
  .wb
    word-break: break-all
  .ellipsis
    position: absolute
    width: 100%
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
`)
