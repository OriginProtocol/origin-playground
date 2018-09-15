import React, { Component } from 'react'
import { Query } from 'react-apollo'

import transactionsQuery from './_transactionsQuery'

import { ProgressBar } from '@blueprintjs/core'

import Toaster from '../Toaster'

class TransactionToasts extends Component {
  componentDidMount() {
    this.transactions = {}
    this.hide = {}
    const q = gql.watchQuery({
      query: transactionsQuery,
      pollInterval: 2000
    })
    q.subscribe({
      next: result => {
        result.data.web3.transactions.forEach(t => {
          if (!this.hide[t.id]) {
            const confirmed = t.status === 'Confirmed 3 times'
            const pct = confirmed ? 1 : Number(t.pct)

            this.transactions[t.id] = Toaster.show(
              {
                message: this.renderProgress(t, pct),
                timeout: confirmed ? 3000 : 0,
                onDismiss: () => {
                  this.hide[t.id] = true
                  // q.stopPolling()
                }
              },
              this.transactions[t.id]
            )
          }
        })
      }
    })
  }

  render() {
    return (
      <Query query={transactionsQuery}>
        {({ loading, error, data }) => {
          if (loading || error || !data) return null

          return null
        }}
      </Query>
    )
  }

  renderProgress(transaction, pct) {
    const amount = Number(pct)
    const confirmed = transaction.status === 'Confirmed 3 times'
    return (
      <div>
        <div className="mb-2">{`Status: ${transaction.status}`}</div>
        <ProgressBar
          stripes={!confirmed}
          intent={confirmed ? 'success' : 'primary'}
          value={amount}
        />
      </div>
    )
  }
}

export default TransactionToasts
