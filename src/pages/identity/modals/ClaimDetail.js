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
import Row from 'components/DetailRow'

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
      <Modal
        closeBtn={true}
        className="p-3"
        onClose={() => this.props.onClose()}
      >
        <b>Claim Detail</b>
        <table className="table table-sm mt-3 table-hover mb-0">
          <tbody>
            <Row
              label="Subject"
              info="The identity contract this claim appears on"
            >
              {this.props.identity.address}
            </Row>
            <Row
              label="Issuer"
              info="The issuers identity contract address, or the address used to sign the signature. If an identity contract, it should hold the key with which the message was signed, if the key is not present anymore, the claim SHOULD be treated as invalid. The issuer can also be a contract address itself, at which the claim can be verified using the call data."
            >
              {claim.issuer}
            </Row>
            <Row
              label="Claim ID"
              info="Claim IDs are generated using keccak256(address issuer_address + uint256 _claimType)"
            >
              {this.props.claimId}
            </Row>
            <Row
              label="Type"
              info="The number which represents the type of claim. (e.g. 1 biometric, 2 residence (ToBeDefined))"
            >{`${claimType(claim.claimType)} (${claim.claimType})`}</Row>
            <Row
              label="Scheme"
              info="The scheme with which this claim SHOULD be verified or how it should be processed. Its a uint256 for different schemes. E.g. could 3 mean contract verification, where the data will be call data, and the issuer a contract address to call (ToBeDefined). Those can also mean different key types e.g. 1 = ECDSA, 2 = RSA, etc. (ToBeDefined)"
            >{`${scheme(claim.scheme)} (${claim.scheme})`}</Row>
            <Row
              label="URI"
              info="The location of the claim. This can be an HTTP link, swarm hash, IPFS hash, etc."
            >
              {claim.uri}
            </Row>
            <Row
              label="Data"
              info="The hash of the claim data sitting at the URI, a bit-mask, call data, or actual data based on the claim scheme."
            >
              {claim.data}
            </Row>
            <Row
              label="Signature"
              info="Signature which is the proof that the claim issuer issued a claim of claimType for this identity. it MUST be a signed message of the following structure: keccak256(address subject_address, uint256 _claimType, bytes data) // or keccak256(abi.encode(subject_address, _claimType, data))"
            >
              {claim.signature}
            </Row>
            <Row
              className="bt"
              label="Recovered"
              info="The address recovered from the above signature using ecrecover(signature)"
            >
              {this.state.recoveredKey}
            </Row>
            <Row
              label="Hashed"
              info="The keccak256 hash of the recovered address"
            >
              {this.state.hashedRecovered}
            </Row>
            <Row
              label="Has Key?"
              info="Result of contract call: issuer.keyHasPurpose(hashOfRecoveredAddress, CLAIM_SIGNER)"
            >
              <span
                className={`font-weight-bold text-${
                  hasKey ? 'success' : 'danger'
                }`}
              >
                {hasKey ? 'Yes' : 'No'}
              </span>
            </Row>
          </tbody>
        </table>
      </Modal>
    )
  }
}

export default ClaimDetail

require('react-styl')(`
  th.label
    white-space: no-wrap
  td.info a
    color: #999
    &:hover
      color: #000
    &.active
      color: green
  .no-wrap
    white-space: nowrap
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
