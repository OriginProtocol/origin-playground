import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class ArbitrateListing extends Component {
  constructor(props) {
    super(props)
    const buyer = props.parties.find(p => p.name === 'Buyer')
    this.state = {
      value: '1',
      target: buyer ? buyer.address : '',
      reason: ''
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
        <div className="font-weight-bold mb-2">Arbitrate Listing:</div>
        <table className="w-100">
          <tbody>
            <FormRow label="Send to">
              <select
                className="form-control"
                value={this.state.target}
                onChange={e => this.setState({ target: e.currentTarget.value })}
              >
                {this.props.parties.map((party, idx) => (
                  <option key={idx} value={party.address}>
                    {party.name}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Amount">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.value}
                  onChange={e =>
                    this.setState({ value: e.currentTarget.value })
                  }
                />
                <div className="input-group-append">
                  <span className="input-group-text">OGN</span>
                </div>
              </div>
            </FormRow>
            <FormRow label="Reason">
              <input
                className="form-control"
                type="text"
                value={this.state.reason}
                onChange={e => this.setState({ reason: e.currentTarget.value })}
              />
            </FormRow>
          </tbody>
        </table>
        <div className="text-right">
          <button
            className="btn btn-primary"
            onClick={() => {
              var obj = {
                value: this.state.value,
                target: this.state.target,
                reason: this.state.reason
              }
              this.props.arbitrateListing(obj)
            }}
          >
            Send
          </button>
        </div>
      </Modal>
    )
  }
}

export default ArbitrateListing
