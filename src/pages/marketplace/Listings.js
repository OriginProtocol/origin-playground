import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, matchPath } from 'react-router'

import { getAllListings, createListing } from 'actions/Marketplace'

import NewListing from './_NewListing'

class Listings extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getAllListings()
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
                <i className="fa fa-th-list mr-2" />Listings
                {!listings.length ? null : (
                  <a
                    href="#"
                    className="ml-2"
                    onClick={e => {
                      e.preventDefault()
                      this.setState({ newListing: true })
                    }}
                  >
                    <i className="fa fa-plus" />
                  </a>
                )}
              </th>
              <th className="border-top-0 text-center">
                Price
              </th>
              <th className="border-top-0 text-center">
                Deposit
              </th>
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
                    className="btn btn-sm btn-outline-primary"
                    onClick={e => {
                      e.preventDefault()
                      this.setState({
                        newListing: true
                      })
                    }}
                  >
                    <i className="fa fa-plus" /> Add a Listing
                  </button>
                </td>
              </tr>
            )}
            {listings.map((listing, idx) => (
              <tr
                key={idx}
                onClick={() => {
                  this.props.history.push(`/marketplace/listing/${idx}`)
                }}
                style={{ cursor: 'pointer' }}
                className={this.rowCls(listing, idx)}
              >
                <td>
                  <i
                    className={`row-fa fa fa-${
                      this.props.wallet.activeAddress === listing.owner
                        ? 'un'
                        : ''
                    }lock`}
                  />
                  {listing.title}
                </td>
                <td className="text-center">
                  {`${listing.price} ${listing.currencyId}`}
                </td>
                <td className="text-center">
                  {`${listing.deposit} OGN`}
                </td>
                <td className="text-center">
                  {!listing.seller ? '' : listing.seller.substr(0, 6)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.newListing && (
          <NewListing
            onClose={() => this.setState({ newListing: false })}
            createListing={this.props.createListing}
            response={this.props.marketplace.createListingResponse}
          />
        )}
      </>
    )
  }

  rowCls(listing, idx) {
    var cls = ''
    if (this.props.wallet.activeAddress !== listing.seller) {
      cls += 'text-muted '
    }
    const match = matchPath(this.props.location.pathname, {
      path: '/marketplace/listing/:idx'
    })
    if (match && match.params.idx === String(idx)) {
      if (this.props.wallet.activeAddress === listing.seller) {
        cls += 'table-warning'
      } else {
        cls += 'table-active'
      }
    }
    return cls
  }
}

const mapStateToProps = (state) => ({
  marketplace: state.marketplace,
  wallet: state.wallet,
})

const mapDispatchToProps = dispatch => ({
  createListing: listing => dispatch(createListing(listing)),
  getAllListings: () => dispatch(getAllListings())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Listings)
)
