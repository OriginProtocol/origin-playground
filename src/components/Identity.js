import React, { Component } from 'react'
import { Query } from 'react-apollo'

import gql from 'graphql-tag'

const IdentityQuery = gql`
  query IdentityQuery($account: String!){
    web3 {
      account(id: $account) {
        id
        identity {
          id
          profile {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`

class Identity extends Component {
  render() {
    const { account } = this.props
    if (!account) return null
    return (
      <Query query={IdentityQuery} variables={{ account }}>
        {({ loading, error, data }) => {
          if (loading || error) return account.substr(0, 6)
          try {
            const { firstName, lastName } = data.web3.account.identity.profile
            return (
              <span>{`${firstName} ${lastName}`}</span>
            )
          } catch(e) {
            return account.substr(0, 6)
          }
        }}
      </Query>
    )
  }
}

export default Identity
