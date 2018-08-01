import React, { Component } from 'react'

import TransactionModal from 'components/TransactionModal'

class PartialRefund extends Component {
  constructor(props) {
    super(props)
    const ipfs = { reason: '' }
    this.state = {
      ipfs,
      refund: props.offer.refund || '0'
    }
  }

  render() {
    const contractRows = [
      {
        label: 'Refund',
        appendLabel: this.props.offer.currencyId,
        field: 'refund'
      }
    ]

    let ipfsRows = [
      { label: 'Reason', field: 'reason' }
    ]

    return (
      <TransactionModal
        {...this.props}
        title="Partial Refund:"
        contractRows={contractRows}
        ipfsRows={ipfsRows}
        data={this.state}
        executeText="Refund"
        onExecute={json => {
          this.props.updateRefund(json)
        }}
      />
    )
  }
}

export default PartialRefund
