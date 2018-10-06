import React from 'react'
import { withRouter } from 'react-router'
import formatDate from 'utils/formatDate'

import { Card } from '@blueprintjs/core'

import Price from 'components/Price'
import Identity from 'components/Identity'

const Listings = ({ data, history }) => {
  if (!data.marketplace || !data.marketplace.allListings) return null
  return (
    <div className="mt-3 listings-grid">
      {data.marketplace.allListings.map(a => (
        <Card
          interactive={true}
          key={a.id}
          onClick={() => history.push(`/marketplace/listings/${a.id}`)}
          className="listing-card"
        >
          <h5 className="bp3-heading ellip" style={{ maxWidth: 'none' }}>
            {a.ipfs ? a.ipfs.title : null}
          </h5>
          {a.ipfs && a.ipfs.media && a.ipfs.media.length ? (
            <div
              className="main-pic"
              style={{
                backgroundImage: `url(https://ipfs.originprotocol.com/${a.ipfs.media[0].url.replace(
                  ':/',
                  ''
                )})`
              }}
            />
          ) : null}
          <div className="price">
            <Price amount={a.ipfs && a.ipfs.price ? a.ipfs.price.amount : 0} />
            {a.seller ? <Identity account={a.seller.id} /> : ''}
          </div>
          <div className="info">
            {`#${a.id}`}
            {a.createdEvent
              ? ` created ${formatDate(a.createdEvent.block.timestamp)}`
              : ''}
          </div>
        </Card>
      ))}
    </div>
  )
}

export default withRouter(Listings)

require('react-styl')(`
  .listings-grid
    display: grid
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-columns: repeat(auto-fill,minmax(265px, 1fr));
  .listing-card
    .main-pic
      height: 160px
      background-size: contain
      background-repeat: no-repeat
      background-position: center
      margin-bottom: 2px
    .price
      margin-top: 0.5rem
      display: flex
      justify-content: space-between
    .info
      margin-top: 0.5rem
      color: #666
      font-size: 0.9rem
`)
