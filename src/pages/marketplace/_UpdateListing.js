import React, { Component } from 'react'

import TransactionModal from 'components/TransactionModal'

class UpdateListing extends Component {
  render() {
    const contractRows = [
      { label: '+ Deposit', appendLabel: 'OGN', field: 'deposit' }
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
        appendLabel: this.props.listing.ipfs.currencyId
      }
    ]

    return (
      <TransactionModal
        {...this.props}
        title="Update Listing:"
        contractRows={contractRows}
        ipfsRows={ipfsRows}
        data={{ ...this.props.listing, deposit: '0' }}
        executeText="Update"
        onExecute={json => this.props.updateListing(json)}
      />
    )
  }
}

export default UpdateListing
