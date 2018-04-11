import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

import { ClaimTypes } from 'actions/Identity'

class AddClaim extends Component {
  constructor(props) {
    super(props)
    this.state = props.claimData || {
      claimType: '3',
      claimScheme: '1',
      claimData: '',
      claimUri: '',
      issuer: props.issuer || props.identity,
      targetIdentity: props.identities[0].address,
      signature: ''
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
        <div className="font-weight-bold mb-2">Add a Claim to an Identity:</div>
        <table className="w-100">
          <tbody>
            <FormRow label="Subject">
              <select
                className="form-control"
                value={this.state.targetIdentity}
                onChange={e => {
                  this.setState({
                    targetIdentity: e.currentTarget.value
                  })
                }}
              >
                {this.props.identities.map((identity, idx) => (
                  <option key={idx} value={identity.address}>
                    {identity.name}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Issuer">
              <select
                className="form-control"
                value={this.state.issuer}
                onChange={e => {
                  this.setState({
                    issuer: e.currentTarget.value
                  })
                }}
              >
                {this.props.identities.map((identity, idx) => (
                  <option key={idx} value={identity.address}>
                    {identity.name}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Claim Type">
              <select
                className="form-control"
                value={this.state.claimType}
                onChange={e => {
                  this.setState({
                    claimType: e.currentTarget.value
                  })
                }}
              >
                {ClaimTypes.map(ct => (
                  <option key={ct.id} value={ct.id}>
                    {ct.value}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Scheme">
              <select
                className="form-control"
                value={this.state.claimScheme}
                onChange={e => {
                  this.setState({
                    claimScheme: e.currentTarget.value
                  })
                }}
              >
                <option value="1">ECDSA</option>
                <option value="2">RSA</option>
                <option value="3">Contract Call</option>
              </select>
            </FormRow>
            <FormRow label="URI">
              <input
                className="form-control"
                type="text"
                value={this.state.claimUri}
                onChange={e =>
                  this.setState({ claimUri: e.currentTarget.value })
                }
              />
            </FormRow>
            <FormRow label="Data">
              <input
                className="form-control"
                type="text"
                value={this.state.claimData}
                onChange={e =>
                  this.setState({ claimData: e.currentTarget.value })
                }
              />
            </FormRow>
            <FormRow label="Signature">
              <input
                className="form-control"
                type="text"
                value={this.state.signature}
                onChange={e =>
                  this.setState({ signature: e.currentTarget.value })
                }
              />
            </FormRow>
          </tbody>
        </table>
        <div className="text-right mt-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.addClaim({
                data: this.state.claimData,
                prvSigner: this.state.privateKey,
                claimIssuer: this.state.issuer,
                targetIdentity: this.state.targetIdentity,
                uri: this.state.claimUri,
                claimType: this.state.claimType,
                scheme: this.state.claimScheme,
                signature: this.state.signature
              })
            }}
          >
            Add Claim
          </button>
        </div>
      </Modal>
    )
  }
}

export default AddClaim
