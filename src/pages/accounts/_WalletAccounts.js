import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
  HTMLTable,
  Icon,
  Popover,
  Position,
  Button,
  Menu
} from '@blueprintjs/core'

import SendFromNodeBtn from './_SendFromNodeBtn'
import RemoveWalletBtn from './_RemoveWalletBtn'

import AccountButton from '../accounts/AccountButton'

import numberFormat from 'utils/numberFormat'

const TransferToken = gql`
  mutation TransferToken(
    $token: String!
    $from: String!
    $to: String!
    $value: String!
  ) {
    transferToken(token: $token, from: $from, to: $to, value: $value) {
      to {
        id
        balance
      }
      from {
        id
        balance
      }
    }
  }
`

class TokenButton extends Component {
  state = {}
  render() {
    const { balance, accounts, current } = this.props
    return (
      <Mutation mutation={TransferToken}>
        {(transferToken, { loading }) => (
          <Popover
            lazy={true}
            autoFocus={false}
            content={
              <Menu style={{ minWidth: 100 }}>
                <Menu.Item text="Send 50 OGN" style={{ minWidth: 100 }}>
                  {accounts.map(
                    a =>
                      current && a.id !== current.id ? (
                        <Menu.Item
                          key={a.id}
                          text={a.name || `${a.id.substr(0, 8)}`}
                          onClick={() => {
                            transferToken({
                              variables: {
                                token: 'ogn',
                                from: current.id,
                                to: a.id,
                                value: '50'
                              }
                            })
                          }}
                        />
                      ) : null
                  )}
                </Menu.Item>
                <Menu.Item text="Approve 50 OGN" style={{ minWidth: 100 }}>
                  {accounts.map(
                    a =>
                      current && a.id !== current.id ? (
                        <Menu.Item
                          key={a.id}
                          text={a.name || `${a.id.substr(0, 8)}`}
                        />
                      ) : null
                  )}
                </Menu.Item>
              </Menu>
            }
            position={Position.BOTTOM}
          >
            <Button loading={loading}>{numberFormat(Number(balance))}</Button>
          </Popover>
        )}
      </Mutation>
    )
  }
}

const WalletAccounts = ({
  data: { accounts, nodeAccounts, defaultAccount = {} }
}) => {
  const rnd = Math.floor(Math.random() * nodeAccounts.length)
  const randomAccount = nodeAccounts[rnd].id
  return (
    <HTMLTable small={true} bordered={true} className="mt-3 mb-3">
      <thead>
        <tr>
          <th>Wallet</th>
          <th>Name</th>
          <th>Role</th>
          <th>Eth</th>
          <th>USD</th>
          <th>OGN</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {accounts.map(a => (
          <tr key={a.id}>
            <td>
              <AccountButton account={a} />
            </td>
            <td>{a.name}</td>
            <td>{a.role}</td>
            <td>{a.balance.eth}</td>
            <td>{a.balance.usd}</td>
            <td>
              {a.ogn ? (
                <TokenButton
                  current={a}
                  accounts={accounts}
                  balance={a.ogn.balance}
                />
              ) : (
                ''
              )}
            </td>
            <td>
              <SendFromNodeBtn from={randomAccount} to={a.id} value="0.5" />
              <RemoveWalletBtn address={a.id} />
              {defaultAccount.id === a.id ? (
                <Icon
                  icon="tick-circle"
                  intent="success"
                  style={{ marginLeft: 6, verticalAlign: -4 }}
                />
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  )
}

export default WalletAccounts
