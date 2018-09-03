import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEvents } from 'actions/Marketplace'
import { selectAccount } from 'actions/Wallet'
import Dropdown from 'components/Dropdown'

import {
  makeOffer,
  acceptOffer,
  disputeOffer,
  getOffers
} from 'actions/Marketplace'

const Item = ({ text, onClick }) => (
  <a
    href="#"
    className="dropdown-item"
    onClick={e => {
      e.preventDefault()
      onClick()
    }}
  >
    {text}
  </a>
)

class QuickOffer extends Component {
  constructor() {
    super()
    this.state = { loading: false }
  }
  render() {
    const cls = this.state.loading ? 'spinner fa-spin' : 'caret-down'
    return (
      <Dropdown
        label={<i className={`fa fa-${cls}`} />}
        className="btn-group"
        linkClass=" btn btn-sm btn-outline-primary"
      >
        <Item text="New Offer" onClick={() => this.execute('new')} />
        <Item text="Accepted" onClick={() => this.execute('accept')} />
        <Item text="Disputed" onClick={() => this.execute('dispute')} />
      </Dropdown>
    )
  }

  async execute(stage) {
    const [
      Seller,
      Buyer, //Affiliate,
      ,
      Arbitrator
    ] = this.props.wallet.accounts

    const offerJson = {
      amount: '10',
      expires: Math.round(+new Date() / 1000) + 60 * 60,
      finalizes: Math.round(+new Date() / 1000) + 60 * 60 * 2,
      arbitrator: Arbitrator,
      commission: 0,
      buyer: Buyer,
      ipfs: { currencyId: 'DAI' }
    }

    const listingId = this.props.listing.id

    this.setState({ loading: true })
    this.props.selectAccount(Buyer)
    await new Promise(resolve =>
      this.props.makeOffer(listingId, offerJson, resolve)
    )

    if (stage === 'new') {
      await new Promise(resolve => this.props.getOffers(listingId, {}, resolve))
      this.setState({ loading: false })
      return
    }

    const lastOfferId = this.props.marketplace.lastOfferId
    this.props.selectAccount(Seller)
    await new Promise(resolve =>
      this.props.acceptOffer(listingId, lastOfferId, {}, resolve)
    )
    this.props.selectAccount(Buyer)

    if (stage === 'accept') {
      await new Promise(resolve => this.props.getOffers(listingId, {}, resolve))
      this.setState({ loading: false })
      return
    }

    await new Promise(resolve =>
      this.props.disputeOffer(listingId, lastOfferId, {}, resolve)
    )
    this.props.selectAccount(Arbitrator)

    await new Promise(resolve => this.props.getOffers(listingId, {}, resolve))

    this.setState({ loading: false })
  }
}

const mapStateToProps = state => ({
  marketplace: state.marketplace,
  wallet: state.wallet
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvents: () => dispatch(getEvents(ownProps.listing)),
  makeOffer: (...args) => dispatch(makeOffer(...args)),
  selectAccount: (...args) => dispatch(selectAccount(...args)),
  acceptOffer: (...args) => dispatch(acceptOffer(...args)),
  disputeOffer: (...args) => dispatch(disputeOffer(...args)),
  getOffers: (...args) => dispatch(getOffers(...args))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickOffer)
