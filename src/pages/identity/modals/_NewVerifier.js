import React, { Component } from 'react'

import Modal from 'components/Modal'
import FormRow from 'components/FormRow'
import Loading from 'components/Loading'

import { ClaimTypes } from 'actions/Identity'

class NewVerifier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      claimType: '10',
      trustedIdentity: props.identities[0] ? props.identities[0].address : '',
      methodName: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response !== 'success' && nextProps.response === 'success') {
      this.setState({ shouldClose: true, submitted: true, loading: false })
    }
    if (!this.props.response && nextProps.response === 'submitted') {
      this.setState({ loading: true })
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
        onOpen={() => this.nameInput.focus()}
        onPressEnter={() => this.onDeploy()}
      >
        <Loading show={this.state.loading} />
        <div className="font-weight-bold mb-3">
          Deploy a new Claim Checker Contract:
        </div>
        {!this.props.identities.length && (
          <div className="alert alert-warning py-1 px-2 mt-2">
            {`Try deploying a Certifier first`}
          </div>
        )}

        <table className="w-100">
          <tbody>
            <FormRow label="Name">
              <input
                className="form-control"
                type="text"
                value={this.state.name}
                ref={r => (this.nameInput = r)}
                onChange={e => this.setState({ name: e.currentTarget.value })}
              />
            </FormRow>
            <FormRow label="Trusted Issuer">
              <select
                className="form-control"
                value={this.state.trustedIdentity}
                onChange={e => {
                  this.setState({
                    trustedIdentity: e.currentTarget.value
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
            <FormRow label="Method Name">
              <input
                className="form-control"
                type="text"
                value={this.state.methodName}
                onChange={e =>
                  this.setState({ methodName: e.currentTarget.value })
                }
              />
            </FormRow>
          </tbody>
        </table>
        <div className="text-right mt-2">
          <button className="btn btn-primary" onClick={() => this.onDeploy()}>
            Deploy
          </button>
        </div>
      </Modal>
    )
  }

  onDeploy() {
    const { name, trustedIdentity, methodName, claimType } = this.state
    this.props.deployClaimVerifier({
      name,
      trustedIdentity,
      methodName,
      claimType
    })
  }
}

export default NewVerifier
