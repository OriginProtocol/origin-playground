import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEvents } from 'actions/Marketplace'
import { getIpfsHashFromBytes32 } from 'utils/ipfsHash'

class Events extends Component {
  componentDidMount() {
    this.props.getEvents(this.props.listing)
  }
  render() {
    if (this.props.eventsResponse === null) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {this.props.events.length ? null : <div>No Events</div>}
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
                View in IPFS
              </a>
            )
          }

          return (
            <div key={idx} className="mb-3">
              <div>
                <b>{event.event}</b>
                <small className="muted ml-3">Block {event.blockNumber}</small>
              </div>
              <pre className="m-0">{displayEvent(event.returnValues)}</pre>
              {data}
            </div>
          )
        })}
      </div>
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
