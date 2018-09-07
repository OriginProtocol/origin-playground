import React from 'react'
import { withRouter } from 'react-router'

import { Button, Tooltip } from '@blueprintjs/core'

function price(offer) {
  if (offer.currency !== '0x0000000000000000000000000000000000000000') {
    return offer.value
  } else {
    return web3.utils.fromWei(offer.value, 'ether') + ' ETH'
  }
}

const Offers = ({ listingId, offers, history }) => {
  return (
    <table
      className="bp3-html-table bp3-small bp3-interactive"
      style={{ marginTop: '1rem' }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Offer</th>
          <th>Buyer</th>
          <th>Affiliate</th>
          <th>Commission</th>
          <th style={{ borderLeft: '1px solid rgba(16, 22, 26, 0.15)' }}>
            Buyer
          </th>
          <th>Seller</th>
          <th>Arbitrator</th>
          <th>Other</th>
        </tr>
      </thead>
      <tbody>
        {offers.map(a => (
          <tr
            key={a.id}
            onClick={() =>
              history.push(`/marketplace/listings/${listingId}/offers/${a.id}`)
            }
          >
            <td>{a.id}</td>
            <td>{price(a)}</td>
            <td>{a.buyer ? a.buyer.id.substr(0, 6) : null}</td>
            <td>{a.affiliate ? a.affiliate.id.substr(0, 6) : null}</td>
            <td>{a.commission} OGN</td>
            {/* <td style={{ borderLeft: '1px solid rgba(16, 22, 26, 0.15)' }}>
              <Tooltip content="Finalize">
                <Button
                  intent="success"
                  style={{ marginRight: 5 }}
                  icon="tick"
                />
              </Tooltip>
              <Tooltip content="Add Funds">
                <Button icon="dollar" style={{ marginRight: 5 }} />
              </Tooltip>
              <Tooltip content="Dispute">
                <Button intent="danger" icon="issue" />
              </Tooltip>
            </td>
            <td>
              <Tooltip content="Set Refund">
                <Button icon="dollar" />
              </Tooltip>
              <Tooltip content="Dispute">
                <Button
                  intent="danger"
                  style={{ marginLeft: 5 }}
                  icon="issue"
                />
              </Tooltip>
            </td> */}
            <td style={{ borderLeft: '1px solid rgba(16, 22, 26, 0.15)' }}>
              <Tooltip content="Update">
                <Button icon="plus" style={{ marginRight: 5 }} />
              </Tooltip>
              <Tooltip content="Withdraw">
                <Button intent="danger" icon="trash" />
              </Tooltip>
            </td>
            <td>
              <Tooltip content="Accept">
                <Button intent="success" icon="tick" />
              </Tooltip>
              <Tooltip content="Decline">
                <Button
                  intent="danger"
                  style={{ marginLeft: 5 }}
                  icon="cross"
                />
              </Tooltip>
            </td>
            <td />
            <td>
              <Tooltip content="Add Data">
                <Button icon="comment" />
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default withRouter(Offers)
