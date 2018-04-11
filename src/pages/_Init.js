import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from 'components/Modal'

import { sendFromNode } from 'actions/Network'
import { reset, deployIdentityContract, addKey } from 'actions/Identity'
import { selectAccount } from 'actions/Wallet'

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
      this.next('Add some balance to account 1...')
      setTimeout(() => {
        this.props.sendFromNode(nodeAccounts[0].hash, walletAccounts[0], '2')
      }, 500)
    } else if (this.stage === 1 && balances[walletAccounts[1]].eth === '0') {
      this.next('Add some balance to account 2...')
      setTimeout(() => {
        this.props.sendFromNode(nodeAccounts[0].hash, walletAccounts[1], '2')
      }, 500)
    } else if (this.stage === 2 && balances[walletAccounts[2]].eth === '0') {
      this.next('Add some balance to account 3...')
      setTimeout(() => {
        this.props.sendFromNode(nodeAccounts[0].hash, walletAccounts[2], '2')
      }, 500)
    } else if (this.stage === 3 && balances[walletAccounts[2]].eth === '0') {
      this.next('Add Facebook certifier...')
      setTimeout(() => {
        this.props.selectAccount(walletAccounts[1])
        this.props.deployIdentityContract(
          'Facebook',
          'certifier',
          'https://erc725.originprotocol.com/fb-auth',
          false,
          'facebook'
        )
      }, 500)
    } else if (
      this.stage === 4 &&
      this.props.createIdentityResponse !== 'success' &&
      nextProps.createIdentityResponse === 'success'
    ) {
      this.next('Add Google certifier...')
      setTimeout(() => {
        this.props.deployIdentityContract(
          'Google',
          'certifier',
          'https://erc725.originprotocol.com/google-auth',
          false,
          'google'
        )
      }, 500)
    } else if (
      this.stage === 5 &&
      this.props.createIdentityResponse !== 'success' &&
      nextProps.createIdentityResponse === 'success'
    ) {
      this.next('Add Twitter certifier...')
      setTimeout(() => {
        this.props.deployIdentityContract(
          'Twitter',
          'certifier',
          'https://erc725.originprotocol.com/twitter-auth',
          false,
          'twitter'
        )
      }, 500)
    } else if (
      this.stage === 6 &&
      this.props.createIdentityResponse !== 'success' &&
      nextProps.createIdentityResponse === 'success'
    ) {
      this.next('Add GitHub certifier...')
      setTimeout(() => {
        this.props.deployIdentityContract(
          'GitHub',
          'certifier',
          'https://erc725.originprotocol.com/github-auth',
          false,
          'github'
        )
      }, 500)
    } else if (
      this.stage === 7 &&
      this.props.createIdentityResponse !== 'success' &&
      nextProps.createIdentityResponse === 'success'
    ) {
      this.next('Add Facebook key...')
      setTimeout(() => {
        var fb = this.props.identity.identities.find(i => i.name === 'Facebook')
        this.props.addKey({
          purpose: '3',
          keyType: '1',
          key:
            '0xc8d7a2a9478bcb765761e3a42304686d092e0a1a64e80489910bd4bc946ed7d1',
          identity: fb.address
        })
      }, 500)
    } else if (
      this.stage === 8 &&
      this.props.addKeyResponse !== 'success' &&
      nextProps.addKeyResponse === 'success'
    ) {
      this.next('Add Google key...')
      setTimeout(() => {
        var fb = this.props.identity.identities.find(i => i.name === 'Google')
        this.props.addKey({
          purpose: '3',
          keyType: '1',
          key:
            '0xbd3f1e807a497a8064af41cb716433b5da63a9d13830e7bd2ed442bbf686540b',
          identity: fb.address
        })
      }, 500)
    } else if (
      this.stage === 9 &&
      this.props.addKeyResponse !== 'success' &&
      nextProps.addKeyResponse === 'success'
    ) {
      this.next('Add Twitter key...')
      setTimeout(() => {
        var fb = this.props.identity.identities.find(i => i.name === 'Twitter')
        this.props.addKey({
          purpose: '3',
          keyType: '1',
          key:
            '0x17c0aaec6eb7b9964a2bd253a15bf395fe24db56ec03dea486680564f5c5033c',
          identity: fb.address
        })
      }, 500)
    } else if (
      this.stage === 10 &&
      this.props.addKeyResponse !== 'success' &&
      nextProps.addKeyResponse === 'success'
    ) {
      this.next('Add GitHub key...')
      setTimeout(() => {
        var fb = this.props.identity.identities.find(i => i.name === 'GitHub')
        this.props.addKey({
          purpose: '3',
          keyType: '1',
          key:
            '0x586bbc218986f20ddd4fb1b23a51897536c1ae0a380ff106151741a01a8d15ff',
          identity: fb.address
        })
      }, 500)
    } else if (
      this.stage === 11 &&
      this.props.addKeyResponse !== 'success' &&
      nextProps.addKeyResponse === 'success'
    ) {
      this.next('Done!')
      setTimeout(() => {
        this.props.selectAccount(walletAccounts[0])
        this.setState({ shouldClose: true })
      }, 1500)
    }
  }

  next(msg) {
    this.stage += 1
    this.setState({ modal: true, logs: [...this.state.logs, msg] })
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
  network: state.network,
  identity: state.identity,
  createIdentityResponse: state.identity.createIdentityResponse,
  addKeyResponse: state.identity.addKeyResponse
})

const mapDispatchToProps = dispatch => ({
  sendFromNode: (...args) => dispatch(sendFromNode(...args)),
  deployIdentityContract: (...args) =>
    dispatch(deployIdentityContract(...args)),
  addKey: (...args) => dispatch(addKey(...args)),
  selectAccount: (...args) => dispatch(selectAccount(...args)),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Event)
