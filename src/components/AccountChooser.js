import React, { Component } from 'react'

import Dropdown from './Dropdown'
import Modal from './Modal'

export default class AccountChooser extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { wallet, balance } = this.props
    const currency = `${wallet.currency}Str`
    return (
      <div>
        <Dropdown
          style={{ position: 'relative' }}
          linkClass=" nav-link"
          label={
            <span
              className={
                this.props.wallet.locked ? 'wallet-locked' : 'wallet-unlocked'
              }
            >
              {`Balance: ${balance[currency]}`}
              <i
                className={`fa fa-${
                  this.props.wallet.locked ? '' : 'un'
                }lock ml-2`}
              />
              <i className="fa fa-caret-down ml-2" />
            </span>
          }
        >
          <div className="d-flex px-2" style={{ whiteSpace: 'nowrap' }}>
            <div className="btn-group btn-group-sm mx-auto align-items-baseline">
              <button
                className={`btn btn-outline-secondary${
                  this.props.wallet.locked ? ' active' : ''
                }`}
                onClick={() => {
                  this.props.lockWallet()
                }}
              >
                <i className="fa fa-lock" /> Lock
              </button>
              <button
                className={`btn btn-outline-secondary${
                  this.props.wallet.locked ? '' : ' active'
                }`}
                onClick={() => {
                  this.props.unlockWallet()
                }}
              >
                <i className="fa fa-unlock" /> Unlock
              </button>
            </div>
            <a
              className="ml-2 btn btn-outline-secondary btn-sm"
              href="#/console"
            >
              <i className="fa fa-cogs" />
            </a>
          </div>
          <div className="dropdown-divider" />
          {wallet.accounts.map((a, idx) => (
            <a
              key={idx}
              href="#"
              className={`dropdown-item d-flex justify-content-between${
                a === this.props.account ? ' active' : ''
              }`}
              onClick={e => {
                e.preventDefault()
                this.props.selectAccount(a)
              }}
            >
              <span>{`${this.props.wallet.balances[a][currency]}`}</span>
              <span className="ml-3">{`${a.substr(0, 8)}`}</span>
            </a>
          ))}
          <div className="dropdown-divider" />
          <div className="d-flex px-3" style={{ whiteSpace: 'nowrap' }}>
            <div className="btn-group btn-group-sm mx-auto align-items-baseline">
              Prices in:
              <button
                className={`ml-2 btn btn-outline-secondary${
                  this.props.wallet.currency === 'usd' ? ' active' : ''
                }`}
                onClick={e => {
                  e.stopPropagation()
                  this.props.setCurrency('usd')
                }}
                children="USD"
              />
              <button
                className={`btn btn-outline-secondary${
                  this.props.wallet.currency === 'eth' ? ' active' : ''
                }`}
                onClick={e => {
                  e.stopPropagation()
                  this.props.setCurrency('eth')
                }}
                children="ETH"
              />
            </div>
          </div>
        </Dropdown>

        {this.props.wallet.tryUnlock && (
          <Modal
            style={{ maxWidth: 320 }}
            onClose={() => {
              this.props.lockWallet()
              this.setState({ unlock: false, correct: false })
            }}
            onOpen={() => {
              this.pw.focus()
              this.setState({ correct: false })
            }}
            shouldClose={this.state.unlock}
            submitted={this.state.unlock}
            className="p-3"
          >
            {this.state.correct ? (
              <div className="d-flex justify-content-center">
                <i
                  className="fa fa-check-circle-o fa-2x"
                  style={{ color: 'green' }}
                />
              </div>
            ) : (
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Master Account Password"
                  className="form-control"
                  ref={r => (this.pw = r)}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      this.setState({ correct: true })
                      setTimeout(() => {
                        this.setState({ unlock: true })
                      }, 500)
                    }
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fa fa-unlock-alt" />
                  </span>
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    )
  }
}

require('react-styl')(`
  .wallet-unlocked
    color: green
`)
