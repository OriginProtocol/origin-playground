import React from 'react'
import { withRouter } from 'react-router'
import currency from 'utils/currency'
import formatDate from 'utils/formatDate'

import Price from 'components/Price'

function sellerName(seller) {
  if (seller.identity && seller.identity.profile) {
    const { profile } = seller.identity
    if (profile.firstName) {
      return `${profile.firstName} ${profile.lastName}`      
    }
  }
  return seller.id.substr(0, 6)
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
          <th>Category</th>
          <th>Title</th>
          <th>Price</th>
          <th>USD</th>
          <th>Deposit</th>
          <th>Seller</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {data.marketplace.allListings.map(a => (
          <tr
            key={a.id}
            onClick={() => history.push(`/marketplace/listings/${a.id}`)}
          >
            <td>{a.id}</td>
            <td>{a.ipfs ? a.ipfs.category : null}</td>
            <td>
              <div className="ellip">{a.ipfs ? a.ipfs.title : null}</div>
            </td>
            <td>{a.ipfs ? currency(a.ipfs.price) : null}</td>
            <td>
              <Price
                amount={a.ipfs && a.ipfs.price ? a.ipfs.price.amount : 0}
              />
            </td>
            <td>{currency({ amount: a.deposit, currency: 'OGN' })}</td>
            <td>{a.seller ? sellerName(a.seller) : null}</td>
            <td>{a.createdEvent ? formatDate(a.createdEvent.block.timestamp) : null}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default withRouter(Listings)
