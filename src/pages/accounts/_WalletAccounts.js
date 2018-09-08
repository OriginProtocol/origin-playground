import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import SendFromNodeBtn from './_SendFromNodeBtn'
import RemoveWalletBtn from './_RemoveWalletBtn'

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

const WalletAccounts = ({ data: { accounts, nodeAccounts } }) => (
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
    {setActiveWallet => (
      <table
        className="bp3-html-table bp3-small bp3-html-table-bordered"
        style={{ marginTop: '1rem' }}
      >
        <thead>
          <tr>
            <th>Wallet</th>
            <th>Eth</th>
            <th>USD</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {accounts.map(a => (
            <tr
              key={a.id}
              onClick={() => setActiveWallet({ variables: { address: a.id } })}
            >
              <td>{a.id}</td>
              <td>{a.balance.eth}</td>
              <td>{a.balance.usd}</td>
              <td>
                <SendFromNodeBtn
                  from={nodeAccounts[0].id}
                  to={a.id}
                  value="0.5"
                />
                <RemoveWalletBtn address={a.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Mutation>
)

export default WalletAccounts
