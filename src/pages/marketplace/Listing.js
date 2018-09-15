import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import { Button, NonIdealState, AnchorButton } from '@blueprintjs/core'

import MakeOffer from './mutations/MakeOffer'
import Offers from './_Offers'
import AccountButton from '../accounts/AccountButton'

import query from './queries/_offers'

class Listing extends Component {
  state = {}
  render() {
    const listingId = this.props.match.params.listingID
    return (
      <Query query={query} variables={{ listingId }}>
        {({ loading, error, data }) => {
          if (loading) return <p className="mt-3">Loading...</p>
          if (error) {
            console.log(error)
            console.log(query.loc.source.body)
            return <p className="mt-3">Error :(</p>
          }

          const listing = data.marketplace.getListing
          const listingData = listing.ipfs || {}

          if (!listing) {
            return (
              <div style={{ maxWidth: 500, marginTop: 50 }}>
                <NonIdealState
                  icon="help"
                  title="Listing not found"
                  action={
                    <AnchorButton href="#/marketplace" icon="arrow-left">
                      Back to Listings
                    </AnchorButton>
                  }
                />
              </div>
            )
          }

          return (
            <>
              {this.renderBreadcrumbs(listing)}
              <h3 className="bp3-heading mt-3">{listingData.title}</h3>
              <div>
                <div>
                  {`${listingData.category} by `}
                  <AccountButton account={listing.seller} />
                  {` for ${listingData.price} ${listingData.currencyId || ''}`}
                </div>
              </div>
              <Offers
                listing={listing}
                listingId={listingId}
                offers={data.marketplace.getListing.offers}
              />
              {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
              <MakeOffer
                {...this.state}
                listingId={listingId}
                isOpen={this.state.makeOffer}
                onCompleted={() => {
                  this.setState({ makeOffer: false })
                }}
              />
            </>
          )
        }}
      </Query>
    )
  }
  renderBreadcrumbs(listing) {
    return (
      <ul className="bp3-breadcrumbs">
        <li>
          <Link className="bp3-breadcrumb" to="/marketplace">
            Listings
          </Link>
        </li>
        <li>
          <span className="bp3-breadcrumb bp3-breadcrumb-current">
            {`Listing #${listing.id}`}
          </span>
        </li>
        <li>
          <Button onClick={() => this.setState({ makeOffer: true })}>
            Make Offer
          </Button>
        </li>
      </ul>
    )
  }
}

export default Listing
