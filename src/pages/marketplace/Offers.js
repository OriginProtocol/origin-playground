import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { getListings, makeOffer } from 'actions/Marketplace'
import { selectAccount } from 'actions/Wallet'

import Btn from 'components/Btn'

import OfferRow from './Offer'
import NewOffer from './_NewOffer'

class Offers extends Component {
  constructor() {
    super()
    this.state = { reviseOffer: null }
  }

  componentDidMount() {
    this.props.getListings()
  }

  render() {
    const { offers } = this.props.marketplace
    const lID = this.props.match.params.idx
    const listing = this.props.listing

    return (
      <table className="table table-sm identities-list">
        <thead>
          <tr>
            <th className="border-top-0 no-wrap">
              <i className="fa fa-money mr-2" />Offers
              <Btn
                showIf={offers.length && !listing.withdrawn}
                onClick={() => {
                  this.setState({ makeOffer: true, reviseOffer: null })
                  this.props.selectAccount(this.props.buyerWallet)
                }}
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
          {offers.map((offer, idx) => (
            <OfferRow
              listing={this.props.listing}
              key={idx}
              offerID={idx}
              offer={offer}
              listingID={lID}
              onRevise={idx =>
                this.setState({ makeOffer: true, reviseOffer: idx })
              }
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="p-2">
              <Btn
                showIf={!listing.withdrawn}
                onClick={() => {
                  this.setState({ makeOffer: true, reviseOffer: null })
                  this.props.selectAccount(this.props.buyerWallet)
                }}
                color="primary"
              >
                <i className="fa fa-plus" /> Add an Offer
              </Btn>
            </td>
          </tr>
        </tfoot>

        {this.state.makeOffer && (
          <NewOffer
            listing={this.props.listing}
            timestamp={this.props.network.block.timestamp}
            onClose={() => this.setState({ makeOffer: false })}
            makeOffer={offer => this.props.makeOffer(lID, offer)}
            response={this.props.marketplace.makeOfferResponse}
            parties={this.props.parties}
            activeParty={this.props.activeParty}
            reviseOffer={this.state.reviseOffer}
            offer={this.state.reviseOffer === null ? null : offers[this.state.reviseOffer]}
            error={this.props.marketplace.makeOfferError}
          />
        )}
      </table>
    )
  }
}

const mapStateToProps = state => ({
  marketplace: state.marketplace,
  parties: state.parties.parties,
  activeParty: state.parties.active,
  wallet: state.wallet,
  network: state.network,
  buyerWallet: state.wallet.accounts[1]
})

const mapDispatchToProps = dispatch => ({
  makeOffer: (...args) => dispatch(makeOffer(...args)),
  getListings: () => dispatch(getListings()),
  selectAccount: (...args) => dispatch(selectAccount(...args))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Offers)
)
