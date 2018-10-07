import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { Button, ButtonGroup, Spinner } from '@blueprintjs/core'

import Listings from './_Listings'
import ListingsGallery from './_ListingsGallery'
import CreateListing from './mutations/CreateListing'

import query from './queries/_listings'

class Marketplace extends Component {
  state = { mode: 'gallery' }
  render() {
    return (
      <Query
        query={query}
        variables={{ offset: 0, limit: 10 }}
        notifyOnNetworkStatusChange={true}
      >
        {({ error, data, fetchMore, networkStatus, refetch }) => {
          if (networkStatus === 1)
            return (
              <div style={{ maxWidth: 300, marginTop: 100 }}>
                <Spinner />
              </div>
            )
          if (!data || !data.marketplace)
            return <p className="p-3">No marketplace contract?</p>
          if (error) {
            console.log(error)
            return <p>Error :(</p>
          }

          const numListings = data.marketplace.allListings.length
          const totalListings = data.marketplace.totalListings

          return (
            <div className="p-3">
              {this.renderBreadcrumbs({
                refetch,
                networkStatus,
                totalListings
              })}
              {this.state.mode === 'list' ? (
                <Listings data={data} />
              ) : (
                <ListingsGallery data={data} />
              )}
              {Number(data.marketplace.totalListings) <= numListings ? null : (
                <Button
                  text="Load more..."
                  loading={networkStatus === 3}
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
            </div>
          )
        }}
      </Query>
    )
  }
  renderBreadcrumbs({ refetch, networkStatus, totalListings }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ul className="bp3-breadcrumbs">
          <li>
            <span className="bp3-breadcrumb bp3-breadcrumb-current">
              {`${totalListings} Listings`}
            </span>
          </li>
        </ul>
        <div style={{ display: 'flex' }}>
          <ButtonGroup>
            <Button
              icon="media"
              active={this.state.mode === 'gallery'}
              onClick={() => this.setState({ mode: 'gallery' })}
            />
            <Button
              icon="list"
              active={this.state.mode === 'list'}
              onClick={() => this.setState({ mode: 'list' })}
            />
          </ButtonGroup>
          <Button
            onClick={() => this.setState({ createListing: true })}
            className="ml-2"
            text="Create Listing"
          />
          <Button
            icon="refresh"
            loading={networkStatus === 4}
            className="ml-2"
            onClick={() => refetch()}
          />
        </div>
      </div>
    )
  }
}

export default Marketplace
