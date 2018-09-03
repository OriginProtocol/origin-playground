import React, { Component } from 'react'

import TransactionModal from 'components/TransactionModal'

class WithdrawOffer extends Component {
  constructor(props) {
    super(props)
    const ipfs = { reason: '' }
    this.state = { ipfs }
  }

  render() {
    let ipfsRows = [
      { label: 'Reason', field: 'reason' }
    ]

    return (
      <TransactionModal
        {...this.props}
        title="Withdraw:"
        ipfsRows={ipfsRows}
        data={this.state}
        executeText="Withdraw"
        onExecute={json => this.props.withdrawOffer(json)}
      />
    )
  }
}

export default WithdrawOffer
