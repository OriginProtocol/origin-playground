import React, { Component } from 'react'
import { Query } from 'react-apollo'

import NodeAccounts from './_NodeAccounts'
import WalletAccounts from './_WalletAccounts'
import CreateWallet from './_CreateWallet'

import query from './_query'
window.q = query

class Accounts extends Component {
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <p className="mt-3">Loading...</p>
          if (error) {
            return <p className="mt-3">Error :(</p>
          }

          return (
            <>
              <NodeAccounts data={data.web3.nodeAccounts} />
              <WalletAccounts data={data.web3} />
              <CreateWallet />
            </>
          )
        }}
      </Query>
    )
  }
}

export default Accounts
