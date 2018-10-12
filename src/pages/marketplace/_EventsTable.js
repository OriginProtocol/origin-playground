import React, { Component } from 'react'
import { getIpfsHashFromBytes32 } from 'utils/ipfsHash'
import formatDate from 'utils/formatDate'

import Identity from 'components/Identity'
import { ipfsGateway } from 'utils/config'

function ipfs(rawHash) {
  var hash = getIpfsHashFromBytes32(rawHash)
  return (
    <a
      href={`${ipfsGateway}/ipfs/${hash}`}
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
      <table className="bp3-html-table bp3-small bp3-html-table-bordered">
        <thead>
          <tr>
            <th>Time</th>
            <th>Event</th>
            <th>Sender</th>
            <th>Listing</th>
            <th>Offer</th>
            <th>IPFS Hash</th>
          </tr>
        </thead>
        <tbody>
          {this.props.events.map(e => (
            <tr key={e.id}>
              <td>{formatDate(e.block.timestamp)}</td>
              <td>{e.event}</td>
              <td><Identity account={e.returnValues.party} />
              </td>
              <td>{e.returnValues.listingID}</td>
              <td>{e.returnValues.offerID}</td>
              <td>{ipfs(e.returnValues.ipfsHash)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default EventsTable
