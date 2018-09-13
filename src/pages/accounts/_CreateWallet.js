import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Button, ControlGroup, HTMLSelect, InputGroup } from '@blueprintjs/core'

import query from './_query'

import { CreateWalletMutation } from '../../mutations'

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
        mutation={CreateWalletMutation}
        update={(cache, { data }) => {
          const res = cache.readQuery({ query })
          const accounts = res.web3.accounts || []
          console.log(data.createWallet)
          cache.writeQuery({
            query,
            data: {
              web3: {
                ...res.web3,
                accounts: [...accounts, data.createWallet]
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
