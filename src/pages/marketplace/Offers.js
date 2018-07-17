import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { getAllListings, makeOffer } from 'actions/Marketplace'

import Btn from 'components/Btn'

import OfferRow from './Offer'
import NewOffer from './_NewOffer'

class Offers extends Component {
  constructor() {
    super()
    this.state = { reviseOffer: null }
  }

  componentDidMount() {
    this.props.getAllListings()
  }

  render() {
    const { offers } = this.props.marketplace
    const lID = this.props.match.params.idx
    const listing = this.props.listing
    const isSeller = listing.seller === this.props.wallet.activeAddress

    return (
      <table className="table table-sm identities-list">
        <thead>
          <tr>
            <th className="border-top-0 no-wrap">
              <i className="fa fa-money mr-2" />Offers
              <Btn
                showIf={offers.length && !isSeller && !listing.withdrawn}
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
          {!offers.length &&
            !listing.withdrawn && (
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
          {offers.map((offer, idx) => (
            <OfferRow
              listing={this.props.listing}
              key={idx}
              offerID={idx}
              offer={offer}
              listingID={lID}
            />
          ))}
        </tbody>

        {this.state.makeOffer && (
          <NewOffer
            listing={this.props.marketplace.listings[lID]}
            timestamp={this.props.network.block.timestamp}
            onClose={() => this.setState({ makeOffer: false })}
            makeOffer={offer => this.props.makeOffer(lID, offer)}
            response={this.props.marketplace.makeOfferResponse}
            parties={this.props.parties}
            activeParty={this.props.activeParty}
            reviseOffer={this.state.reviseOffer}
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
  network: state.network
})

const mapDispatchToProps = dispatch => ({
  makeOffer: (...args) => dispatch(makeOffer(...args)),
  getAllListings: () => dispatch(getAllListings())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Offers)
)
