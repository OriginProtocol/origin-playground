import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  deployMarketplaceContract,
  createListing,
  deployArbitratorContract
} from 'actions/Marketplace'
import { deployTokenContract, transferToken } from 'actions/Token'
import { addAccount, UNSAFE_saveWallet, selectAccount } from 'actions/Wallet'
import { sendFromNode } from 'actions/Network'
import { addParty } from 'actions/Parties'

class Row extends Component {
  constructor() {
    super()
    this.state = { checked: true }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.prerequisite === false &&
      this.props.prerequisite === true &&
      this.state.checked &&
      !this.props.isDone &&
      !this.state.doingAction
    ) {
      this.setState({ doingAction: true })
      this.props.onAction()
    }
  }

  render() {
    const { title, isDone, success, action, prerequisite } = this.props
    let icon
    if (this.state.doingAction && !this.props.isDone) {
      icon = <i className="fa fa-spinner fa-spin" />
    } else if (this.props.isDone) {
      icon = <i className="fa fa-check text-success" />
    } else {
      icon = (
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={e =>
            this.setState({ checked: e.currentTarget.checked })
          }
        />
      )
    }
    return (
      <tr>
        <td>{icon}</td>
        <td>{title}</td>
        <td>
          {isDone ? (
            <span className="text-success">{success || 'Deployed'}</span>
          ) : prerequisite === false ? (
            <span className="text-muted">{action || 'Deploy'}</span>
          ) : (
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                this.props.onAction()
              }}
            >
              {action || 'Deploy'}
            </a>
          )}
        </td>
      </tr>
    )
  }
}

