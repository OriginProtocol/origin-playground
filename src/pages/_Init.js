import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from 'components/Modal'

import { sendFromNode } from 'actions/Network'
import { reset } from 'actions/Identity'

class Event extends Component {
  constructor(props) {
    super(props)
    this.state = { modal: false, logs: [] }
    this.stage = 0
  }

  componentWillReceiveProps(nextProps) {
    var nodeAccounts = nextProps.network.accounts,
      walletAccounts = nextProps.wallet.accounts,
      balances = nextProps.wallet.balances

    if (
      this.stage === 0 &&
      nextProps.network.status === 'connected' &&
      nodeAccounts.length > 2 &&
      walletAccounts.length > 2 &&
      balances[walletAccounts[0]] &&
      balances[walletAccounts[0]].eth === '0'
    ) {
      window.localStorage.clear()
      this.props.reset()
      this.setState({
        modal: true,
        logs: [...this.state.logs, 'Add some balance to account 1...']
      })
      this.stage = 1
      this.props.sendFromNode(nodeAccounts[0].hash, walletAccounts[0], '2')
    } else if (this.stage === 1 && balances[walletAccounts[1]].eth === '0') {
      this.stage = 2
      this.setState({
        logs: [...this.state.logs, `Add some balance to account 2...`]
      })
      this.props.sendFromNode(nodeAccounts[0].hash, walletAccounts[1], '2')
    } else if (this.stage === 2 && balances[walletAccounts[2]].eth === '0') {
      this.stage = 3
      this.setState({
        logs: [...this.state.logs, `Add some balance to account 3...`]
      })
      this.props.sendFromNode(nodeAccounts[0].hash, walletAccounts[2], '2')
    } else if (this.stage === 3 && balances[walletAccounts[2]].eth !== '0') {
      this.stage = 4
      this.setState({ logs: [...this.state.logs, 'Done!'] })
      setTimeout(() => this.setState({ shouldClose: true }), 1500)
    }
  }

  render() {
    if (!this.state.modal) {
      return null
    }
    return (
      <Modal
        onClose={() => this.setState({ modal: false })}
        shouldClose={this.state.shouldClose}
        style={{ maxWidth: 375 }}
      >
        <div className="p-3">
          <h4>Initialize</h4>
          {this.state.logs.map((log, idx) => <div key={idx}>{log}</div>)}
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet,
  event: state.event,
  network: state.network
})

const mapDispatchToProps = dispatch => ({
  sendFromNode: (...args) => dispatch(sendFromNode(...args)),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Event)
