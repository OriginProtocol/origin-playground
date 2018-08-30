import React, { Component } from 'react'
import { connect } from 'react-redux'
import distanceInWords from 'date-fns/distance_in_words'

import {
  acceptOffer,
  disputeOffer,
  disputeRuling,
  finalizeOffer,
  withdrawOffer,
  addData,
  addFunds,
  setOfferRefund
} from 'actions/Marketplace'

import Btn from 'components/Btn'
import AcceptOffer from './_AcceptOffer'
import AddData from './_AddData'
import AddFunds from './_AddFunds'
import FinalizeOffer from './_FinalizeOffer'
import ExecuteRuling from './_ExecuteRuling'
import DisputeOffer from './_DisputeOffer'
import PartialRefund from './_PartialRefund'
import EventsTable from './_EventsTable'

function timeDistance(now, time) {
  return distanceInWords(now * 1000, time * 1000)
    .replace(' hours', 'h')
    .replace('in about ', '~')
    .replace('about ', '~')
}

function showStatus(offer, timestamp) {
  if (!timestamp) return ''
  if (offer.encrypted) return 'Encrypted'

  var expired = Number(offer.expires) < timestamp,
    status = Number(offer.status)
  if (status === 1) {
    var time = timeDistance(timestamp, offer.expires)
    return expired
      ? `Expired ${time} ago`
      : `Expires ${time}`.replace('in about ', '~')
  } else if (status === 2) {
    let desc = timeDistance(timestamp, offer.finalizes)
    if (Number(offer.finalizes) < timestamp) {
      return 'Finalizied ' + desc + ' ago'
    } else {
      return `Finalizes ${desc}`
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
    const isArbitrator = offer.arbitrator === wallet
    const finalized = this.props.network.block.timestamp > offer.finalizes
    const status = String(offer.status)

    return (
      <>
        <tr
          style={{ cursor: 'pointer' }}
          onClick={() =>
            this.setState({ open: this.state.open ? false : true })
          }
        >
          <td
            className="pl-2"
            style={{
              borderLeft: `1px solid ${this.state.open ? '#dee2e6' : '#fff'}`
            }}
          >
            <i
              className={`ml-0 mr-1 px-0 fa fa-fw fa-${
                this.state.open ? 'caret-down' : 'caret-right'
              }`}
            />
            {`${this.valueOf(offer.value)} ${(offer.ipfs &&
              offer.ipfs.currencyId) ||
              ''}`}
            {offer.refund !== '0' && (
              <small className="ml-1 text-danger">{`${this.valueOf(
                offer.refund
              )} refund`}</small>
            )}
          </td>
          <td className="text-center mono">{offer.buyer.substr(2, 4)}</td>
          <td className="text-center">{`${offer.commission} OGN`}</td>
          <td className="text-center">{showStatus(offer, timestamp)}</td>
          <td className="text-right">
            <Btn
              showIf={isBuyer && status === '2' && !listingWithdrawn}
              onClick={() => this.setState({ addFunds: [lID, idx] })}
              text={<i className="fa fa-money" />}
            />
            <Btn
              showIf={isSeller && status === '1'}
              onClick={() => this.setState({ acceptOffer: [lID, idx] })}
              text="Accept"
              color="success ml-1"
            />
            <Btn
              showIf={
                status === '2' &&
                (isBuyer || (isSeller && finalized)) &&
                !listingWithdrawn
              }
              onClick={() => this.setState({ finalizeOffer: [lID, idx] })}
              text={<i className="fa fa-check" />}
              color="success ml-1"
            />
            <Btn
              showIf={isBuyer && status === '2' && !listingWithdrawn}
              onClick={() => this.setState({ disputeOffer: [lID, idx] })}
              text={<i className="fa fa-exclamation px-1" />}
              color="danger ml-1"
            />
            <Btn
              showIf={isSeller && status === '2'}
              onClick={() => this.setState({ partialRefund: [lID, idx] })}
              text="Partial Refund"
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
              onClick={() => this.setState({ executeRuling: [lID, idx] })}
              color="warning"
            >
              <i className="fa fa-gavel mr-1" />
              Execute Ruling
            </Btn>
            <Btn
              showIf={true}
              onClick={() => this.setState({ addData: [lID, idx] })}
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
        {this.state.disputeOffer && (
          <DisputeOffer
            disputeOffer={obj =>
              this.props.disputeOffer(
                this.state.disputeOffer[0],
                this.state.disputeOffer[1],
                obj
              )
            }
            onClose={() => this.setState({ disputeOffer: null })}
            response={this.props.marketplace.disputeOfferResponse}
          />
        )}
        {this.state.partialRefund && (
          <PartialRefund
            offer={offer}
            setOfferRefund={obj => {
              this.props.setOfferRefund(
                this.state.partialRefund[0],
                this.state.partialRefund[1],
                obj.refund,
                obj.ipfs
              )
            }}
            onClose={() => this.setState({ partialRefund: null })}
            response={this.props.marketplace.updateOfferRefundResponse}
          />
        )}
        {this.state.addFunds && (
          <AddFunds
            offer={offer}
            addFunds={obj => {
              this.props.addFunds(
                this.state.addFunds[0],
                this.state.addFunds[1],
                obj
              )
            }}
            onClose={() => this.setState({ addFunds: null })}
            response={this.props.marketplace.addFundsResponse}
          />
        )}
        {this.state.addData && (
          <AddData
            addData={obj => {
              this.props.addData(
                obj,
                this.state.addData[0],
                this.state.addData[1]
              )
            }}
            onClose={() => this.setState({ addData: null })}
            response={this.props.marketplace.addDataResponse}
          />
        )}
        {this.state.executeRuling && (
          <ExecuteRuling
            offer={offer}
            executeRuling={obj => {
              this.props.disputeRuling(
                this.state.executeRuling[0],
                this.state.executeRuling[1],
                obj
              )
            }}
            onClose={() => this.setState({ executeRuling: null })}
            response={this.props.marketplace.disputeRulingResponse}
          />
        )}
      </>
    )
  }

  valueOf(value) {
    const offer = this.props.marketplace.offers[this.props.offerID] || {}
    if (offer.ipfs && offer.ipfs.currencyId === 'ETH') {
      return web3.utils.fromWei(value, 'ether')
    }
    return value
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
  disputeRuling: (...args) => dispatch(disputeRuling(...args)),
  addData: (...args) => dispatch(addData(...args)),
  addFunds: (...args) => dispatch(addFunds(...args)),
  setOfferRefund: (...args) => dispatch(setOfferRefund(...args))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offer)
