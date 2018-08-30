import React, { Component } from 'react'

import TransactionModal from 'components/TransactionModal'

import * as Blobs from '../../../data/example-ipfs-blobs.js'

class NewOffer extends Component {
  constructor(props) {
    super(props)
    const arbitrator = props.parties.find(
      p => p.name === 'Arbitrator'
    )
    let obj = {
      expires: this.days(1 / 6),
    }

    if (props.listing.ipfs.listingType === 'For Sale') {
      obj = { ...Blobs.ForSaleOffer, ...obj }
    } else if (props.listing.ipfs.listingType === 'Car Share') {
      obj = { ...Blobs.RideShareOffer, ...obj }
    } else if (props.listing.ipfs.listingType === 'Home Share') {
      obj = { ...Blobs.HomeshareOffer, ...obj }
    } else if (props.listing.ipfs.listingType === 'Ticket') {
      obj = { ...Blobs.TicketedEventOffer, ...obj }
    }

    obj.currencyId = props.listing.ipfs.currencyId
    this.state = {
      amount: props.offer ? props.offer.amount : props.listing.ipfs.price,
      finalizes: this.days(1 / 2),
      commission: '2',
      affiliate: '',
      arbitrator: arbitrator ? arbitrator.address : '',
      ipfs: obj,
      encrypt: false,
    }
  }

  days(d) {
    if (this.props.timestamp) {
      return this.props.timestamp + 60 * 60 * 24 * d
    }
    return Math.floor((+new Date() + 1000 * 60 * 60 * 24 * d) / 1000)
  }

  daysRelative(d) {
    return 60 * 60 * 24 * d
  }

  render() {
    const contractRows = [
      {
        label: 'Amount',
        appendLabel: this.props.listing.ipfs.currencyId,
        field: 'amount'
      },
      {
        type: 'select',
        label: 'Finalizes',
        field: 'finalizes',
        options: [
          [this.days(1 / 6), '4 hours'],
          [this.days(1 / 2), '12 hours'],
          [this.days(1), '1 day'],
          [this.days(2), '2 days'],
          [this.days(7), '7 days'],
          [this.days(30), '1 month'],
          [this.daysRelative(1 / 6), '4 hours after seller accepts'],
          [this.daysRelative(1 / 2), '12 hours after seller accepts'],
          [this.daysRelative(1), '1 day after seller accepts'],
          [this.daysRelative(2), '2 days after seller accepts'],
          [this.daysRelative(7), '7 days after seller accepts'],
          [this.daysRelative(30), '1 month after seller accepts']
        ]
      },
      {
        type: 'select',
        label: 'Affiliate',
        field: 'affiliate',
        options: [
          ['0x0', 'None'],
          ...this.props.parties.map(party => [party.address, party.name])
        ]
      },
      {
        label: 'Commission',
        appendLabel: 'OGN',
        field: 'commission',
        showIf: data => data.affiliate && data.affiliate !== '0x0'
      },
      {
        type: 'select',
        label: 'Arbitrator',
        field: 'arbitrator',
        options: this.props.parties.map(party => [party.address, party.name])
      },
      { type: 'checkbox', label: 'Encrypt IPFS JSON', field: 'encrypt' }
    ]

    const ipfsRows = [
      {
        type: 'select',
        label: 'Expires',
        field: 'expires',
        options: [
          [this.days(1 / 6), '4 hours'],
          [this.days(1 / 2), '12 hours'],
          [this.days(1), '1 day'],
          [this.days(2), '2 days'],
          [this.days(7), '7 days'],
          [this.days(30), '1 month']
        ]
      },
    ]

    return (
      <TransactionModal
        {...this.props}
        title="Add a New Offer:"
        contractRows={contractRows}
        ipfsRows={ipfsRows}
        data={this.state}
        executeText="Make Offer"
        onExecute={json => {
          const ipfs = json.ipfs
          if (this.props.party && this.props.party.publicKey) {
            ipfs.publicKey = this.props.party.publicKey
          }

          const obj = {
            amount: json.amount,
            expires: json.ipfs.expires,
            finalizes: json.finalizes,
            arbitrator: json.arbitrator,
            ipfs: json.ipfs
          }
          if (json.affiliate === '' && json.affiliate !== '0x0') {
            obj.commission = 0
          } else {
            obj.commission = json.commission
            obj.affiliate = json.affiliate
          }
          if (json.encrypt) {
            obj.encrypt = true
            obj.publicKey = this.props.activeParty.publicKey
          }
          if (json.reviseOffer !== null) {
            obj.withdraw = this.props.reviseOffer
          }

          this.props.makeOffer(obj)
        }}
      />
    )
  }
}

export default NewOffer
