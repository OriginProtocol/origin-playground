import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class CheckClaim extends Component {
  constructor(props) {
    super(props)
    this.state = {
      identity: props.identities[0] ? props.identities[0].address : '',
      verifier: props.verifier.address,
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
                  this.props.verifier.claimType
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
