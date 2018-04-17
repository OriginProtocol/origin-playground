import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

import { ClaimTypes } from 'actions/Identity'

class CheckClaim extends Component {
  constructor(props) {
    super(props)
    this.state = {
      claimType: '3',
      identity: props.identities[0] ? props.identities[0].address : '',
      verifier: props.identity,
      submitted: false
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
  }

  render() {
    return (
      <Modal
        style={{ maxWidth: 375 }}
        shouldClose={this.state.shouldClose}
        submitted={this.state.submitted}
        onClose={() => this.props.onClose()}
      >
        <Loading show={this.state.loading} />
        <div className="p-3">
          <div className="mb-2 font-weight-bold">Check for valid claim:</div>
          <table>
            <tbody>
              <FormRow label="Identity">
                <select
                  className="form-control"
                  value={this.state.identity}
                  onChange={e => {
                    this.setState({
                      identity: e.currentTarget.value
                    })
                  }}
                >
                  {(this.props.identities || []).map((identity, idx) => (
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
            </tbody>
          </table>
          <div className="text-right">
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({ submitted: true })
                this.props.checkClaim(
                  this.state.verifier,
                  this.state.identity,
                  this.state.claimType
                )
              }}
            >
              Check Claim
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default CheckClaim
