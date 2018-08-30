import React, { Component } from 'react'

import TransactionModal from 'components/TransactionModal'

class DisputeOffer extends Component {
  constructor(props) {
    super(props)
    const ipfs = { reason: '', refund: '0' }
    this.state = { ipfs }
  }

  render() {
    let ipfsRows = [
      { label: 'Reason', field: 'reason' },
      { label: 'Refund', field: 'refund' }
    ]

    return (
      <TransactionModal
        {...this.props}
        title="Dispute:"
        ipfsRows={ipfsRows}
        data={this.state}
        executeText="Start Dispute"
        onExecute={json => this.props.disputeOffer(json)}
      />
    )
  }
}

export default DisputeOffer
