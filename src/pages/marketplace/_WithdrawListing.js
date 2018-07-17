import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class WithdrawListing extends Component {
  constructor(props) {
    super(props)
    const seller = props.parties.find(
      p => p.name === 'Seller'
    )
    this.state = {
      target: seller ? seller.address : '',
      reason: ''
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.reasonInput) {
        this.reasonInput.focus()
      }
    }, 10)
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
        <div className="font-weight-bold mb-2">Withdraw Listing:</div>
        <table className="w-100">
          <tbody>
            <FormRow label="Target">
              <select
                className="form-control"
                value={this.state.target}
                onChange={e =>
                  this.setState({ target: e.currentTarget.value })
                }
              >
                {this.props.parties.map((party, idx) => (
                  <option key={idx} value={party.address}>
                    {party.name}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Reason">
              <input
                className="form-control"
                ref={ref => (this.reasonInput = ref)}
                type="text"
                value={this.state.reason}
                onChange={e =>
                  this.setState({ reason: e.currentTarget.value })
                }
              />
            </FormRow>
          </tbody>
        </table>
        <div className="text-right">
          <button
            className="btn btn-danger"
            onClick={() => {
              this.props.withdrawListing({
                reason: this.state.reason,
                target: this.state.target
              })
            }}
          >
            Withdraw
          </button>
        </div>
      </Modal>
    )
  }
}

export default WithdrawListing
