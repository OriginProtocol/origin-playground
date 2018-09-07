import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@blueprintjs/core'

import query from './_query'

const CreateWallet = gql`
  mutation CreateWallet {
    createWallet {
      id
      balance {
        eth
        wei
        usd
      }
    }
  }
`

const CreateWalletBtn = () => (
  <Mutation
    mutation={CreateWallet}
    update={(cache, { data }) => {
      const res = cache.readQuery({ query })
      cache.writeQuery({
        query,
        data: {
          web3: {
            ...res.web3,
            accounts: res.web3.accounts.concat([
              data.createWallet
            ]),
            defaultAccount: data.createWallet
          }
        }
      })
    }}
  >
    {createWallet => (
      <Button
        icon="refresh"
        onClick={() => createWallet()}
        text="Create Wallet"
      />
    )}
  </Mutation>
)

export default CreateWalletBtn
