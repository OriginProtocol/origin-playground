import React, { Component } from 'react'
import { connect } from 'react-redux'
import numberFormat from 'utils/numberFormat'

// Create Listing -> Update listing
// Create Listing -> Withdraw listing
// Create Listing -> Make offer -> Accept offer -> Finalize Offer
// Create Listing -> Make offer -> Accept offer -> Update offer
// Create Listing -> Make offer -> Accept offer -> Withdraw listing -> Withdraw offer
// Create Listing -> Make offer -> Withdraw offer
// Create Listing -> Make offer -> Accept offer -> Dispute offer -> Buyer wins
// Create Listing -> Make offer -> Accept offer -> Dispute offer -> Seller wins
// Create Listing -> Make offer -> Accept offer -> Pass finalization window -> Finalize offer

import {
  deployMarketplaceContract,
  createListing,
  makeOffer,
  deployArbitratorContract,
  deployOriginArbitratorContract,
  getOffers,
  acceptOffer,
  finalizeOffer
} from 'actions/Marketplace'
import { deployTokenContract, transferToken, approveToken } from 'actions/Token'
import { addAccount, UNSAFE_saveWallet, selectAccount } from 'actions/Wallet'
import { sendFromNode } from 'actions/Network'
import { addParty } from 'actions/Parties'
import { ExampleListings } from './_NewListing'
import GasPrice from 'utils/gasPriceInDollars'
const price = GasPrice({})

async function genKey(name, passphrase) {
  var key = await openpgp.generateKey({
    userIds: [{ name, email: `${name.toLowerCase()}@example.com` }],
    curve: 'ed25519',
    passphrase
  })
  return {
    privateKey: key.privateKeyArmored,
    publicKey: key.publicKeyArmored,
    pgpPass: passphrase
  }
}

class Row extends Component {
  constructor(props) {
    super(props)
    this.state = { checked: props.checked === undefined ? true : props.checked }
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
    if (this.props.open === false) return null
    const { title, isDone, success, action, prerequisite, gas } = this.props
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
          onChange={e => this.setState({ checked: e.currentTarget.checked })}
        />
      )
    }
    return (
      <tr>
        <td />
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
        <td>{gas ? numberFormat(gas) : ''}</td>
        <td>{price(gas)}</td>
      </tr>
    )
  }
}

