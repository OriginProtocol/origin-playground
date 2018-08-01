import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEvents } from 'actions/Marketplace'
import { decode, getText, getIpfsHashFromBytes32 } from 'utils/ipfsHash'

import BtnGroup from 'components/BtnGroup'

class Events extends Component {
  componentDidMount() {
    this.props.getEvents(this.props.listing)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.listing !== this.props.listing ||
      prevProps.network.block.number !== this.props.network.block.number
    ) {
      this.props.getEvents(this.props.listing)
    }
  }

  render() {
    if (this.props.eventsResponse === null && !this.props.events.length) {
      return <div>Loading...</div>
    }
    let events = this.props.events
    const offerID =
      this.props.offer === undefined ? null : String(this.props.offer)
    if (offerID) {
      events = events.filter(e => e.returnValues.offerID === offerID)
    }

    return (
      <table className="table table-sm mb-0">
        <thead>
          <tr>
            <th>Event</th>
            {offerID ? null : <th className="text-center">Offer</th>}
            <th className="text-center">Sender</th>
            <th className="text-center">Block</th>
            <th className="text-center">IPFS</th>
          </tr>
        </thead>
        <tbody>
          {this.props.events.length ? null : (
            <tr>
              <td colSpan={5}>No Events</td>
            </tr>
          )}
          {events.map((event, idx) => (
            <EventRow
              offerID={offerID}
              event={event}
              key={idx}
              ipfs={this.props.ipfs}
              party={this.props.party}
              block={this.props.network.block.number}
            />
          ))}
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
      if (typeof obj[key] === 'string') {
        var val = String(obj[key])
        val = val.length > 32 ? `${val.substr(0, 32)}...` : val
        ret.push(`${key}: ${val}`)
      } else {
        ret.push(`${key}: ${JSON.stringify(obj[key], null, 4)}`)
      }
    }
  })
  return ret.join('\n')
}


class EventRow extends Component {
  constructor() {
    super()
    this.state = { showDecrypted: true }
  }

  render() {
    var data = null
    const { event, offerID, party } = this.props

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
    let partyAddr = json.party || ''

    return (
      <>
        <tr
          style={{ cursor: 'pointer' }}
          onClick={async () => {
            this.setState({ open: this.state.open ? false : true })
            var ipfsContent = await getText(
              this.props.ipfs,
              event.returnValues.ipfsHash
            )
            var decrypted = null
            try {
              if (
                ipfsContent.indexOf('-----BEGIN PGP MESSAGE-----') === 0 &&
                party
              ) {
                decrypted = await decode(
                  ipfsContent,
                  party.privateKey,
                  party.pgpPass
                )
                decrypted = JSON.stringify(JSON.parse(decrypted), null, 4)
              } else {
                ipfsContent = JSON.stringify(JSON.parse(ipfsContent), null, 4)
              }
            } catch (e) {
              /* Ignore */
            }

            this.setState({ ipfsContent, decrypted })
          }}
        >
          <td
            className="no-wrap"
            style={{
              borderLeft: `1px solid ${this.state.open ? '#dee2e6' : '#fff'}`
            }}
          >
            <i
              className={`ml-0 mr-1 px-0 fa fa-fw fa-${
                this.state.open ? 'caret-down' : 'caret-right'
              }`}
            />
            {event.event}
          </td>
          {offerID ? null : <td className="text-center">{json.offerID}</td>}
          <td className="text-center mono">{partyAddr.substr(2, 4)}</td>
          <td className="text-center">{event.blockNumber}</td>
          <td className="text-center">{data}</td>
        </tr>
        {this.renderDetail()}
      </>
    )
  }

  renderDetail() {
    if (!this.state.open) {
      return null
    }
    let content = this.state.ipfsContent
    const decrypted = (
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {this.state.decrypted}
      </pre>
    )
    const contentPre = (
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {content || 'Loading...'}
      </pre>
    )

    return (
      <tr>
        <td
          className="border-top-0 pl-3 pt-2"
          style={{ borderLeft: '1px solid #dee2e6' }}
          colSpan={5}
        >
          {this.state.decrypted ? (
            <div style={{ position: 'relative' }}>
              <BtnGroup
                style={{ position: 'absolute', right: 0 }}
                className="btn-group-sm"
                buttons={['Encrypted', 'Decrypted']}
                active={this.state.showDecrypted ? 'Decrypted' : 'Encrypted'}
                onClick={val =>
                  this.setState({
                    showDecrypted: val === 'Decrypted' ? true : false
                  })
                }
              />

              {this.state.showDecrypted ? decrypted : contentPre}
            </div>
          ) : (
            contentPre
          )}
        </td>
      </tr>
    )
  }
}

const mapStateToProps = state => ({
  network: state.network,
  events: state.marketplace.events,
  eventsResponse: state.marketplace.eventsResponse,
  ipfs: state.network.ipfsGateway,
  party: state.parties.active
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvents: () => dispatch(getEvents(ownProps.listing))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)