class Home extends Component {
  render() {
    const hasWallets = this.props.wallet.accounts.length ? true : false
    const hasFunds = this.props.wallet.accounts.every(a => {
      var bal = this.props.wallet.balances[a]
      return bal && bal.eth && Number(bal.eth) >= 0.5
    })
    const sellerParty = this.props.parties.find(p => p.name === 'Seller')
    const buyerParty = this.props.parties.find(p => p.name === 'Buyer')
    const hasDAI = buyerParty && Number(buyerParty.DAI) >= 50 ? true : false
    const hasOGN = sellerParty && Number(sellerParty.OGN) >= 50 ? true : false

    const [
      Seller,
      Buyer,
      Affiliate,
      Arbitrator,
      Admin
    ] = this.props.wallet.accounts

    return (
      <div>
        <table className="table table-sm" style={{ width: 'auto' }}>
          <tbody>
            <Row
              title="Add Wallets"
              prerequisite={this.props.nodeAccounts ? true : false}
              isDone={this.props.wallet.accounts.length >= 5 ? true : false}
              action="Add"
              success="Added"
              onAction={() => {
                this.props.addAccount(5 - this.props.wallet.accounts.length)
              }}
            />
            <Row
              title="Add Ether"
              prerequisite={hasWallets}
              isDone={hasWallets && hasFunds}
              action="Add"
              success="Added"
              onAction={() => {
                this.props.wallet.accounts.forEach(a => {
                  var bal = this.props.wallet.balances[a]
                  if (bal && bal.eth && Number(bal.eth) < 0.5) {
                    this.props.sendFromNode(
                      this.props.nodeAccounts[0].hash,
                      a,
                      '1'
                    )
                  }
                })
              }}
            />
            <Row
              title="Origin Token"
              prerequisite={hasWallets && hasFunds}
              isDone={this.props.token ? true : false}
              onAction={() => {
                this.props.selectAccount(Admin)
                this.props.deployToken(['OriginToken', 'OGN', 2, 1000000])
              }}
            />
            <Row
              title="Stable coin"
              prerequisite={this.props.token ? true : false}
              isDone={this.props.stableCoin}
              onAction={() => {
                this.props.selectAccount(Admin)
                this.props.deployToken(['DAI', 'DAI', 2, 1000000])
              }}
            />
            <Row
              title="Arbitrator"
              prerequisite={this.props.stableCoin ? true : false}
              isDone={this.props.arbitrator}
              onAction={() => {
                this.props.selectAccount(Arbitrator)
                this.props.deployArbitrator('0')
              }}
            />
            <Row
              title="Marketplace"
              prerequisite={this.props.arbitrator ? true : false}
              isDone={this.props.marketplace}
              onAction={() => {
                this.props.selectAccount(Admin)
                this.props.deployMarketplace(
                  this.props.token,
                  this.props.arbitrator
                )
              }}
            />
            <Row
              title="Add Parties"
              prerequisite={this.props.marketplace ? true : false}
              isDone={this.props.marketplaceParty}
              action="Add"
              success="Added"
              onAction={() => {
                this.props.addParty({
                  name: 'Marketplace',
                  address: this.props.marketplace
                })
                this.props.addParty({ name: 'Seller', address: Seller })
                this.props.addParty({ name: 'Buyer', address: Buyer })
                this.props.addParty({ name: 'Affiliate', address: Affiliate })
                this.props.addParty({ name: 'Arbitrator', address: Arbitrator })
              }}
            />
            <Row
              title="Fund OGN"
              prerequisite={this.props.marketplaceParty ? true : false}
              isDone={hasOGN}
              onAction={() => {
                this.props.selectAccount(Admin)
                this.props.transferToken('OGN', Seller, 100)
              }}
              success="Funded"
              action="Fund OGN"
            />
            <Row
              title="Fund DAI"
              prerequisite={hasOGN}
              isDone={hasDAI}
              onAction={() => {
                this.props.selectAccount(Admin)
                this.props.transferToken('DAI', Buyer, 100)
              }}
              success="Funded"
              action="Fund DAI"
            />
            <Row
              title="Listing"
              isDone={this.props.hasListing}
              success="Added"
              prerequisite={hasDAI}
              onAction={() => {
                this.props.selectAccount(Seller)
                this.props.createListing({
                  title: 'Bike',
                  listingType: 'For Sale',
                  deposit: '10',
                  price: '100',
                  currencyId: 'DAI'
                })
              }}
              action="Add"
            />
          </tbody>
        </table>
        <hr />
        <a
          href="#"
          className="btn btn-sm btn-outline-danger"
          onClick={e => {
            e.preventDefault()
            window.localStorage.clear()
            window.sessionStorage.clear()
            window.location.reload()
          }}
        >
          Reset
        </a>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet,
  accounts: state.wallet.accounts,
  parties: state.parties.parties,
  nodeAccounts: state.network.accounts,
  marketplace: state.marketplace.contractAddress,
  arbitrator: state.marketplace.arbitratorAddress,
  marketplaceParty: state.parties.parties.find(
    p => p.address === state.marketplace.contractAddress
  ),
  sellerWallet: state.wallet.accounts[0],
  seller: state.parties.parties.find(
    p => p.address === state.wallet.accounts[0]
  ),
  buyerWallet: state.wallet.accounts[1],
  buyer: state.parties.parties.find(
    p => p.address === state.wallet.accounts[1]
  ),
  affiliateWallet: state.wallet.accounts[2],
  affiliate: state.parties.parties.find(
    p => p.address === state.wallet.accounts[2] && p.name === 'Affiliate'
  ),
  hasListing: state.marketplace.listings.length > 0,
  token: state.token.contractAddresses.OGN,
  stableCoin: state.token.contractAddresses.DAI
})

const mapDispatchToProps = dispatch => ({
  deployMarketplace: (...args) => dispatch(deployMarketplaceContract(...args)),
  deployArbitrator: (...args) => dispatch(deployArbitratorContract(...args)),
  deployToken: args => dispatch(deployTokenContract(args)),
  addParty: obj => dispatch(addParty(obj)),
  createListing: obj => dispatch(createListing(obj)),
  transferToken: (...args) => dispatch(transferToken(...args)),
  addAccount: (...args) => dispatch(addAccount(...args)),
  saveWallet: (...args) => dispatch(UNSAFE_saveWallet(...args)),
  sendFromNode: (...args) => dispatch(sendFromNode(...args)),
  selectAccount: (...args) => dispatch(selectAccount(...args))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
