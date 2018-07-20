import React, { Component } from 'react'
import { connect } from 'react-redux'
import distanceInWords from 'date-fns/distance_in_words'

import {
  acceptOffer,
  disputeOffer,
  disputeRuling,
  finalizeOffer,
  withdrawOffer
} from 'actions/Marketplace'

import Btn from 'components/Btn'
import AcceptOffer from './_AcceptOffer'
import FinalizeOffer from './_FinalizeOffer'
import EventsTable from './_EventsTable'

function showStatus(offer, timestamp) {
  if (!timestamp) return ''
  if (offer.encrypted) return 'Encrypted'

  var expired = Number(offer.expires) < timestamp,
    status = Number(offer.status)
  if (status === 1) {
    var time = distanceInWords(timestamp * 1000, offer.expires * 1000)
    return expired
      ? `Expired ${time} ago`
      : `Expires in ${time}`.replace('in about ', '~')
  } else if (status === 2) {
    let desc = distanceInWords(timestamp * 1000, offer.finalizes * 1000)
    if (Number(offer.finalizes) < timestamp) {
      return 'Finalizied ' + desc + ' ago'
    } else {
      return `Finalizes in ${desc}`.replace('in about ', '~')
    }
  } else if (status === 3) {
    return 'Disputed'
  } else if (status === 4) {
    return 'Finalized'
  } else if (status === 0) {
    return 'Withdrawn'
  } else if (status === 5) {
    return 'Buyer Wins Dispute'
  } else if (status === 6) {
    return 'Seller Wins Dispute'
  }
}

class Offer extends Component {
  constructor() {
    super()
    this.state = { reviseOffer: null }
  }

  render() {
    const { timestamp } = this.props.network.block
    const offer = this.props.marketplace.offers[this.props.offerID]
    const idx = this.props.offerID
    const lID = this.props.listingID
    const wallet = this.props.wallet.activeAddress
    const listingWithdrawn = this.props.listing.withdrawn
    const isBuyer = wallet === offer.buyer
    const isSeller = this.props.listing.seller === wallet
    const isArbitrator = this.props.marketplace.arbitrator === wallet
    const finalized = this.props.network.block.timestamp > offer.finalizes
    const status = String(offer.status)
    let value = offer.value
    if (offer.currencyId === 'ETH') {
      value = web3.utils.fromWei(value, 'ether')
    }

    return (
      <>
        <tr
          style={{ cursor: 'pointer' }}
          onClick={() =>
            this.setState({ open: this.state.open ? false : true })
          }
        >
          <td className="pl-2" style={{ borderLeft: `1px solid ${this.state.open ? '#dee2e6' : '#fff' }` }}>
            <i
              className={`ml-0 mr-1 px-0 fa fa-fw fa-${
                this.state.open ? 'caret-down' : 'caret-right'
              }`}
            />
            {`${value} ${offer.currencyId || ''}`}
          </td>
          <td className="text-center mono">{offer.buyer.substr(2, 4)}</td>
          <td className="text-center">{`${offer.commission} OGN`}</td>
          <td className="text-center">{showStatus(offer, timestamp)}</td>
          <td className="text-right">
            <Btn
              showIf={isSeller && status === '1'}
              onClick={() => this.setState({ acceptOffer: [lID, idx] })}
              text="Accept"
            />
            <Btn
              showIf={
                status === '2' &&
                (isBuyer || (isSeller && finalized)) &&
                !listingWithdrawn
              }
              onClick={() => this.setState({ finalizeOffer: [lID, idx] })}
              text="Finalize"
            />
            <Btn
              showIf={isBuyer && status === '2' && !listingWithdrawn}
              onClick={() => this.props.disputeOffer(lID, idx)}
              text="Dispute"
              color="danger ml-1"
            />
            <Btn
              showIf={isBuyer && status === '1'}
              onClick={() => this.props.onRevise(idx)}
              text="Revise"
              color="primary ml-1"
            />
            <Btn
              showIf={
                isBuyer &&
                (status === '1' || (listingWithdrawn && status !== '0'))
              }
              onClick={() => this.props.withdrawOffer(lID, idx)}
              text="Withdraw"
              color="danger ml-1"
            />
            <Btn
              showIf={isArbitrator && status === '3'}
              onClick={() => this.props.disputeRuling(lID, idx, '0')}
              color="warning"
            >
              <i className="fa fa-gavel mr-1" />Buyer
            </Btn>
            <Btn
              showIf={isArbitrator && status === '3'}
              onClick={() => this.props.disputeRuling(lID, idx, '1')}
              color="warning ml-1"
            >
              <i className="fa fa-gavel mr-1" />Seller
            </Btn>
            <Btn
              showIf={true}
              onClick={() => {}}
              color="primary ml-1"
            >
              <i className="fa fa-commenting" />
            </Btn>
          </td>
        </tr>
        {this.renderDetail()}

        {this.state.acceptOffer && (
          <AcceptOffer
            listing={this.props.listing}
            acceptOffer={obj =>
              this.props.acceptOffer(
                this.state.acceptOffer[0],
                this.state.acceptOffer[1],
                obj
              )
            }
            onClose={() => this.setState({ acceptOffer: null })}
            response={this.props.marketplace.acceptOfferResponse}
          />
        )}
        {this.state.finalizeOffer && (
          <FinalizeOffer
            acceptOffer={obj =>
              this.props.finalizeOffer(
                this.state.finalizeOffer[0],
                this.state.finalizeOffer[1],
                obj
              )
            }
            onClose={() => this.setState({ finalizeOffer: null })}
            response={this.props.marketplace.finalizeOfferResponse}
          />
        )}
      </>
    )
  }

  renderDetail() {
    if (!this.state.open) {
      return null
    }
    return (
      <tr>
        <td
          className="border-top-0 pt-0 pl-3"
          style={{ borderLeft: '1px solid #dee2e6' }}
          colSpan={5}
        >
          <EventsTable
            listing={this.props.listingID}
            offer={this.props.offerID}
          />
        </td>
      </tr>
    )
  }

  expired(offer) {
    return Number(offer.expires) < this.props.network.block.timestamp
  }
}

const mapStateToProps = state => ({
  marketplace: state.marketplace,
  wallet: state.wallet,
  network: state.network
})

const mapDispatchToProps = dispatch => ({
  acceptOffer: (...args) => dispatch(acceptOffer(...args)),
  disputeOffer: (...args) => dispatch(disputeOffer(...args)),
  finalizeOffer: (...args) => dispatch(finalizeOffer(...args)),
  withdrawOffer: (...args) => dispatch(withdrawOffer(...args)),
  disputeRuling: (...args) => dispatch(disputeRuling(...args))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offer)
