import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'
import * as Blobs from '../../../data/example-ipfs-blobs.js'

const listings = [
  { title: 'Bike For Sale', price: '50', listingType: 'For Sale', ipfs: Blobs.ForSaleListing },
  { title: 'Driver For Hire', price: '10', listingType: 'Car Share', ipfs: Blobs.RideShareListing },
  { title: 'Home For Rent', price: '85', listingType: 'Home Share', ipfs: Blobs.HomeshareListing },
  { title: 'Ticket For Sale', price: '60', listingType: 'Ticket', ipfs: Blobs.TicketedEventListing },
]

class NewListing extends Component {
  constructor(props) {
    super(props)
    const arbitrator = props.parties.find(
      p => p.name === 'Arbitrator'
    )
    this.state = {
      ...listings[Math.floor(Math.random() * listings.length)],
      currency: 'DAI',
      deposit: '10',
      arbitrator: arbitrator ? arbitrator.address : '',
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
      this.setState({ error: nextProps.error, loading: false })
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
        <div className="font-weight-bold mb-2">Add a New Listing:</div>
        {!this.state.error ? null : (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
        <table className="w-100">
          <tbody>
            <FormRow label="Deposit">
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
            <FormRow label="Arbitrator">
              <select
                className="form-control"
                value={this.state.arbitrator}
                onChange={e =>
                  this.setState({ arbitrator: e.currentTarget.value })
                }
              >
                <option value="0x0">None</option>
                {this.props.parties.map((party, idx) => (
                  <option key={idx} value={party.address}>
                    {party.name}
                  </option>
                ))}
              </select>
            </FormRow>
            <tr>
              <td colSpan={2}>
                <hr className="mt-2 mb-3" />
              </td>
            </tr>
            <FormRow label="Currency">
              <select
                className="form-control"
                value={this.state.currency}
                onChange={e => {
                  this.setState({
                    currency: e.currentTarget.value
                  })
                }}
              >
                <option>ETH</option>
                <option>DAI</option>
              </select>
            </FormRow>
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
                <option>Car Share</option>
                <option>Ticket</option>
                <option>Job Offer</option>
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
              var ipfs = {
                ...this.state.ipfs,
                title: this.state.title,
                listingType: this.state.listingType,
                price: this.state.price,
                currencyId: this.state.currency,
              }
              if (this.props.party && this.props.party.publicKey) {
                ipfs.publicKey = this.props.party.publicKey
              }
              var obj = {
                deposit: this.state.deposit,
                arbitrator: this.state.arbitrator,
                ipfs
              }
              this.props.createListing(obj)
            }}
          >
            Create
          </button>
        </div>
      </Modal>
    )
  }
}

export default NewListing
