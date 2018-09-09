import React from 'react'
import { HTMLTable, Icon } from '@blueprintjs/core'

import SendFromNodeBtn from './_SendFromNodeBtn'
import RemoveWalletBtn from './_RemoveWalletBtn'

import SetWalletMutation from './_SetWalletMutation'

const WalletAccounts = ({
  data: { accounts, nodeAccounts, defaultAccount = {} }
}) => {
  const rnd = Math.floor(Math.random() * nodeAccounts.length)
  const randomAccount = nodeAccounts[rnd].id
  return (
    <SetWalletMutation>
      {setActiveWallet => (
        <HTMLTable
          small={true}
          bordered={true}
          interactive={true}
          className="mt-3 mb-3"
        >
          <thead>
            <tr>
              <th>Wallet</th>
              <th>Role</th>
              <th>Eth</th>
              <th>USD</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {accounts.map(a => (
              <tr
                key={a.id}
                onClick={() =>
                  setActiveWallet({ variables: { address: a.id } })
                }
              >
                <td>{a.id.substr(0, 6)}</td>
                <td>{a.role}</td>
                <td>{a.balance.eth}</td>
                <td>{a.balance.usd}</td>
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
      )}
    </SetWalletMutation>
  )
}

export default WalletAccounts
