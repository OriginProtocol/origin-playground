import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

import { KeyPurpose, KeyTypes } from 'actions/Identity'

class AddKey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyPurpose: '1',
      keyType: '1',
      key: '',
      publicKey: '',
      privateKey: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response !== 'success' && nextProps.response === 'success') {
      this.setState({ shouldClose: true, submitted: true })
    }
    if (
      this.props.response !== 'submitted' &&
      nextProps.response === 'submitted'
    ) {
      this.setState({ loading: true })
    }
    if (this.props.response !== 'error' && nextProps.response === 'error') {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <Modal
        style={{ maxWidth: 375 }}
        className="p-3"
        shouldClose={this.state.shouldClose}
        submitted={this.state.submitted}
        onClose={() => this.props.onClose()}
      >
        <Loading show={this.state.loading} />
        <div className="font-weight-bold mb-3">Add a Key to an Identity:</div>
        {this.props.wrongOwner && (
          <div className="alert alert-warning py-1 px-2 mt-2">
            {`Active wallet does not own this identity`}
          </div>
        )}
        {this.state.error && (
          <div className="alert alert-danger py-1 px-2 mt-2">
            Error! Please try again.
          </div>
        )}
        <table className="w-100">
          <tbody>
            <FormRow label="Purpose">
              <select
                className="form-control"
                value={this.state.keyPurpose}
                onChange={e => {
                  this.setState({
                    keyPurpose: e.currentTarget.value
                  })
                }}
              >
                {KeyPurpose.map(({ id, value }) => (
                  <option key={id} value={id}>
                    {value}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Type">
              <select
                className="form-control"
                value={this.state.keyType}
                onChange={e => {
                  this.setState({
                    keyType: e.currentTarget.value
                  })
                }}
              >
                {KeyTypes.map(({ id, value }) => (
                  <option key={id} value={id}>
                    {value}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Key">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.key}
                  onChange={e => this.setState({ key: e.currentTarget.value })}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => this.generateKeys()}
                  >
                    <i className="fa fa-refresh" />
                  </button>
                </div>
              </div>
            </FormRow>
            {!this.state.privateKey ? null : (
              <>
                <FormRow label="Public Key">
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={this.state.publicKey}
                  />
                </FormRow>
                <FormRow label="Private Key">
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={this.state.privateKey}
                  />
                </FormRow>
              </>
            )}
          </tbody>
        </table>
        <div className="text-right">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.addKey({
                purpose: this.state.keyPurpose,
                keyType: this.state.keyType,
                key: this.state.key,
                identity: this.props.identity
              })
            }}
          >
            Add Key
          </button>
        </div>
      </Modal>
    )
  }

  generateKeys() {
    var privateKey = web3.utils.randomHex(32)
    for (var i = privateKey.length; i < 66; i++) {
      privateKey += '0'
    }
    var publicKey = web3.eth.accounts.privateKeyToAccount(privateKey).address
    var key = web3.utils.sha3(publicKey)

    this.setState({ privateKey, publicKey, key })
  }
}

export default AddKey
