import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import { Button } from '@blueprintjs/core'

import MakeOffer from './_MakeOffer'
import Offers from './_Offers'

import query from './_offersQuery'

class Listing extends Component {
  state = {}
  render() {
    const listingId = this.props.match.params.listingID
    return (
      <Query query={query} variables={{ listingId }}>
        {({ loading, error, data }) => {
          if (loading) return <p className="mt-3">Loading...</p>
          if (error) {
            return <p className="mt-3">Error :(</p>
          }

          return (
            <>
              {this.renderBreadcrumbs(data.marketplace.getListing)}
              {data.marketplace.getListing && (
                <Offers
                  listingId={listingId}
                  offers={data.marketplace.getListing.offers}
                />
              )}
              <pre>{JSON.stringify(data, null, 4)}</pre>
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
