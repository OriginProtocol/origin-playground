import React from 'react'
import { withRouter } from 'react-router'

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
          <th>Title</th>
          <th>Price</th>
          <th>Deposit</th>
          <th>Seller</th>
        </tr>
      </thead>
      <tbody>
        {data.marketplace.allListings.map(a => (
          <tr
            key={a.id}
            onClick={() => history.push(`/marketplace/listings/${a.id}`)}
          >
            <td>{a.id}</td>
            <td>{a.ipfs ? a.ipfs.title : ''}</td>
            <td>
              {a.ipfs ? `${a.ipfs.price} ${a.ipfs.currencyId || ''}` : ''}
            </td>
            <td>{a.deposit}</td>
            <td>{a.seller.id.substr(0, 6)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default withRouter(Listings)
