import React, { Component } from 'react'

import TransactionModal from 'components/TransactionModal'

import * as Blobs from '../../../data/example-ipfs-blobs.js'

export const ListingTypes = [
  { type: 'For Sale', example: Blobs.ForSaleListing },
  { type: 'Home Share', example: Blobs.HomeshareListing },
  { type: 'Car Share', example: Blobs.RideShareListing },
  { type: 'Ticket', example: Blobs.TicketedEventListing }
]

class NewListing extends Component {
  constructor(props) {
    super(props)
    const arbitrator = props.parties.find(p => p.name === 'Arbitrator')
    const ipfs = { currencyId: 'DAI' }
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

    let ipfsRows = [
      { label: 'Title', field: 'title' },
      {
        type: 'select',
        label: 'Currency',
        field: 'currencyId',
        options: ['ETH', 'DAI']
      }
    ]

    if (this.state.listingType === 'Home Share') {
      ipfsRows = [
        ...ipfsRows,
        {
          label: 'Description',
          field: 'description'
        },
        {
          label: 'Price / nt',
          field: 'price',
          appendLabel: data => data.currencyId
        }
      ]
    } else {
      ipfsRows = [
        ...ipfsRows,
        {
          label: 'Price',
          field: 'price',
          appendLabel: data => data.currencyId
        }
      ]
    }

    return (
      <TransactionModal
        {...this.props}
        title="Add a New Listing:"
        contractRows={contractRows}
        ipfsRows={ipfsRows}
        data={this.state}
        content={this.state.listingType ? null : this.renderStep1()}
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

  renderStep1() {
    return (
      <div className="d-flex flex-column mt-2">
        {ListingTypes.map((listingType, idx) => (
          <button
            key={idx}
            className="btn btn-outline-primary mb-2"
            onClick={() =>
              this.setState({
                listingType: listingType.type,
                ipfs: { ...listingType.example }
              })
            }
          >
            {listingType.type}
          </button>
        ))}
      </div>
    )
  }
}

export default NewListing
