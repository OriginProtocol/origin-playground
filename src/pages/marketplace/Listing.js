import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom'

import { getOffers } from 'actions/Marketplace'
import Events from './_Events'
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
    if (this.props.activeListing !== nextProps.activeListing) {
      this.props.getOffers(nextProps.activeListing)
    }
  }

  render() {
    var listing = this.props.marketplace.listings[this.props.activeListing]
    if (!listing) {
      return null
    }

    // var isOwner = listing.seller === this.props.wallet.activeAddress

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
                <Offers listing={listing} />
                  {/* {isOwner && (
                    <div className="">
                      <hr/>
                      <button className="btn btn-sm btn-outline-secondary">
                        Update Listing
                      </button>
                      <button className="btn btn-sm btn-outline-danger ml-1">
                        Remove Listing
                      </button>
                    </div>
                  )} */}
              </div>
            )}
          />
        </Switch>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  wallet: state.wallet,
  activeListing: ownProps.match.params.idx,
  marketplace: state.marketplace
})

const mapDispatchToProps = dispatch => ({
  getOffers: idx => dispatch(getOffers(idx))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listing)
