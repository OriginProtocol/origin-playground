import React, { Component } from 'react'

class WalletChooser extends Component {
  render() {
    return (
      <div className="mb-3 d-flex justify-content-center align-items-center wallet-chooser">
        <b>Active wallet:</b>
        <div className="btn-group btn-group-sm ml-2">
          {this.props.wallet.accounts.map((a, idx) => (
            <button
              key={idx}
              className={`btn btn-outline-secondary${
                this.props.wallet.activeAddress === a ? ' active' : ''
              }`}
              onClick={() => this.props.selectAccount(a)}
            >
              {a.substr(0, 6)}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default WalletChooser
