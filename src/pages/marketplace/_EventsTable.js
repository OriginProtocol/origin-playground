import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEvents } from 'actions/Marketplace'
import { getIpfsHashFromBytes32 } from 'utils/ipfsHash'

class Events extends Component {
  componentDidMount() {
    this.props.getEvents(this.props.listing)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listing !== this.props.listing) {
      this.props.getEvents(this.props.listing)
    }
  }

  render() {
    if (this.props.eventsResponse === null) {
      return <div>Loading...</div>
    }
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th className="text-center">Block</th>
            <th>Event</th>
            <th className="text-center">Offer</th>
            <th className="text-center">Party</th>
            <th className="text-center">IPFS</th>
          </tr>
        </thead>
        <tbody>
          {this.props.events.length ? null : (
            <tr>
              <td colSpan={5}>No Events</td>
            </tr>
          )}
          {this.props.events.map((event, idx) => {
            var data = null

            if (event.returnValues.ipfsHash) {
              var hash = getIpfsHashFromBytes32(event.returnValues.ipfsHash)
              data = (
                <a
                  href={`${this.props.ipfs}/ipfs/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hash.substr(0, 6)}
                </a>
              )
            }

            const json = event.returnValues || {}
            let party = json.seller || json.buyer || json.party || ''

            return (
              <tr key={idx}>
                <td className="text-center">{event.blockNumber}</td>
                <td>{event.event}</td>
                <td className="text-center">{json.offerID}</td>
                <td className="text-center">{party.substr(0, 6)}</td>
                <td className="text-center">{data}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export function displayEvent(obj) {
  if (typeof obj !== 'object') {
    return ''
  }
  var ret = []
  Object.keys(obj).forEach(key => {
    if (!key.match(/^([0-9]+|__.*)$/)) {
      var val = String(obj[key])
      val = val.length > 32 ? `${val.substr(0, 32)}...` : val
      ret.push(`${key}: ${val}`)
    }
  })
  return ret.join('\n')
}

const mapStateToProps = state => ({
  events: state.marketplace.events,
  eventsResponse: state.marketplace.eventsResponse,
  ipfs: state.network.ipfsGateway
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvents: () => dispatch(getEvents(ownProps.listing))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)
