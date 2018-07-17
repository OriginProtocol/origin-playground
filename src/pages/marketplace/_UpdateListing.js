import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class UpdateListing extends Component {
  constructor(props) {
    super(props)
    const listing = props.listing || {}
    this.state = {
      title: listing.title || '',
      price: listing.price || '',
      listingType: listing.listingType || 'For Sale',
      currency: listing.currencyId || 'DAI',
      deposit: '0'
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
        <div className="font-weight-bold mb-2">Update Listing:</div>
        <table className="w-100">
          <tbody>
            <FormRow label="+ Deposit">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.deposit}
                  onChange={e =>
                    this.setState({ deposit: e.currentTarget.value })
                  }
                />
                <div className="input-group-append">
                  <span className="input-group-text">OGN</span>
                </div>
              </div>
            </FormRow>
            <tr>
              <td colSpan={2}>
                <hr className="mt-2 mb-3" />
              </td>
            </tr>
            <FormRow label="Type">
              <select
                className="form-control"
                value={this.state.listingType}
                onChange={e => {
                  this.setState({
                    listingType: e.currentTarget.value
                  })
                }}
              >
                <option>For Sale</option>
                <option>Home Share</option>
                <option>Reservation</option>
                <option>Ticket</option>
              </select>
            </FormRow>
            <FormRow label="Title">
              <input
                className="form-control"
                type="text"
                value={this.state.title}
                onChange={e => this.setState({ title: e.currentTarget.value })}
              />
            </FormRow>
            <FormRow label="Price">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.price}
                  onChange={e =>
                    this.setState({ price: e.currentTarget.value })
                  }
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    {this.state.currency}
                  </span>
                </div>
              </div>
            </FormRow>
          </tbody>
        </table>
        <div className="text-right">
          <button
            className="btn btn-primary"
            onClick={() => {
              var obj = {
                title: this.state.title,
                listingType: this.state.listingType,
                deposit: this.state.deposit,
                price: this.state.price,
                currencyId: this.state.currency
              }
              this.props.updateListing(obj)
            }}
          >
            Update
          </button>
        </div>
      </Modal>
    )
  }
}

export default UpdateListing
