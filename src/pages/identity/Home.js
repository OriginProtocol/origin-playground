import React, { Component } from 'react'
import { connect } from 'react-redux'

import { sendFromNode } from 'actions/Network'
import { reset, deployIdentityContract, addKey } from 'actions/Identity'
import { selectAccount } from 'actions/Wallet'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="mb-3">
          <i className="fa fa-arrow-left mr-2" />Select a contract for more
          information
        </div>
        <hr />
        <a href="#" onClick={(e) => {
          e.preventDefault()
          this.props.selectAccount(this.props.wallet.accounts[1])
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
        }}>
          Add Certifier
        </a><br/>
        <a href="#" onClick={(e) => {
          e.preventDefault()
          this.props.selectAccount(this.props.wallet.accounts[1])
          var fb = this.props.identity.identities.find(i => i.name === 'Origin')
          this.props.addKey({
            purpose: '3',
            keyType: '1',
            key:
              '0xc8d7a2a9478bcb765761e3a42304686d092e0a1a64e80489910bd4bc946ed7d1',
            identity: fb.address
          })
        }}>
          Add Signer Key
        </a>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
