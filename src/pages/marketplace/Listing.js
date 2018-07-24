import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom'

import {
  getOffers,
  updateListing,
  withdrawListing,
  arbitrateListing,
  addData
} from 'actions/Marketplace'

import Events from './_EventsTable'
import UpdateListing from './_UpdateListing'
import ArbitrateListing from './_ArbitrateListing'
import WithdrawListing from './_WithdrawListing'
import AddData from './_AddData'
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
      var refresh = this.props.activeListing !== nextProps.activeListing ? true : false
      this.props.getOffers(nextProps.activeListing, { refresh })
    }
  }

  render() {
    var listing = this.props.marketplace.listings.find(l => l.id == this.props.activeListing)
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
                {listing.ipfs.title}
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
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {JSON.stringify(listing, null, 4)}
              </pre>
            )}
          />
          <Route
            render={() => (
              <div>
                <div className="mb-2 d-flex">
                  <div className="my-1 d-flex align-items-top">
                    {listing.withdrawn && (
                      <span className="text-danger mr-3 font-weight-bold">
                        Withdrawn
                      </span>
                    )}
                    {!listing.ipfs.image ? null : (
                      <div>
                        <img
                          src={`${this.props.ipfs}/ipfs/${listing.ipfs.image}`}
                          width={80}
                          className="mr-3 mb-3"
                        />
                      </div>
                    )}
                    <b className="mr-1">Asking price:</b>
                    {`${listing.ipfs.price} ${listing.ipfs.currencyId}`}
                    <b className="ml-3 mr-1">Category:</b>
                    {`${listing.ipfs.listingType}`}
                  </div>
                  <div className="ml-auto">
                    {!isOwner ? null : (
                      <button
                        className="btn btn-sm btn-outline-secondary mr-1"
                        onClick={() => this.setState({ updateListing: true })}
                      >
                        Update
                      </button>
                    )}
                    {!isArbitrator ? null : (
                      <>
                        <button
                          className="btn btn-sm btn-outline-secondary mr-1"
                          onClick={() => this.setState({ arbitrate: true })}
                        >
                          Arbitrate
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger mr-1"
                          onClick={() =>
                            this.setState({ withdrawListing: true })
                          }
                        >
                          <i className="fa fa-trash" />
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm btn-outline-primary mr-1"
                      onClick={() => this.setState({ addData: [this.props.activeListing] })}
                    >
                      <i className="fa fa-commenting" />
                    </button>
                  </div>
                </div>
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
        {this.state.withdrawListing && (
          <WithdrawListing
            onClose={() => this.setState({ withdrawListing: false })}
            listing={listing}
            withdrawListing={json =>
              this.props.withdrawListing(this.props.activeListing, json)
            }
            parties={this.props.parties}
            response={this.props.marketplace.withdrawListingResponse}
          />
        )}
        {this.state.addData && (
          <AddData
            addData={obj => this.props.addData(obj, this.state.addData[0])}
            onClose={() => this.setState({ addData: null })}
            response={this.props.marketplace.addDataResponse}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ipfs: state.network.ipfsGateway,
  wallet: state.wallet,
  activeListing: ownProps.match.params.idx,
  marketplace: state.marketplace,
  parties: state.parties.parties,
  updateListingResponse: state.marketplace.updateListingResponse,
  arbitrateListingResponse: state.marketplace.arbitrateListingResponse
})

const mapDispatchToProps = dispatch => ({
  getOffers: (...args) => dispatch(getOffers(...args)),
  withdrawListing: (...args) => dispatch(withdrawListing(...args)),
  updateListing: (idx, json) => dispatch(updateListing(idx, json)),
  arbitrateListing: (idx, json) => dispatch(arbitrateListing(idx, json)),
  addData: (...args) => dispatch(addData(...args)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listing)
