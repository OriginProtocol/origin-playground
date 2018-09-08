import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, ControlGroup, HTMLSelect } from '@blueprintjs/core'

import query from './_query'

const CreateWallet = gql`
  mutation CreateWallet($role: String) {
    createWallet(role: $role) {
      id
      role
      balance {
        eth
        wei
        usd
      }
    }
  }
`

class CreateWalletBtn extends Component {
  state = {
    role: 'Buyer'
  }
  render() {
    return (
      <Mutation
        mutation={CreateWallet}
        update={(cache, { data }) => {
          const res = cache.readQuery({ query })
          cache.writeQuery({
            query,
            data: {
              web3: {
                ...res.web3,
                accounts: res.web3.accounts.concat([data.createWallet]),
                defaultAccount: data.createWallet
              }
            }
          })
        }}
      >
        {createWallet => (
          <ControlGroup>
            <HTMLSelect
              options={['Buyer', 'Seller', 'Arbitrator', 'Admin']}
              value={this.state.role}
              onChange={e => this.setState({ role: e.target.value })}
            />
            <Button
              icon="add"
              onClick={() =>
                createWallet({ variables: { role: this.state.role } })
              }
              text="Create Wallet"
            />
          </ControlGroup>
        )}
      </Mutation>
    )
  }
}

export default CreateWalletBtn
