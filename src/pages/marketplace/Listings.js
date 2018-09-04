import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, matchPath } from 'react-router'

import { getListings, createListing } from 'actions/Marketplace'
import { selectAccount } from 'actions/Wallet'

import NewListing from './_NewListing'

class Listings extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getListings()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.marketplace.contractAddress !==
      prevProps.marketplace.contractAddress
    ) {
      this.props.getListings()
    }
  }

  render() {
    const { listings } = this.props.marketplace

    return (
      <>
        <table
          className={`table table-sm${
            listings.length ? ' table-hover' : ''
          } identities-list`}
        >
          <thead>
            <tr>
              <th className="border-top-0">
                <i className="fa fa-th-list mr-2" />
                Listings
                {!listings.length ? null : (
                  <a
                    href="#"
                    className="ml-2"
                    onClick={e => {
                      e.preventDefault()
                      this.setState({ newListing: true })
                      this.props.selectAccount(this.props.sellerWallet)
                    }}
                  >
                    <i className="fa fa-plus" />
                  </a>
                )}
              </th>
              <th className="border-top-0 text-center">Price</th>
              <th className="border-top-0 text-center">Deposit</th>
              <th className="border-top-0 text-center" style={{ width: 80 }}>
                Seller
              </th>
            </tr>
          </thead>
          <tbody>
            {!listings.length && (
              <tr>
                <td colSpan={2} className="p-2">
                  <button
                    href="#"
                    className={`btn btn-sm btn-outline-primary${
                      this.props.marketplace.contractAddress ? '' : ' disabled'
                    }`}
                    onClick={e => {
                      e.preventDefault()
                      if (!this.props.marketplace.contractAddress) {
                        return
                      }
                      this.setState({ newListing: true })
                      this.props.selectAccount(this.props.sellerWallet)
                    }}
                  >
                    <i className="fa fa-plus" /> Add a Listing
                  </button>
                </td>
              </tr>
            )}
            {listings.map(listing => (
              <tr
                key={listing.id}
                onClick={() => {
                  var url = `/marketplace/listing/${listing.id}`
                  if (this.props.location.pathname.match(/events$/)) {
                    url += '/events'
                  } else if (this.props.location.pathname.match(/info$/)) {
                    url += '/info'
                  }
                  this.props.history.push(url)
                }}
                style={{ cursor: 'pointer' }}
                className={this.rowCls(listing, listing.id)}
              >
                <td>
                  <span className="ml-1 mr-2 mono">{listing.id}</span>
                  {listing.ipfs.title}
                  {!listing.publicKey ? null : (
                    <i className="fa fa-key ml-2" style={{ opacity: 0.5 }} />
                  )}
                </td>
                <td className="text-center">
                  {`${listing.ipfs.price} ${listing.ipfs.currencyId}`}
                </td>
                <td className="text-center">{`${listing.deposit} OGN`}</td>
                <td className="text-center mono">
                  {!listing.seller ? '' : listing.seller.substr(2, 4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.newListing && (
          <NewListing
            onClose={() => this.setState({ newListing: false })}
            onSuccess={() => {
              this.props.history.push(
                `/marketplace/listing/${this.props.marketplace.listings.length}`
              )
            }}
            createListing={this.props.createListing}
            party={this.props.activeParty}
            parties={this.props.parties}
            response={this.props.marketplace.createListingResponse}
            error={this.props.marketplace.createListingError}
          />
        )}
      </>
    )
  }

  rowCls(listing, idx) {
    var cls = ''
    const match = matchPath(this.props.location.pathname, {
      path: '/marketplace/listing/:idx'
    })
    if (match && match.params.idx === String(idx)) {
      cls += 'table-active'
    }
    return cls
  }
}

const mapStateToProps = state => ({
  marketplace: state.marketplace,
  wallet: state.wallet,
  activeParty: state.parties.active,
  parties: state.parties.parties,
  sellerWallet: state.wallet.accounts[0]
})

const mapDispatchToProps = dispatch => ({
  createListing: listing => dispatch(createListing(listing)),
  getListings: () => dispatch(getListings()),
  selectAccount: (...args) => dispatch(selectAccount(...args))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Listings)
)
