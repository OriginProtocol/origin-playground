import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { Button } from '@blueprintjs/core'

import Listings from './_Listings'
import CreateListing from './mutations/_CreateListing'

import query from './queries/_listings'

function rnd(objs) {
  if (!objs) return null
  return objs[Math.floor(Math.random() * objs.length)]
}

class Marketplace extends Component {
  state = {}
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <p className="mt-3">Loading...</p>
          if (error) {
            return <p className="mt-3">Error :(</p>
          }

          const sellers = data.web3.accounts.filter(a => a.role === 'Seller')
          const arbitrators = data.web3.accounts.filter(
            a => a.role === 'Arbitrator'
          )

          return (
            <>
              {this.renderBreadcrumbs()}
              <Listings data={data} />
              <CreateListing
                {...this.state}
                seller={rnd(sellers)}
                arbitrator={rnd(arbitrators)}
                isOpen={this.state.createListing}
                onCompleted={() => {
                  this.setState({ createListing: false })
                }}
              />
            </>
          )
        }}
      </Query>
    )
  }
  renderBreadcrumbs() {
    return (
      <ul className="bp3-breadcrumbs">
        {/* <li><a className="bp3-breadcrumb" href="#">Folder three</a></li> */}
        <li>
          <span className="bp3-breadcrumb bp3-breadcrumb-current">
            Listings
          </span>
        </li>
        <li>
          <Button onClick={() => this.setState({ createListing: true })}>
            Create Listing
          </Button>
        </li>
      </ul>
    )
  }
}

export default Marketplace
