import React, { Component } from 'react'

import TransactionModal from 'components/TransactionModal'

class AddFunds extends Component {
  constructor(props) {
    super(props)
    const ipfs = { reason: '' }
    this.state = { ipfs, amount: '0' }
  }

  render() {
    const contractRows = [
      {
        label: 'Amount',
        appendLabel: this.props.offer.currencyId,
        field: 'amount'
      }
    ]

    let ipfsRows = [
      { label: 'Reason', field: 'reason' }
    ]

    return (
      <TransactionModal
        {...this.props}
        title="Add Funds:"
        contractRows={contractRows}
        ipfsRows={ipfsRows}
        data={this.state}
        executeText="Add Funds"
        onExecute={json => {
          this.props.addFunds(json)
        }}
      />
    )
  }
}

export default AddFunds
