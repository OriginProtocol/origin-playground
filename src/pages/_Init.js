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
      this.next('Add Origin certifier...')
      setTimeout(() => {
        this.props.selectAccount(walletAccounts[1])
        this.props.deployIdentityContract(
          'Origin',
          'certifier',
          'https://erc725.originprotocol.com/fb-auth',
          false,
          'facebook',
          [
            {
              uri: 'https://erc725.originprotocol.com/fb-auth',
              icon: 'facebook',
              claimType: '3'
            },
            {
              uri: 'https://erc725.originprotocol.com/twitter-auth',
              icon: 'twitter',
              claimType: '4'
            },
            {
              uri: 'https://erc725.originprotocol.com/github-auth',
              icon: 'github',
              claimType: '5'
            },
            {
              uri: 'https://erc725.originprotocol.com/google-auth',
              icon: 'google',
              claimType: '6'
            },
            {
              uri: 'https://erc725.originprotocol.com/linkedin-auth',
              icon: 'linkedin',
              claimType: '9'
            }
          ]
        )
      }, 500)
    } else if (
      this.stage === 4 &&
      this.props.createIdentityResponse !== 'success' &&
      nextProps.createIdentityResponse === 'success'
    ) {
      this.next('Add Claim Signer key...')
      setTimeout(() => {
        var fb = this.props.identity.identities.find(i => i.name === 'Origin')
        this.props.addKey({
          purpose: '3',
          keyType: '1',
          key:
            '0xc8d7a2a9478bcb765761e3a42304686d092e0a1a64e80489910bd4bc946ed7d1',
          identity: fb.address
        })
      }, 500)
    } else if (
      this.stage === 5 &&
      this.props.addKeyResponse !== 'success' &&
      nextProps.addKeyResponse === 'success'
    ) {
      this.next('Done!')
      this.props.selectAccount(walletAccounts[0])
      setTimeout(() => {
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
        onClose={() => {
          this.setState({ modal: false })
          if (this.props.onClose) {
            this.props.onClose()
          }
        }}
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
