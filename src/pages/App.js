import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Console from './console'
import Identity from './identity'
import Versions from './_Versions'
import Init from './_Init'

import { init } from 'actions/Network'
import AccountChooser from 'components/AccountChooser'

import { selectAccount, setCurrency, loadWallet } from 'actions/Wallet'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.initNetwork()
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

  componentWillReceiveProps(nextProps) {
    // If no accounts are present, pre-populate for an easier demo experience.
    if (
      !this.props.wallet.loaded &&
      nextProps.wallet.loaded &&
      !nextProps.wallet.activeAddress
    ) {
      window.sessionStorage.privateKeys = JSON.stringify([
        '0x1aae4f8918c2c1fa3f911415491a49e541a528233da3a54df21e7eea5c675cd9',
        '0x7a8be97032a5c719d2cea4e4adaed0620e9fa9e49e2ccf689daf9180e3638f93',
        '0x85a676919234e90007b20bf3ae6b54b455b62b42bf298ac03669d164e4689c49'
      ])
      this.props.loadWallet()
      this.setState({ preloaded: true })
      this.hideNotice = setTimeout(
        () => this.setState({ preloaded: false }),
        3000
      )
    }
  }

  render() {
    return (
      <div>
        <Init onClose={() => this.props.history.push('/')} />
        <nav className="navbar navbar-expand-sm navbar-light">
          <div className="container">
            <Link
              to="/"
              className="navbar-brand mr-3"
              onClick={() => this.setState({ toggled: false })}
            >
              ERC 725
            </Link>
            <span className="navbar-text">
              Demo implementation by
              <a href="https://www.originprotocol.com">
                <img
                  style={{ height: 15, opacity: 0.5, verticalAlign: -2, marginLeft: 5 }}
                  src="/images/origin-logo-dark.png"
                />
              </a>
            </span>
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
              <ul className="navbar-nav ml-auto text-right">
                {this.props.account &&
                  this.props.wallet && (
                    <li className="nav-item">
                      <AccountChooser
                        balance={this.props.balance}
                        wallet={this.props.wallet}
                        account={this.props.account}
                        selectAccount={a => this.props.selectAccount(a)}
                        setCurrency={c => this.props.setCurrency(c)}
                      />
                    </li>
                  )}
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
            <Route path="/identity/:address" component={Identity} />
            <Route path="/claim-checker/:address" component={Identity} />
            <Route component={Identity} />
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
  nodeAccounts: state.network.accounts
})

const mapDispatchToProps = dispatch => ({
  initNetwork: () => {
    dispatch(init())
  },
  loadWallet: () => {
    dispatch(loadWallet())
  },
  selectAccount: hash => dispatch(selectAccount(hash)),
  setCurrency: currency => dispatch(setCurrency(currency))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

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
