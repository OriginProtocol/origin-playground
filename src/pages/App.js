import React, { Component } from 'react'
import { Switch, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Console from './console'
import Versions from './_Versions'
import Selector from './marketplace/Selector'
import Identity from './identity'

import { selectAccount, setCurrency, loadWallet } from 'actions/Wallet'
import { init, timeTravel } from 'actions/Network'

import AccountChooser from 'components/AccountChooser'
import TimeTraveler from 'components/TimeTraveler'
import GasTracker from 'components/GasTracker'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  componentDidMount() {
    this.props.initNetwork()
    if (!this.props.wallet.activeAddress && window.sessionStorage.privateKeys) {
      this.props.loadWallet()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hideNotice)
  }

  componentDidUpdate(prevProps) {
    if (
      window.innerWidth <= 575 &&
      this.props.location !== prevProps.location
    ) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <div>
        <GasTracker items={this.props.network.gasUsed} />
        <nav className="navbar navbar-expand-sm navbar-light">
          <div className="container">
            <Link
              to="/"
              className="navbar-brand mr-3"
              onClick={() => this.setState({ toggled: false })}
            >
              Origin Playground
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() =>
                this.setState({
                  toggled: this.state.toggled ? false : true
                })
              }
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={`navbar-collapse collapse${
                this.state.toggled ? ' show' : ''
              }`}
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/marketplace">
                    Marketplace
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/identity">
                    Identity
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ml-3 text-right">
                <li className="nav-item">
                  <TimeTraveler
                    network={this.props.network}
                    timeTravel={this.props.timeTravel}
                  />
                </li>
                <li className="nav-item">
                  <AccountChooser
                    balance={this.props.balance}
                    wallet={this.props.wallet}
                    account={this.props.account}
                    selectAccount={a => this.props.selectAccount(a)}
                    setCurrency={c => this.props.setCurrency(c)}
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          {!this.state.preloaded ? null : (
            <div className="alert alert-info mt-3">
              Logged in with demo account!
              <a
                className="close"
                href="#"
                onClick={e => {
                  e.preventDefault()
                  this.setState({ preloaded: false })
                }}
              >
                &times;
              </a>
            </div>
          )}

          <Switch>
            <Route path="/console" component={Console} />
            <Route path="/identity" component={Identity} />
            <Route path="/marketplace" component={Selector} />
            <Redirect from="/" to="/marketplace" />
          </Switch>

          <div className="footer">
            <div className="powered-by">
              <a href="https://www.originprotocol.com">
                <img src="images/origin-logo-dark.png" />
              </a>
            </div>
            <div className="middle">
              &copy;{' 2018 '}
              <a className="ml-1" href="https://www.originprotocol.com">
                Origin Protocol
              </a>
            </div>
            <div className="right">
              <a href="https://github.com/OriginProtocol/identity-playground">
                <i className="fa fa-lg fa-github" />
              </a>
              <Versions />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  account: state.wallet.activeAddress,
  balance: state.wallet.balances[state.wallet.activeAddress],
  wallet: state.wallet,
  network: state.network,
  nodeAccounts: state.network.accounts
})

const mapDispatchToProps = dispatch => ({
  initNetwork: () => dispatch(init()),
  loadWallet: () => dispatch(loadWallet()),
  selectAccount: hash => dispatch(selectAccount(hash)),
  setCurrency: currency => dispatch(setCurrency(currency)),
  timeTravel: seconds => dispatch(timeTravel(seconds))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

require('react-styl')(`
  table.table
    thead tr th
      border-top: 0
    .btn-sm
      padding: 0.125rem 0.375rem
  .navbar
    border-bottom: 1px solid #E5E9EF;
  .navbar-light .navbar-text .dropdown-item.active,
  .navbar-light .navbar-text .dropdown-item:active
    color: #fff;
  .pointer
    cursor: pointer
  .no-wrap
    white-space: nowrap
  .footer
    display: flex
    align-items: center;
    color: #999;
    margin: 1rem 0;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    font-size: 14px;
    a
      color: #999;
    .middle
      flex: 1
      text-align: center
    .right
      flex: 1
      text-align: right
    .powered-by
      flex: 1
      font-size: 14px;
      letter-spacing: -0.01rem;
      img
        opacity: .4;
        height: 12px;
        margin-top: -2px
        margin-right: 0.25rem
`)
