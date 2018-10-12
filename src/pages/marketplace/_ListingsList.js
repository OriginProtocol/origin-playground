import React from 'react'
import { withRouter } from 'react-router'
import currency from 'utils/currency'
import formatDate from 'utils/formatDate'
import { Tag } from '@blueprintjs/core'
import startCase from 'lodash/startCase'

import Price from 'components/Price'
import Identity from 'components/Identity'

function status(listing) {
  if (listing.status === 'active') {
    return <Tag intent="primary">Active</Tag>
  }
  if (listing.status === 'withdrawn') {
    return <Tag intent="danger">Withdrawn</Tag>
  }
  if (listing.status === 'sold') {
    return <Tag intent="success">Sold</Tag>
  }
  return listing.status
}

const Listings = ({ data, history }) => {
  if (!data.marketplace || !data.marketplace.allListings) return null
  return (
    <table
      className="bp3-html-table bp3-small bp3-html-table-bordered bp3-interactive"
      style={{ marginTop: '1rem' }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Category</th>
          <th>Title</th>
          <th>Price</th>
          <th>USD</th>
          <th>Deposit</th>
          <th>Seller</th>
          <th>Created</th>
          <th>Events</th>
        </tr>
      </thead>
      <tbody>
        {data.marketplace.allListings.map(a => (
          <tr
            key={a.id}
            onClick={() => history.push(`/marketplace/listings/${a.id}`)}
          >
            <td>{a.id}</td>
            <td>{status(a)}</td>
            <td>{a.ipfs ? startCase(a.ipfs.category.replace(/^schema\./, '')) : null}</td>
            <td>
              <div className="ellip">{a.ipfs ? a.ipfs.title : null}</div>
            </td>
            <td>{a.ipfs ? currency(a.ipfs.price) : null}</td>
            <td>
              <Price
                amount={a.ipfs && a.ipfs.price ? a.ipfs.price.amount : 0}
              />
            </td>
            <td>{a.deposit !== '0' ? currency({ amount: a.deposit, currency: 'OGN' }) : null}</td>
            <td>{a.seller ? <Identity account={a.seller.id} /> : null}</td>
            <td>{a.createdEvent ? formatDate(a.createdEvent.timestamp) : null}</td>
            <td>{a.totalEvents > 1 ? a.totalEvents : null}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default withRouter(Listings)