class Home extends Component {
  constructor() {
    super()
    this.state = { setup: true, basicListingOffer: true }
  }
  componentDidMount() {
    this.props.getOffers(0)
  }
  render() {
    const hasNodeAccounts = this.props.nodeAccounts.length ? true : false
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
            {this.renderSection({
              name: 'Setup',
              id: 'setup'
            })}
            <Row
              open={this.state.setup ? true : false}
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
              open={this.state.setup ? true : false}
              title="Add Ether"
              prerequisite={hasWallets && hasNodeAccounts}
              isDone={hasWallets && hasFunds}
              action="Add"
              success="Added"
              onAction={() => {
                this.props.wallet.accounts.forEach(a => {
                  var bal = this.props.wallet.balances[a],
                    nodeAccounts = this.props.nodeAccounts,
                    rnd = Math.floor(Math.random() * nodeAccounts.length)
                  if (bal && bal.eth && Number(bal.eth) < 0.5) {
                    this.props.sendFromNode(nodeAccounts[rnd].hash, a, '1')
                  }
                })
              }}
            />
            <Row
              open={this.state.setup ? true : false}
              title="Origin Token"
              prerequisite={hasWallets && hasFunds}
              isDone={this.props.token ? true : false}
              onAction={() => {
                this.props.selectAccount(Admin)
                this.props.deployToken(['OriginToken', 'OGN', 2, 1000000])
              }}
            />
            <Row
              open={this.state.setup ? true : false}
              title="Stable coin"
              prerequisite={this.props.token ? true : false}
              isDone={this.props.stableCoin}
              onAction={() => {
                this.props.selectAccount(Admin)
                this.props.deployToken(['DAI', 'DAI', 2, 1000000])
              }}
            />
            <Row
              open={this.state.setup ? true : false}
              title="Arbitrator"
              prerequisite={this.props.stableCoin ? true : false}
              isDone={this.props.arbitrator}
              gas={this.props.marketplaceRaw.deployArbitratorGas}
              onAction={() => {
                this.props.selectAccount(Arbitrator)
                this.props.deployArbitrator('0')
              }}
            />
            <Row
              open={this.state.setup ? true : false}
              title="Origin Arbitrator"
              prerequisite={this.props.arbitrator ? true : false}
              isDone={this.props.originArbitrator}
              gas={this.props.marketplaceRaw.deployOriginArbitratorGas}
              onAction={() => {
                this.props.selectAccount(Arbitrator)
                this.props.deployOriginArbitrator(this.props.arbitrator)
              }}
            />
            <Row
              open={this.state.setup ? true : false}
              title="Marketplace"
              prerequisite={this.props.originArbitrator ? true : false}
              isDone={this.props.marketplace}
              gas={this.props.marketplaceRaw.deployMarketplaceGas}
              onAction={() => {
                this.props.selectAccount(Admin)
                this.props.deployMarketplace(this.props.token)
              }}
            />
            <Row
              open={this.state.setup ? true : false}
              title="Add Parties"
              prerequisite={this.props.marketplace ? true : false}
              isDone={this.props.marketplaceParty}
              action="Add"
              success="Added"
              onAction={async () => {
                var buyerKey = await genKey('Buyer', 'buyer123')
                var sellerKey = await genKey('Seller', 'seller123')

                this.props.addParty({
                  name: 'Marketplace',
                  address: this.props.marketplace
                })
                this.props.addParty({
                  name: 'Seller',
                  address: Seller,
                  pgpPass: 'seller123',
                  ...sellerKey
                })
                this.props.addParty({
                  name: 'Buyer',
                  address: Buyer,
                  ...buyerKey
                })
                this.props.addParty({ name: 'Affiliate', address: Affiliate })
                this.props.addParty({ name: 'Arbitrator', address: Arbitrator })
                this.props.addParty({
                  name: 'OriginArbitrator',
                  address: this.props.originArbitrator
                })
              }}
            />
            <Row
              open={this.state.setup ? true : false}
              title="Fund OGN"
              prerequisite={this.props.marketplaceParty ? true : false}
              isDone={hasOGN}
              onAction={() => {
                this.props.selectAccount(Admin)
                this.props.transferToken('OGN', Seller, 100)
                this.props.selectAccount(Seller)
                this.props.approveToken('OGN', this.props.marketplace, 5000)
              }}
              success="Funded"
              action="Fund OGN"
            />
            <Row
              open={this.state.setup ? true : false}
              title="Fund DAI"
              prerequisite={hasOGN}
              isDone={hasDAI}
              onAction={() => {
                this.props.selectAccount(Admin)
                this.props.transferToken('DAI', Buyer, 500)
                this.props.selectAccount(Buyer)
                this.props.approveToken('DAI', this.props.marketplace, 5000)
              }}
              success="Funded"
              action="Fund DAI"
            />
            {this.renderSection({
              name: 'Basic Listing & Offer',
              id: 'basicListingOffer'
            })}
            <Row
              open={this.state.basicListingOffer ? true : false}
              title="Create Listing"
              isDone={this.props.hasListing}
              success="Added"
              prerequisite={hasDAI}
              gas={this.props.marketplaceRaw.createListingGas}
              onAction={() => {
                const rnd = Math.floor(Math.random() * ExampleListings.length)
                this.props.selectAccount(Seller)
                this.props.createListing({
                  deposit: '10',
                  arbitrator: Seller,
                  ipfs: {
                    ...ExampleListings[rnd],
                    currencyId: 'DAI'
                  }
                })
              }}
              action="Add"
            />
            <Row
              open={this.state.basicListingOffer ? true : false}
              title="Make Offer"
              isDone={this.props.hasOffer}
              checked={false}
              success="Added"
              prerequisite={this.props.hasListing}
              gas={this.props.marketplaceRaw.makeOfferGas}
              onAction={() => {
                this.props.selectAccount(Buyer)
                this.props.makeOffer(0, {
                  amount: '10',
                  expires: +new Date() / 1000 + 60 * 60,
                  finalizes: +new Date() / 1000 + 60 * 60 * 2,
                  commission: 0,
                  currencyId: 'DAI',
                  arbitrator: this.props.originArbitrator
                })
              }}
              action="Add"
            />
            <Row
              open={this.state.basicListingOffer ? true : false}
              title="Accept Offer"
              // isDone={this.props.hasOffer}
              checked={false}
              success="Accepted"
              prerequisite={this.props.hasOffer}
              gas={this.props.marketplaceRaw.acceptOfferGas}
              onAction={() => {
                this.props.selectAccount(Seller)
                this.props.acceptOffer(0, 0)
              }}
              action="Accept"
            />
            <Row
              open={this.state.basicListingOffer ? true : false}
              title="Finalize Offer"
              action="Finalize"
              // isDone={this.props.hasOffer}
              checked={false}
              success="Finalized"
              prerequisite={this.props.hasOffer}
              gas={this.props.marketplaceRaw.finalizeOfferGas}
              onAction={() => {
                this.props.selectAccount(Buyer)
                this.props.finalizeOffer(0, 0)
              }}
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

  renderSection({ name, id }) {
    return (
      <tr
        onClick={() =>
          this.setState({
            [id]: this.state[id] ? false : true
          })
        }
      >
        <td style={{ borderTopWidth: 2 }}>
          <i
            className={`fa fa-fw fa-caret-${this.state[id] ? 'down' : 'right'}`}
          />
        </td>
        <td style={{ borderTopWidth: 2 }}>
          <i className="fa fa-check text-success" />
        </td>
        <td
          style={{ borderTopWidth: 2 }}
          colSpan="4"
          className="font-weight-bold"
        >
          {name}
        </td>
      </tr>
    )
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet,
  parties: state.parties.parties,
  activeParty: state.parties.active,
  nodeAccounts: state.network.accounts,
  marketplaceRaw: state.marketplace,
  marketplace: state.marketplace.contractAddress,
  arbitrator: state.marketplace.arbitratorAddress,
  originArbitrator: state.marketplace.originArbitratorAddress,
  marketplaceParty: state.parties.parties.find(
    p => p.address === state.marketplace.contractAddress
  ),
  accounts: state.wallet.accounts,
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
  hasOffer: state.marketplace.offers.length > 0,
  token: state.token.contractAddresses.OGN,
  stableCoin: state.token.contractAddresses.DAI
})

const mapDispatchToProps = dispatch => ({
  deployMarketplace: (...args) => dispatch(deployMarketplaceContract(...args)),
  deployArbitrator: (...args) => dispatch(deployArbitratorContract(...args)),
  deployOriginArbitrator: (...args) =>
    dispatch(deployOriginArbitratorContract(...args)),
  deployToken: args => dispatch(deployTokenContract(args)),
  addParty: obj => dispatch(addParty(obj)),
  createListing: obj => dispatch(createListing(obj)),
  makeOffer: (...args) => dispatch(makeOffer(...args)),
  transferToken: (...args) => dispatch(transferToken(...args)),
  approveToken: (...args) => dispatch(approveToken(...args)),
  addAccount: (...args) => dispatch(addAccount(...args)),
  saveWallet: (...args) => dispatch(UNSAFE_saveWallet(...args)),
  sendFromNode: (...args) => dispatch(sendFromNode(...args)),
  selectAccount: (...args) => dispatch(selectAccount(...args)),
  getOffers: (...args) => dispatch(getOffers(...args)),
  acceptOffer: (...args) => dispatch(acceptOffer(...args)),
  finalizeOffer: (...args) => dispatch(finalizeOffer(...args))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
