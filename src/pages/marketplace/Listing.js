import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom'

import {
  getOffers,
  updateListing,
  withdrawListing,
  arbitrateListing
} from 'actions/Marketplace'

import Events from './_EventsTable'
import UpdateListing from './_UpdateListing'
import ArbitrateListing from './_ArbitrateListing'
import Offers from './Offers'

class Listing extends Component {
  constructor(props) {
    super(props)
    this.state = { mode: 'summary' }
  }

  componentDidMount() {
    this.props.getOffers(this.props.activeListing)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.activeListing !== nextProps.activeListing ||
      nextProps.wallet.activeAddress !== this.props.wallet.activeAddress
    ) {
      this.props.getOffers(nextProps.activeListing)
    }
  }

  render() {
    var listing = this.props.marketplace.listings[this.props.activeListing]
    if (!listing) {
      return null
    }

    var isOwner = listing.seller === this.props.wallet.activeAddress
    var isArbitrator = listing.arbitrator === this.props.wallet.activeAddress

    return (
      <>
        <div>
          <ul className="nav nav-tabs mb-3">
            <li className="mr-auto">
              <a
                style={{ fontSize: '1.6rem' }}
                onClick={e => {
                  e.preventDefault()
                }}
              >
                {listing.title}
              </a>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/marketplace/listing/${this.props.activeListing}`}
                exact
              >
                Summary
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/marketplace/listing/${this.props.activeListing}/events`}
              >
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/marketplace/listing/${this.props.activeListing}/info`}
              >
                Info
              </NavLink>
            </li>
          </ul>
        </div>

        <Switch>
          <Route
            path={`/marketplace/listing/:idx/events`}
            render={() => <Events listing={this.props.activeListing} />}
          />
          <Route
            path={`/marketplace/listing/:idx/info`}
            render={() => (
              <>
                <div className="d-flex flex-column align-items-center">
                  <div className="mono w-100">
                    {`Seller: ${listing.seller}`}
                  </div>
                </div>
              </>
            )}
          />
          <Route
            render={() => (
              <div>
                {listing.withdrawn ? (
                  <div className="mb-2 text-danger">Listing Withdrawn</div>
                ) : (
                  <div className="mb-2 d-flex">
                    <div className="my-1">
                      <b className="mr-1">Asking price:</b>
                      {`${listing.price} ${listing.currencyId}`}
                      <b className="ml-3 mr-1">Category:</b>
                      {`${listing.listingType}`}
                    </div>
                    {isOwner && (
                      <div className="ml-auto">
                        <button
                          className="btn btn-sm btn-outline-secondary mr-1"
                          onClick={() => this.setState({ updateListing: true })}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            this.props.withdrawListing(this.props.activeListing)
                          }
                        >
                          <i className="fa fa-trash" />
                        </button>
                      </div>
                    )}
                    {isArbitrator && (
                      <div className="ml-auto">
                        <button
                          className="btn btn-sm btn-outline-secondary mr-1"
                          onClick={() => this.setState({ arbitrate: true })}
                        >
                          Arbitrate
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <Offers listing={listing} />
              </div>
            )}
          />
        </Switch>

        {this.state.updateListing && (
          <UpdateListing
            onClose={() => this.setState({ updateListing: false })}
            listing={listing}
            updateListing={json =>
              this.props.updateListing(this.props.activeListing, json)
            }
            response={this.props.marketplace.updateListingResponse}
          />
        )}
        {this.state.arbitrate && (
          <ArbitrateListing
            onClose={() => this.setState({ arbitrate: false })}
            listing={listing}
            arbitrateListing={json =>
              this.props.arbitrateListing(this.props.activeListing, json)
            }
            parties={this.props.parties}
            response={this.props.marketplace.arbitrateListingResponse}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  wallet: state.wallet,
  activeListing: ownProps.match.params.idx,
  marketplace: state.marketplace,
  parties: state.parties.parties,
  updateListingResponse: state.marketplace.updateListingResponse,
  arbitrateListingResponse: state.marketplace.arbitrateListingResponse
})

const mapDispatchToProps = dispatch => ({
  getOffers: idx => dispatch(getOffers(idx)),
  withdrawListing: idx => dispatch(withdrawListing(idx)),
  updateListing: (idx, json) => dispatch(updateListing(idx, json)),
  arbitrateListing: (idx, json) => dispatch(arbitrateListing(idx, json))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listing)
