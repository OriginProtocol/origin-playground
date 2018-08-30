import React, { Component } from 'react'

import TransactionModal from 'components/TransactionModal'

class ExecuteRuling extends Component {
  constructor(props) {
    super(props)
    const ipfs = { reason: '' }
    this.state = { ipfs, ruling: '1', commission: '0', refund: '0' }
  }

  render() {
    const contractRows = [
      {
        type: 'select',
        label: 'Ruling',
        field: 'ruling',
        options: [
          ['0', 'Pay seller'],
          ['1', 'Refund buyer in full'],
        ]
      },
      {
        label: 'Partial Refund',
        appendLabel: this.props.offer.currencyId,
        field: 'refund',
        showIf: data => data.ruling === '0'
      },
      {
        type: 'select',
        label: 'Commission',
        field: 'commission',
        options: [
          ['0', 'Pay to affiliate'],
          ['1', 'Refund to seller'],
        ]
      }
    ]

    let ipfsRows = [
      { label: 'Reason', field: 'reason' }
    ]

    return (
      <TransactionModal
        {...this.props}
        title="Execute Ruling:"
        contractRows={contractRows}
        ipfsRows={ipfsRows}
        data={this.state}
        executeText="Execute Ruling"
        onExecute={json => this.props.executeRuling(json)}
      />
    )
  }
}

export default ExecuteRuling
