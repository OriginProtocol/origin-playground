import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  fetchAccounts,
  init,
  setProvider,
  sendFromNode
} from 'actions/Network'

class Console extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    var activeProvider =
      this.props.providers.find(
        p => (p.endpoints || []).indexOf(this.props.provider) >= 0
      ) || this.props.providers[this.props.providers.length - 1]

    return (
      <div className="mb-3">
        <div>
          <div className="btn-group btn-group-sm mb-2 mr-3">
            {this.props.providers.map((p, idx) => (
              <button
                key={p.name}
                className={`btn btn-outline-secondary${
                  p === activeProvider ? ' active' : ''
                }`}
                onClick={() => this.setProvider(idx)}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="btn-group btn-group-sm mb-2">
            {(activeProvider.endpoints || []).map(e => (
              <button
                key={e}
                className={`btn btn-outline-secondary${
                  e === this.props.provider ? ' active' : ''
                }`}
                onClick={() => this.props.setProvider(e)}
              >
                {e.split(':')[0].toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="d-flex align-items-center">
          {this.renderStatus()}
          {`to ${this.props.provider}`}
        </div>

        {/* <div className="d-flex mt-2">
          <div>Net ID: {this.props.netId}</div>
        </div>
        {this.props.accounts.length > 0 &&
          <div className="mt-1 mb-3">
            <div>{`~989 ETH in ${
              this.props.accounts.length
            } node managed accounts`}</div>
            <div className="mt-2">
              <b>Transfer</b><br/>
              {'From: '}
              <select ref={ref => this.from = ref}>
                {this.props.accounts.map(a =>
                  <option key={a.hash} value={a.hash}>
                    {`${a.hash.substr(0, 8)} - ${a.balance.eth} ETH`}
                  </option>
                )}
              </select>
              <br/>
              <span className="mr-2">To:</span>
              <select ref={ref => this.to = ref}>
                {this.props.wallet.accounts.map((a, idx) =>
                  <option key={idx} value={a}>
                    {`${a.substr(0, 8)} - ${this.props.wallet.balances[a].eth} ETH`}
                  </option>
                )}
              </select>
              <br/>
              <span className="mr-2">Amount:</span>
              <input ref={ref => this.amount = ref} type="text" defaultValue="5" />
              <br/>
              <button onClick={() => {
                this.props.sendFromNode(this.from.value, this.to.value, this.amount.value)
              }}>Go</button>
            </div>
          </div>
        } */}
      </div>
    )
  }

  setProvider(idx) {
    var endpoints = this.props.providers[idx].endpoints || []
    var endpoint =
      endpoints.find(
        e => e.split(':')[0] === this.props.provider.split(':')[0]
      ) || endpoints[0]

    if (endpoint) {
      this.setState({ customEndpoint: false })
      this.props.setProvider(endpoint)
    } else {
      this.setState({ customEndpoint: true })
    }
  }

  renderStatus() {
    var color = 'green',
      text = 'Connected'
    if (this.props.status === 'disconnected') {
      text = 'Disconnected'
      color = 'red'
    } else if (this.props.status === 'connecting') {
      text = 'Connecting'
      color = 'orange'
    } else if (this.props.status === 'error') {
      text = 'Error'
      color = 'red'
    }
    return (
      <span className="mr-2" style={{ color, fontWeight: 'bold' }}>
        {text}
      </span>
    )
  }
}

const mapStateToProps = state => ({
  accounts: state.network.accounts,
  account: state.network.account,
  providers: state.network.providers,
  provider: state.network.provider,
  netId: state.network.id,
  status: state.network.status,
  wallet: state.wallet
})

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(init()),
  fetchAccounts: () => dispatch(fetchAccounts()),
  setProvider: provider => dispatch(setProvider(provider)),
  sendFromNode: (from, to, value) => dispatch(sendFromNode(from, to, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Console)
