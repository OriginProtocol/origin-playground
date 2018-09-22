import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { Button } from '@blueprintjs/core'

import { resetContracts } from '../../graphql/context'
import NodeAccounts from './_NodeAccounts'
import WalletAccounts from './_WalletAccounts'
import CreateWallet from './_CreateWallet'

import {
  CreateWalletMutation,
  DeployTokenMutation,
  SendFromNodeMutation,
  TransferTokenMutation,
  DeployMarketplaceMutation,
  UpdateTokenAllowanceMutation
} from '../../mutations'

import query from './_query'

import gqlClient from '../../graphqlClient'

async function populate(NodeAccount) {
  const refetchQueries = ['AllAccounts']

  const Admin = (await gqlClient.mutate({
    mutation: CreateWalletMutation,
    variables: { role: 'Admin', name: 'Admin' }
  })).data.createWallet.id

  await gqlClient.mutate({
    mutation: SendFromNodeMutation,
    variables: { to: Admin, from: NodeAccount, value: '0.5' },
    refetchQueries
  })

  const OGN = (await gqlClient.mutate({
    mutation: DeployTokenMutation,
    variables: {
      name: 'Origin Token',
      symbol: 'OGN',
      decimals: '18',
      supply: '1000000000'
    }
  })).data.deployToken

  const Marketplace = (await gqlClient.mutate({
    mutation: DeployMarketplaceMutation,
    variables: { token: OGN, version: '001', autoWhitelist: true },
    refetchQueries
  })).data.deployMarketplace

  const Seller = (await gqlClient.mutate({
    mutation: CreateWalletMutation,
    variables: { role: 'Seller', name: 'Stan' }
  })).data.createWallet.id

  await gqlClient.mutate({
    mutation: SendFromNodeMutation,
    variables: { to: Seller, from: NodeAccount, value: '0.5' },
    refetchQueries
  })

  await gqlClient.mutate({
    mutation: TransferTokenMutation,
    variables: { token: 'ogn', to: Seller, from: Admin, value: '500' }
  })

  await gqlClient.mutate({
    mutation: UpdateTokenAllowanceMutation,
    variables: { token: 'ogn', to: Marketplace, from: Seller, value: '500' },
    refetchQueries
  })

  const Buyer = (await gqlClient.mutate({
    mutation: CreateWalletMutation,
    variables: { role: 'Buyer', name: 'Nick' }
  })).data.createWallet.id

  await gqlClient.mutate({
    mutation: SendFromNodeMutation,
    variables: { to: Buyer, from: NodeAccount, value: '0.5' },
    refetchQueries
  })

  const Arbitrator = (await gqlClient.mutate({
    mutation: CreateWalletMutation,
    variables: { role: 'Arbitrator', name: 'Origin' }
  })).data.createWallet.id

  await gqlClient.mutate({
    mutation: SendFromNodeMutation,
    variables: { to: Arbitrator, from: NodeAccount, value: '0.5' },
    refetchQueries
  })

  const Affiliate = (await gqlClient.mutate({
    mutation: CreateWalletMutation,
    variables: { role: 'Affiliate', name: 'Origin' }
  })).data.createWallet.id

  await gqlClient.mutate({
    mutation: SendFromNodeMutation,
    variables: { to: Affiliate, from: NodeAccount, value: '0.1' },
    refetchQueries
  })
}

class Accounts extends Component {
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data, client }) => {
          if (loading) return <p className="mt-3">Loading...</p>
          if (error) {
            return <p className="mt-3">Error :(</p>
          }
          if (!data || !data.web3) {
            return null
          }

          const maxNodeAccount = [...data.web3.nodeAccounts].sort((a, b) => {
            if (Number(a.balance.eth) > Number(b.balance.eth)) return -1
            if (Number(a.balance.eth) < Number(b.balance.eth)) return 1
            return 0
          })[0]

          return (
            <>
              <CreateWallet />
              <WalletAccounts
                data={data.web3}
                maxNodeAccount={maxNodeAccount ? maxNodeAccount.id : null}
              />
              <NodeAccounts data={data.web3.nodeAccounts} />
              <Button
                style={{ marginTop: '1rem' }}
                intent="danger"
                onClick={async () => {
                  localStorage.clear()
                  web3.eth.accounts.wallet.clear()
                  resetContracts()
                  await client.cache.reset()
                  await client.resetStore()
                }}
                text="Reset"
              />
              <Button
                style={{ marginTop: '1rem', marginLeft: '0.5rem' }}
                intent="success"
                onClick={() =>
                  populate(maxNodeAccount ? maxNodeAccount.id : null)
                }
                text="Populate"
              />
            </>
          )
        }}
      </Query>
    )
  }
}

export default Accounts
