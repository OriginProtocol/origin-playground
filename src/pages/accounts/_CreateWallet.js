import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, ControlGroup, HTMLSelect, InputGroup } from '@blueprintjs/core'

import fragments from '../../fragments'
import query from './_query'

const CreateWallet = gql`
  mutation CreateWallet($role: String, $name: String) {
    createWallet(role: $role, name: $name) {
      ...balanceFields
    }
  }
  ${fragments.Account.balance}
`

class CreateWalletBtn extends Component {
  state = {
    role: 'Buyer',
    name: ''
  }
  render() {
    const input = field => ({
      value: this.state[field],
      onChange: e => this.setState({ [field]: e.currentTarget.value })
    })
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
                accounts: res.web3.accounts.concat([data.createWallet])
              }
            }
          })
        }}
      >
        {createWallet => (
          <ControlGroup>
            <InputGroup {...input('name')} placeholder="Name" />
            <HTMLSelect
              options={['Buyer', 'Seller', 'Arbitrator', 'Admin']}
              {...input('role')}
            />
            <Button
              icon="add"
              onClick={() =>
                createWallet({
                  variables: { role: this.state.role, name: this.state.name }
                })
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
