import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { Button } from '@blueprintjs/core'

import fragments from '../../fragments'
import query from './_query'

const SetActiveWalletMutation = gql`
  mutation SetActiveWallet($address: String!) {
    setActiveWallet(address: $address) {
      ...balanceFields
    }
  }
  ${fragments.Account.balance}
`

const SetWalletMutation = ({ children }) => (
  <Mutation
    mutation={SetActiveWalletMutation}
    update={(cache, result) => {
      const res = cache.readQuery({ query })
      cache.writeQuery({
        query,
        data: {
          web3: {
            ...res.web3,
            defaultAccount: result.data.setActiveWallet
          }
        }
      })
    }}
  >
    {mutation => children(mutation)}
  </Mutation>
)

export const AccountButton = ({ account }) => {
  if (!account) { return null }
  const accountId = typeof account === 'string' ? account : account.id
  if (accountId === '0x0000000000000000000000000000000000000000') {
    return null
  }
  return (
    <Query query={query}>
      {({ loading, error, data }) =>
        !loading && !error && data.web3.defaultAccount ? (
          <SetWalletMutation>
            {setActiveWallet => (
              <Button
                small={true}
                active={data.web3.defaultAccount.id === accountId}
                disabled={!data.web3.accounts.find(a => a.id === accountId)}
                onClick={() =>
                  setActiveWallet({ variables: { address: accountId } })
                }
              >
                {accountId.substr(0, 6)}
              </Button>
            )}
          </SetWalletMutation>
        ) : null
      }
    </Query>
  )
}
export default SetWalletMutation
