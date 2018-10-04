import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { Button } from '@blueprintjs/core'

import Listings from './_Listings'
import CreateListing from './mutations/CreateListing'

import query from './queries/_listings'

class Marketplace extends Component {
  state = {}
  render() {
    return (
      <Query
        query={query}
        variables={{ offset: 0, limit: 10 }}
        notifyOnNetworkStatusChange={true}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading && !data.marketplace)
            return <p className="mt-3">Loading...</p>
          if (!data.marketplace)
            return <p className="mt-3">No marketplace contract?</p>
          if (error) {
            console.log(error)
            return <p className="mt-3">Error :(</p>
          }

          const numListings = data.marketplace.allListings.length

          return (
            <>
              {this.renderBreadcrumbs()}
              <Listings data={data} />
              {Number(data.marketplace.totalListings) <= numListings ? null : (
                <Button
                  text="More"
                  loading={loading}
                  className="mt-3"
                  onClick={() => {
                    fetchMore({
                      variables: {
                        offset: numListings,
                        limit: 10
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev
                        return {
                          marketplace: {
                            ...prev.marketplace,
                            allListings: [
                              ...prev.marketplace.allListings,
                              ...fetchMoreResult.marketplace.allListings
                            ]
                          }
                        }
                      }
                    })
                  }}
                />
              )}
              <CreateListing
                {...this.state}
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
