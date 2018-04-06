import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from 'components/Modal'

import {
  addAccount,
  saveWallet,
  removeAccount,
  importAccountFromKey,
  selectAccount
} from 'actions/Wallet'

import {
  fetchAccounts,
  sendFromAccount,
  sendFromNode
} from 'actions/Network'

class Accounts extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchAccounts()
  }

  render() {
    const { balances } = this.props.wallet
    const currency = this.props.wallet.currency + 'Str'

    return (
      <div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Local Accounts</th>
              <th>Balance</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.wallet.accounts.map((a, idx) => (
              <tr key={idx}>
                <td>
                  <input defaultValue={a} />
                </td>
                <td>{balances[a] ? `${balances[a][currency]}` : ''}</td>
                <td className="text-right">
                  <button
                    className={`btn btn-outline-success btn-sm mr-2`}
                    onClick={() => {
                      this.props.sendFromNode(
                        this.props.network.accounts[0].hash,
                        a,
                        '1'
                      )
                    }}
                  >
                    <i className="fa fa-money" />
                  </button>
                  <button
                    className={`btn btn-outline-primary btn-sm${
                      !balances[a] || balances[a].eth <= 0 ? ' disabled' : ''
                    }`}
                    onClick={() => this.setState({ transferFunds: a })}
                  >
                    <i className="fa fa-mail-forward" />
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm ml-2"
                    onClick={() => this.props.removeAccount(a)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">
                <div className="form-inline">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => this.props.addAccount()}
                  >
                    <i className="fa fa-random mr-1" />Create
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm ml-2"
                    onClick={() => this.setState({ import: true })}
                  >
                    <i className="fa fa-upload mr-1" />Import
                  </button>

                  <button className="btn btn-outline-secondary btn-sm ml-2">
                    <i className="fa fa-download mr-1" />Export
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm ml-auto"
                    onClick={() => {
                      window.localStorage.clear()
                      window.sessionStorage.clear()
                    }}
                  >
                    <i className="fa fa-trash mr-1" /> Clear All
                  </button>

                  {!this.props.wallet.unsaved ? null : (
                    <button
                      className={`btn btn-${
                        this.props.wallet.unsaved
                          ? 'primary'
                          : 'outline-secondary'
                      } btn-sm ml-auto`}
                      onClick={() => this.props.saveWallet()}
                    >
                      Save
                    </button>
                  )}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        {this.state.transferFunds && (
          <Modal
            className="p-3"
            style={{ maxWidth: 320 }}
            onClose={() => this.setState({ transferFunds: false })}
          >
            Transfer to:
            <select className="form-control" ref={r => (this.sendTo = r)}>
              {this.props.wallet.accounts
                .filter(ac => ac !== this.state.transferFunds)
                .map(act => <option key={act}>{act}</option>)}
            </select>
            <div className="d-flex mt-2">
              <div className="input-group mr-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {this.props.wallet.currencyStr}
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Amount"
                  ref={r => (this.amount = r)}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.props.sendFromAccount(
                    this.state.transferFunds,
                    this.sendTo.value,
                    this.amount.value
                  )
                }}
              >
                Send
              </button>
            </div>
          </Modal>
        )}
        {this.state.import && (
          <Modal
            className="p-3"
            style={{ maxWidth: 320 }}
            onClose={() => this.setState({ import: false })}
          >
            <a
              className="close"
              href="#"
              onClick={e => {
                e.preventDefault()
                this.setState({ import: false })
              }}
            >
              &times;
            </a>
            Import:
            <div className="btn-group btn-group-sm ml-2">
              <button className="btn btn-outline-secondary active">
                Private Key
              </button>
              <button className="btn btn-outline-secondary">JSON File</button>
            </div>
            <div className="input-group mt-3">
              <div className="input-group-prepend">
                <span className="input-group-text">0x</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Private Key"
                ref={ref => (this.privateKey = ref)}
                style={{ width: 150 }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.props.importAccountFromKey(
                      `0x${this.privateKey.value}`
                    )
                  }}
                >
                  <i className="fa fa-upload" />
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet,
  network: state.network,
})

const mapDispatchToProps = dispatch => ({
  selectAccount: hash => dispatch(selectAccount(hash)),
  addAccount: () => dispatch(addAccount()),
  saveWallet: () => dispatch(saveWallet()),
  sendFromAccount: (...args) => dispatch(sendFromAccount(...args)),
  sendFromNode: (...args) => dispatch(sendFromNode(...args)),
  removeAccount: hash => dispatch(removeAccount(hash)),
  importAccountFromKey: privateKey =>
    dispatch(importAccountFromKey(privateKey)),
  fetchAccounts: () => dispatch(fetchAccounts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)
