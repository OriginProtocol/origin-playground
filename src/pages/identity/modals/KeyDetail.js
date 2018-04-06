import React, { Component } from 'react'

import { keyPurpose, keyType } from 'actions/Identity'

import Identity from 'contracts/ClaimHolder'
import Modal from 'components/Modal'
import Row from 'components/DetailRow'

class KeyDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    var identity = new web3.eth.Contract(
      Identity.abi,
      this.props.identity.address
    )
    var key = await identity.methods.getKey(this.props.keyId).call()
    if (key) {
      this.setState({ key })
    }
  }

  render() {
    const { key } = this.state
    if (!key) {
      return null
    }

    return (
      <Modal
        closeBtn={true}
        className="p-3"
        onClose={() => this.props.onClose()}
      >
        <b>Key Detail</b>
        <table className="table table-sm mt-3 table-hover mb-0">
          <tbody>
            <Row
              label="Holder"
              info="The identity contract this key appears on"
            >
              {this.props.identity.address}
            </Row>
            <Row label="Purpose" info="uint256 of the key type, like 1 = MANAGEMENT, 2 = ACTION, 3 = CLAIM, 4 = ENCRYPTION types">
              {`${keyPurpose(key.purpose)} (${key.purpose})`}
            </Row>
            <Row label="Type" info="The type of key used, which would be a uint256 for different key types. e.g. 1 = ECDSA, 2 = RSA, etc.">
              {`${keyType(key.keyType)} (${key.keyType})`}
            </Row>
            <Row label="Key" info="The public key. For non-hex and long keys, its the Keccak256 hash of the key">
              {this.props.keyId}
            </Row>
          </tbody>
        </table>
      </Modal>
    )
  }
}

export default KeyDetail
