import React, { Component } from 'react'
import { Query } from 'react-apollo'

import gql from 'graphql-tag'

const AccountsWithAllowance = gql`
  query AccountsWithAllowance($marketplace: String) {
    web3 {
      accounts {
        id
        role
        name
        ogn: token(symbol: "OGN") {
          id
          balance
          allowance(contract: $marketplace)
        }
      }
    }
  }
`

function withAccounts(WrappedComponent, marketplace) {
  return class WithAccounts extends Component {
    render() {
      return (
        <Query query={AccountsWithAllowance} variables={{ marketplace }}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return null; //<WrappedComponent {...this.props} accounts={[]} />
            }
            return (
              <WrappedComponent {...this.props} accounts={data.web3.accounts} />
            )
          }}
        </Query>
      )
    }
  }
}

export default withAccounts
