import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { Button, ButtonGroup, Spinner, Tabs, Tab } from '@blueprintjs/core'

import BottomScrollListener from 'components/BottomScrollListener'
import { get, set } from 'utils/store'

import ListingsList from './_ListingsList'
import ListingsGallery from './_ListingsGallery'
import Events from './_Events'
import CreateListing from './mutations/CreateListing'

import query from './queries/_listings'

let lastFetched = 0
function nextPage(fetchMore, numListings) {
  if (numListings === lastFetched) return
  lastFetched = numListings

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
}

// let nextFrame,
//   firstFrame = true
class Listings extends Component {
  state = { mode: get('listingsPage.mode', 'gallery') }
  render() {
    let selectedTabId = 'listings'
    if (this.props.location.pathname.match(/activity/)) {
      selectedTabId = 'activity'
    }

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

          window.requestAnimationFrame(() => {
            if (
              document.body.clientHeight < window.innerHeight &&
              numListings < totalListings &&
              networkStatus === 7
            ) {
              nextPage(fetchMore, numListings)
            }
          })

          return (
            <BottomScrollListener
              onBottom={() => {
                nextPage(fetchMore, numListings)
              }}
            >
              <div className="p-3">
                {this.renderBreadcrumbs({
                  refetch,
                  networkStatus,
                  totalListings,
                  selectedTabId
                })}

                {selectedTabId === 'activity' ? (
                  <Events />
                ) : this.state.mode === 'list' ? (
                  <ListingsList data={data} />
                ) : (
                  <ListingsGallery data={data} />
                )}

                {selectedTabId !== 'listings' ||
                Number(data.marketplace.totalListings) <= numListings ? null : (
                  <Button
                    text="Load more..."
                    loading={networkStatus === 3}
                    className="mt-3"
                    onClick={() => nextPage(fetchMore, numListings)}
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
            </BottomScrollListener>
          )
        }}
      </Query>
    )
  }
  renderBreadcrumbs({ refetch, networkStatus, totalListings, selectedTabId }) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Tabs
          selectedTabId={selectedTabId}
          renderActiveTabPanelOnly={true}
          onChange={(newTab, prevTab) => {
            if (prevTab === newTab) {
              return
            }
            if (newTab === 'listings') {
              this.props.history.push(`/marketplace/listings`)
            } else if (newTab === 'activity') {
              this.props.history.push(`/marketplace/activity`)
            }
          }}
        >
          <Tab id="listings" title={`Listings (${totalListings})`} />
          <Tab id="activity" title="Activity" />
        </Tabs>
        <div style={{ display: 'flex' }}>
          {selectedTabId !== 'listings' ? null : (
            <ButtonGroup>
              <Button
                icon="media"
                active={this.state.mode === 'gallery'}
                onClick={() => {
                  set('listingsPage.mode', 'gallery')
                  this.setState({ mode: 'gallery' })
                }}
              />
              <Button
                icon="list"
                active={this.state.mode === 'list'}
                onClick={() => {
                  set('listingsPage.mode', 'list')
                  this.setState({ mode: 'list' })
                }}
              />
            </ButtonGroup>
          )}
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

export default Listings
