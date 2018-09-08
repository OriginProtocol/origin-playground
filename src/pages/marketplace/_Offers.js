import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { Button, Tooltip, Tag } from '@blueprintjs/core'

import AcceptOffer from './mutations/_AcceptOffer'
import FinalizeOffer from './mutations/_FinalizeOffer'

const Offers = ({ listingId, offers }) => (
  <table className="bp3-html-table bp3-small bp3-interactive mt-3">
    <thead>
      <tr>
        <th>ID</th>
        <th>Offer</th>
        <th>Buyer</th>
        <th>C&apos;mn</th>
        <th>Affiliate</th>
        <th>Status</th>
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
        <OfferRow key={a.id} offer={a} listingId={listingId} />
      ))}
    </tbody>
  </table>
)

class OfferRow extends Component {
  state = {}

  render() {
    const { offer, listingId } = this.props
    return (
      <>
        <tr>
          <td>{offer.id}</td>
          <td>{price(offer)}</td>
          <td>{offer.buyer ? offer.buyer.id.substr(0, 6) : null}</td>
          <td>{offer.commission} OGN</td>
          <td>{offer.affiliate ? offer.affiliate.id.substr(0, 6) : null}</td>
          <td>{status(offer)}</td>
          <td style={{ borderLeft: '1px solid rgba(16, 22, 26, 0.15)' }}>
            {this.renderBuyerActions(offer)}
          </td>
          <td>{this.renderSellerActions(offer)}</td>
          <td />
          <td>
            <Tooltip content="Add Data">
              <Button icon="comment" />
            </Tooltip>
          </td>
        </tr>

        <AcceptOffer
          isOpen={this.state.acceptOffer}
          listingId={listingId}
          offerId={offer.id}
          onCompleted={() => this.setState({ acceptOffer: false })}
        />

        <FinalizeOffer
          isOpen={this.state.finalizeOffer}
          listingId={listingId}
          offerId={offer.id}
          onCompleted={() => this.setState({ finalizeOffer: false })}
        />
      </>
    )
  }

  renderBuyerActions(offer) {
    if (offer.status === 1) {
      return (
        <>
          <Tooltip content="Update">
            <Button icon="edit" style={{ marginRight: 5 }} />
          </Tooltip>
          <Tooltip content="Withdraw">
            <Button intent="danger" icon="trash" />
          </Tooltip>
        </>
      )
    }
    if (offer.status === 2) {
      return (
        <>
          <Tooltip content="Finalize">
            <Button
              intent="success"
              style={{ marginRight: 5 }}
              icon="tick"
              onClick={() => this.setState({ finalizeOffer: true })}
            />
          </Tooltip>
          <Tooltip content="Add Funds">
            <Button icon="dollar" style={{ marginRight: 5 }} />
          </Tooltip>
          <Tooltip content="Dispute">
            <Button intent="danger" icon="issue" />
          </Tooltip>
        </>
      )
    }
  }

  renderSellerActions(offer) {
    if (offer.status === 2) {
      return (
        <>
          <Tooltip content="Set Refund">
            <Button icon="dollar" />
          </Tooltip>
          <Tooltip content="Dispute">
            <Button intent="danger" style={{ marginLeft: 5 }} icon="issue" />
          </Tooltip>
        </>
      )
    }
    if (offer.status === 1) {
      return (
        <>
          <Tooltip content="Accept">
            <Button
              intent="success"
              icon="tick"
              onClick={() => this.setState({ acceptOffer: true })}
            />
          </Tooltip>
          <Tooltip content="Decline">
            <Button intent="danger" style={{ marginLeft: 5 }} icon="cross" />
          </Tooltip>
        </>
      )
    }
  }
}

function price(offer) {
  if (offer.currency !== '0x0000000000000000000000000000000000000000') {
    return offer.value
  } else {
    return web3.utils.fromWei(offer.value, 'ether') + ' ETH'
  }
}

function status(offer) {
  if (offer.status === 1) {
    return <Tag>New</Tag>
  }
  if (offer.status === 2) {
    return <Tag intent="primary">Accepted</Tag>
  }
  if (offer.status === 4) {
    return <Tag intent="success">Finalized</Tag>
  }
  return offer.status
}

export default withRouter(Offers)
