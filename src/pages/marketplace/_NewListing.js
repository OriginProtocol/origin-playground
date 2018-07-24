import React, { Component } from 'react'

import TransactionModal from 'components/TransactionModal'

import * as Blobs from '../../../data/example-ipfs-blobs.js'

export const ExampleListings = [
  {
    ...Blobs.ForSaleListing,
    title: 'Bike For Sale',
    price: '50',
    listingType: 'For Sale'
  },
  {
    ...Blobs.RideShareListing,
    title: 'Driver For Hire',
    price: '10',
    listingType: 'Car Share'
  },
  {
    ...Blobs.HomeshareListing,
    title: 'Home For Rent',
    price: '85',
    listingType: 'Home Share'
  },
  {
    ...Blobs.TicketedEventListing,
    title: 'Ticket For Sale',
    price: '60',
    listingType: 'Ticket'
  }
]

class NewListing extends Component {
  constructor(props) {
    super(props)
    const arbitrator = props.parties.find(p => p.name === 'Arbitrator')
    const rnd = Math.floor(Math.random() * ExampleListings.length)
    const ipfs = { ...ExampleListings[rnd], currencyId: 'DAI' }
    this.state = {
      ipfs,
      deposit: '10',
      arbitrator: arbitrator ? arbitrator.address : ''
    }
  }

  render() {
    const contractRows = [
      {
        type: 'select',
        label: 'Arbitrator',
        field: 'arbitrator',
        options: [
          ['0x0', 'None'],
          ...this.props.parties.map(party => [party.address, party.name])
        ]
      },
      {
        label: 'Deposit',
        appendLabel: 'OGN',
        field: 'deposit'
      }
    ]

    const ipfsRows = [
      {
        type: 'select',
        label: 'Type',
        field: 'listingType',
        options: ['For Sale', 'Home Share', 'Car Share', 'Ticket', 'Job Offer']
      },
      { label: 'Title', field: 'title' },
      {
        type: 'select',
        label: 'Currency',
        field: 'currencyId',
        options: ['ETH', 'DAI']
      },
      {
        label: 'Price',
        field: 'price',
        appendLabel: data => data.currencyId
      }
    ]

    return (
      <TransactionModal
        {...this.props}
        title="Add a New Listing:"
        contractRows={contractRows}
        ipfsRows={ipfsRows}
        data={this.state}
        executeText="Create"
        onExecute={json => {
          var ipfs = json.ipfs
          if (this.props.party && this.props.party.publicKey) {
            ipfs.publicKey = this.props.party.publicKey
          }
          var obj = {
            deposit: json.deposit,
            arbitrator: json.arbitrator,
            ipfs
          }
          this.props.createListing(obj)
        }}
      />
    )
  }
}

export default NewListing
