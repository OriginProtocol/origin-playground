import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import distanceInWords from 'date-fns/distance_in_words'

import {
  getAllListings,
  makeOffer,
  acceptOffer,
  disputeOffer,
  disputeRuling,
  finalizeOffer,
  withdrawOffer
} from 'actions/Marketplace'

import NewOffer from './_NewOffer'

function showStatus(offer, timestamp) {
  if (!timestamp) return ''

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
      return 'Finalizes in ' + desc
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

const Btn = props => {
  if (!props.showIf) return null
  var className = `btn btn-sm btn-outline-${props.color || 'success'}`
  return (
    <a
      href="#"
      className={props.className === undefined ? className : props.className}
      onClick={e => {
        e.preventDefault()
        props.onClick()
      }}
    >
      {props.text || props.children}
    </a>
  )
}

class Offers extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getAllListings()
  }

  render() {
    const { offers } = this.props.marketplace
    const lID = this.props.match.params.idx
    const isSeller =
      this.props.listing.seller === this.props.wallet.activeAddress

    return (
      <table className={`table table-sm identities-list`}>
        <thead>
          <tr>
            <th className="border-top-0 no-wrap">
              <i className="fa fa-money mr-2" />Offers
              <Btn
                showIf={offers.length && !isSeller}
                onClick={() =>
                  this.setState({ makeOffer: true, reviseOffer: null })
                }
                className="ml-2"
                text={<i className="fa fa-plus" />}
              />
            </th>
            <th className="border-top-0 text-center" style={{ width: 80 }}>
              Buyer
            </th>
            <th className="border-top-0 text-center">Commission</th>
            <th className="border-top-0 text-center">Status</th>
            <th className="border-top-0 text-center" />
          </tr>
        </thead>
        <tbody>
          {!offers.length && (
            <tr>
              <td colSpan={5} className="p-2">
                <Btn
                  showIf={!isSeller}
                  onClick={() =>
                    this.setState({ makeOffer: true, reviseOffer: null })
                  }
                  color="primary"
                >
                  <i className="fa fa-plus" /> Add an Offer
                </Btn>
              </td>
            </tr>
          )}
          {offers.map(this.renderOffer.bind(this))}
        </tbody>

        {this.state.makeOffer && (
          <NewOffer
            listing={this.props.marketplace.listings[lID]}
            timestamp={this.props.network.block.timestamp}
            onClose={() => this.setState({ makeOffer: false })}
            makeOffer={offer => this.props.makeOffer(lID, offer)}
            response={this.props.marketplace.makeOfferResponse}
            parties={this.props.parties}
            reviseOffer={this.state.reviseOffer}
          />
        )}
      </table>
    )
  }

  renderOffer(offer, idx) {
    const lID = this.props.match.params.idx
    const wallet = this.props.wallet.activeAddress
    const listingWithdrawn = this.props.listing.withdrawn
    const isBuyer = wallet === offer.buyer
    const isSeller = this.props.listing.seller === wallet
    const isArbitrator = this.props.marketplace.arbitrator === wallet
    const finalized = this.props.network.block.timestamp > offer.finalizes
    const status = offer.status
    const trProps = { key: idx, className: this.rowCls(offer, idx) }

    if (status === '0') {
      return (
        <tr {...trProps}>
          <td colSpan="5" className="pl-2">
            <i className="row-fa fa fa-times mr-2 text-danger" />
            Offer Withdrawn
          </td>
        </tr>
      )
    }

    return (
      <tr {...trProps}>
        <td className="pl-2">
          <i
            className={`row-fa fa fa-${wallet === offer.buyer ? 'un' : ''}lock`}
          />
          {`${offer.amount} ${offer.currencyId}`}
        </td>
        <td className="text-center">{offer.buyer.substr(0, 6)}</td>
        <td className="text-center">{`${offer.commission} OGN`}</td>
        <td className="text-center">
          {showStatus(offer, this.props.network.block.timestamp)}
        </td>
        <td className="text-center">
          <Btn
            showIf={isSeller && status === '1'}
            onClick={() => this.props.acceptOffer(lID, idx)}
            text="Accept"
          />
          <Btn
            showIf={status === '2' && (isBuyer || (isSeller && finalized)) && !listingWithdrawn}
            onClick={() => this.props.finalizeOffer(lID, idx)}
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
            onClick={() => this.setState({ makeOffer: true, reviseOffer: idx })}
            text="Revise"
            color="primary ml-1"
          />
          <Btn
            showIf={isBuyer && (status === '1' || listingWithdrawn)}
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
        </td>
      </tr>
    )
  }

  expired(offer) {
    return Number(offer.expires) < this.props.network.block.timestamp
  }

  rowCls(listing) {
    var cls = ''
    if (this.props.wallet.activeAddress !== listing.seller) {
      cls += 'text-muted '
    }
    return cls
  }
}

const mapStateToProps = state => ({
  marketplace: state.marketplace,
  parties: state.parties.parties,
  wallet: state.wallet,
  network: state.network
})

const mapDispatchToProps = dispatch => ({
  makeOffer: (...args) => dispatch(makeOffer(...args)),
  acceptOffer: (...args) => dispatch(acceptOffer(...args)),
  disputeOffer: (...args) => dispatch(disputeOffer(...args)),
  finalizeOffer: (...args) => dispatch(finalizeOffer(...args)),
  withdrawOffer: (...args) => dispatch(withdrawOffer(...args)),
  disputeRuling: (...args) => dispatch(disputeRuling(...args)),
  getAllListings: () => dispatch(getAllListings())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Offers)
)
