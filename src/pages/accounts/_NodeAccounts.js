import React from 'react'

const NodeAccounts = ({ data }) =>
  <table className="bp3-html-table bp3-small bp3-html-table-bordered">
    <thead>
      <tr>
        <th>Node Account</th>
        <th>Eth</th>
        <th>USD</th>
      </tr>
    </thead>
    <tbody>
      {data.map(a => (
        <tr key={a.id}>
          <td>{a.id}</td>
          <td>{a.balance.eth}</td>
          <td>{a.balance.usd}</td>
        </tr>
      ))}
    </tbody>
  </table>

export default NodeAccounts
