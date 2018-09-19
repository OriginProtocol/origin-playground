import React, { Component } from 'react'
import { getIpfsHashFromBytes32 } from 'utils/ipfsHash'

import AccountButton from '../accounts/AccountButton'

function ipfs(rawHash) {
  var hash = getIpfsHashFromBytes32(rawHash)
  return (
    <a
      href={`http://localhost:9090/ipfs/${hash}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {hash.substr(0, 6)}
    </a>
  )
}

class EventsTable extends Component {
  render() {
    return (
      <table className="bp3-html-table bp3-small">
        <thead>
          <tr>
            <th>Block</th>
            <th>Event</th>
            <th>Sender</th>
            <th>Listing</th>
            <th>Offer</th>
            <th>IPFS Hash</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {this.props.events.map(e => (
            <tr key={e.id}>
              <td>{e.blockNumber}</td>
              <td>{e.event}</td>
              <td>
                <AccountButton account={e.returnValues.party} />
              </td>
              <td>{e.returnValues.listingID}</td>
              <td>{e.returnValues.offerID}</td>
              <td>{ipfs(e.returnValues.ipfsHash)}</td>
              <td>{e.block.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default EventsTable
