import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'
import BtnGroup from 'components/BtnGroup'

import * as Blobs from '../../../data/example-ipfs-blobs.js'

class NewOffer extends Component {
  constructor(props) {
    super(props)
    const originArbitrator = props.parties.find(
      p => p.name === 'OriginArbitrator'
    )
    this.state = {
      amount: props.listing.ipfs.price,
      expires: this.days(1 / 6),
      finalizes: this.days(1 / 2),
      commission: '2',
      affiliate: '',
      arbitrator: originArbitrator ? originArbitrator.address : '',
      encrypt: true
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

  days(d) {
    if (this.props.timestamp) {
      return this.props.timestamp + 60 * 60 * 24 * d
    }
    return Math.floor((+new Date() + 1000 * 60 * 60 * 24 * d) / 1000)
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
        <div className="font-weight-bold mb-2">
          {`${this.props.reviseOffer !== null ? 'Revise' : 'Add a New'} Offer:`}
        </div>
        {!this.state.error ? null : (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
        <table className="w-100">
          <tbody>
            <FormRow label="Amount">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.amount}
                  onChange={e =>
                    this.setState({ amount: e.currentTarget.value })
                  }
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    {this.props.listing.ipfs.currencyId}
                  </span>
                </div>
              </div>
            </FormRow>
            <FormRow label="Finalizes">
              <select
                className="form-control"
                value={this.state.finalizes}
                onChange={e => {
                  this.setState({
                    finalizes: e.currentTarget.value
                  })
                }}
              >
                <option value={this.days(1 / 6)}>4 hours</option>
                <option value={this.days(1 / 2)}>12 hours</option>
                <option value={this.days(1)}>1 day</option>
                <option value={this.days(2)}>2 days</option>
                <option value={this.days(7)}>7 days</option>
                <option value={this.days(30)}>1 month</option>
              </select>
            </FormRow>
            <FormRow label="Affiliate">
              <select
                className="form-control"
                value={this.state.affiliate}
                onChange={e =>
                  this.setState({ affiliate: e.currentTarget.value })
                }
              >
                <option value="">None</option>
                {this.props.parties.map((party, idx) => (
                  <option key={idx} value={party.address}>
                    {party.name}
                  </option>
                ))}
              </select>
            </FormRow>
            {this.state.affiliate === '' ? null : (
              <FormRow label="Commission">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.commission}
                    onChange={e =>
                      this.setState({ commission: e.currentTarget.value })
                    }
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">OGN</span>
                  </div>
                </div>
              </FormRow>
            )}
            {this.state.affiliateType !== '3rd Party' ? null : (
              <FormRow label="Address">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.affiliate}
                  onChange={e =>
                    this.setState({ affiliate: e.currentTarget.value })
                  }
                />
              </FormRow>
            )}
            <FormRow label="Arbitrator">
              <select
                className="form-control"
                value={this.state.arbitrator}
                onChange={e =>
                  this.setState({ arbitrator: e.currentTarget.value })
                }
              >
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
            <FormRow label="Expires">
              <select
                className="form-control"
                value={this.state.expires}
                onChange={e => {
                  this.setState({
                    expires: e.currentTarget.value
                  })
                }}
              >
                <option value={this.days(1 / 6)}>4 hours</option>
                <option value={this.days(1 / 2)}>12 hours</option>
                <option value={this.days(1)}>1 day</option>
                <option value={this.days(2)}>2 days</option>
                <option value={this.days(7)}>7 days</option>
                <option value={this.days(30)}>1 month</option>
              </select>
            </FormRow>
            <FormRow label="Encrypt">
              <BtnGroup
                buttons={['Yes', 'No']}
                active={this.state.encrypt ? 'Yes' : 'No'}
                onClick={encrypt =>
                  this.setState({ encrypt: encrypt === 'Yes' })
                }
              />
            </FormRow>
          </tbody>
        </table>
        <div className="text-right">
          <button
            className="btn btn-primary"
            onClick={() => {
              var obj = {
                amount: this.state.amount,
                expires: this.state.expires,
                finalizes: this.state.finalizes,
                arbitrator: this.state.arbitrator
              }
              if (this.state.affiliate === '') {
                obj.commission = 0
              } else {
                obj.commission = this.state.commission
                obj.affiliate = this.state.affiliate
              }
              if (this.state.encrypt) {
                obj.encrypt = true
                obj.publicKey = this.props.activeParty.publicKey
              }
              if (this.props.reviseOffer !== null) {
                obj.withdraw = this.props.reviseOffer
              }

              if (this.props.listing.ipfs.listingType === 'For Sale') {
                obj = { ...Blobs.ForSaleOffer, ...obj }
              } else if (this.props.listing.ipfs.listingType === 'Car Share') {
                obj = { ...Blobs.RideShareOffer, ...obj }
              } else if (this.props.listing.ipfs.listingType === 'Home Share') {
                obj = { ...Blobs.HomeshareOffer, ...obj }
              } else if (this.props.listing.ipfs.listingType === 'Ticket') {
                obj = { ...Blobs.TicketedEventOffer, ...obj }
              }

              this.props.makeOffer(obj)
            }}
          >
            {this.props.reviseOffer !== null ? 'Revise' : 'Create'}
          </button>
        </div>
      </Modal>
    )
  }
}

export default NewOffer
