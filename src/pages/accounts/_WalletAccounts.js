import React from 'react'
import SendFromNodeBtn from './_SendFromNodeBtn'
import RemoveWalletBtn from './_RemoveWalletBtn'

const WalletAccounts = ({ data: { accounts, nodeAccounts } }) => (
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
        <tr key={a.id}>
          <td>{a.id}</td>
          <td>{a.balance.eth}</td>
          <td>{a.balance.usd}</td>
          <td>
            <SendFromNodeBtn from={nodeAccounts[0].id} to={a.id} value="0.5" />
            <RemoveWalletBtn address={a.id} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default WalletAccounts
