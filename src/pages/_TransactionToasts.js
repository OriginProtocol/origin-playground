import React, { Component } from 'react'
import gql from 'graphql-tag'
import gqlClient from '../graphqlClient'

import { ProgressBar } from '@blueprintjs/core'
import { RefetchMutation } from '../mutations'

const TransactionSubscription = gql`
  subscription onTransactionUpdated {
    transactionUpdated {
      id
      status
      mutation
      confirmations
    }
  }
`

const refetchQueries = {
  sendFromWallet: ['AllAccounts'],
  deployToken: ['AllContracts'],
  createListing: ['AllAccounts', 'AccountsWithAllowance', 'AllListings'],
  updateListing: [
    'AllAccounts',
    'AccountsWithAllowance',
    'AllListings',
    'Listing'
  ],
  makeOffer: ['AllAccounts', 'Listing'],
  acceptOffer: ['AllAccounts', 'Listing'],
  finalizeOffer: ['AllAccounts', 'Listing'],
  withdrawOffer: ['AllAccounts', 'Listing'],
  withdrawListing: ['Listing'],
  addFunds: ['AllAccounts', 'Listing'],
  updateRefund: ['AllAccounts', 'Listing'],
  disputeOffer: ['AllAccounts', 'Listing'],
  executeRuling: ['AllAccounts', 'Listing'],
  addData: ['AllAccounts', 'Listing']
}

import Toaster from './Toaster'

class TransactionToasts extends Component {
  componentDidMount() {
    this.transactions = {}
    this.hide = {}
    gqlClient.subscribe({ query: TransactionSubscription }).subscribe({
      next: async result => {
        try {
          const t = result.data.transactionUpdated
          if (
            t.status === 'confirmed' &&
            t.confirmations === 1 &&
            refetchQueries[t.mutation]
          ) {
            gqlClient.mutate({
              mutation: RefetchMutation,
              refetchQueries: refetchQueries[t.mutation]
            })
          }

          if (this.hide[t.id] === true) return
          const receipt = t.status === 'receipt'
          const confirmed = t.status === 'confirmed'
          let pct = 0.25
          if (receipt) {
            pct = 0.5
          }
          if (confirmed) {
            pct = 1
          }
          this.transactions[t.id] = Toaster.show(
            {
              message: this.renderProgress(t, pct),
              timeout: confirmed ? 3000 : 0,
              onDismiss: () => (this.hide[t.id] = true)
            },
            this.transactions[t.id]
          )
        } catch (e) {
          /* Ignore */
        }
      }
    })
  }

  render() {
    return null
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
