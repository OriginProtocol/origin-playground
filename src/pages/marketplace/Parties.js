import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { addParty, updateParties } from 'actions/Parties'
import { selectAccount } from 'actions/Wallet'

import NewParty from './_NewParty'

const Currencies = ['ETH', 'DAI', 'OGN']

class Parties extends Component {
  constructor() {
    super()
    this.state = { colors: {}, balances: {} }
  }

  componentDidMount() {
    this.props.updateParties()
  }

  static getDerivedStateFromProps(props, state) {
    var colors = {},
      balances = {}
    props.parties.parties.forEach((party, idx) => {
      Currencies.forEach(currency => {
        var key = `${currency}-${idx}`
        var value = Number(party[currency])
        if (
          state.balances[key] === undefined ||
          state.balances[key] === value
        ) {
          balances[key] = value
          colors[key] = ''
        } else if (state.balances[key] < value) {
          colors[key] = ' green'
        } else if (state.balances[key] > value) {
          colors[key] = ' red'
        }
      })
    })
    if (JSON.stringify(colors) !== JSON.stringify(state.colors)) {
      return { balances, colors, startFade: true }
    }
    return { startFade: false }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.startFade && this.state.startFade) {
      clearTimeout(this.to1)
      clearTimeout(this.to2)
      this.to1 = setTimeout(() => {
        this.setState({ doFade: true })
      }, 5000)
      this.to2 = setTimeout(() => {
        this.setState({ startFade: false, doFade: false })
      }, 6000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.to1)
    clearTimeout(this.to2)
  }

  render() {
    const { parties } = this.props.parties
    const { wallet } = this.props

    return (
      <>
        <table
          className={`table table-sm${
            parties.length ? ' table-hover' : ''
          } identities-list`}
        >
          <thead>
            <tr>
              <th className="border-top-0">
                <i className="fa fa-users mr-2" />Parties
                {!parties.length ? null : (
                  <a
                    href="#"
                    className="ml-2"
                    onClick={e => {
                      e.preventDefault()
                      this.setState({ newParty: true })
                    }}
                  >
                    <i className="fa fa-plus" />
                  </a>
                )}
              </th>
              <th className="border-top-0 text-center" style={{ width: 80 }}>
                Addr
              </th>
              <th className="border-top-0 text-center">ETH</th>
              <th className="border-top-0 text-center">OGN</th>
              <th className="border-top-0 text-center">DAI</th>
            </tr>
          </thead>
          <tbody>
            {!parties.length && (
              <tr>
                <td colSpan={2} className="p-2">
                  <button
                    href="#"
                    className="btn btn-sm btn-outline-primary"
                    onClick={e => {
                      e.preventDefault()
                      this.setState({ newParty: true })
                    }}
                  >
                    <i className="fa fa-plus" /> Add a Party
                  </button>
                </td>
              </tr>
            )}
            {parties.map((party, idx) => (
              <tr
                key={idx}
                style={{ cursor: 'pointer' }}
                className={this.rowCls(party, idx)}
                onClick={() => {
                  if (
                    wallet.accounts.find(a => a === party.address) &&
                    wallet.activeAddress !== party.address
                  ) {
                    this.props.selectAccount(party.address)
                  }
                }}
              >
                <td>
                  <i className={`fa fa-fw mr-1${this.icon(party)}`} />
                  {party.name}
                  {!party.publicKey ? null : (
                    <i className="fa fa-key ml-2" style={{ opacity: 0.5 }} />
                  )}
                </td>
                <td className="text-center mono">
                  {party.address ? party.address.substr(2, 4) : ''}
                </td>
                <td
                  className={`text-center${this.state.colors[`ETH-${idx}`] ||
                    ''}${this.state.doFade ? ' fadebg' : ''}`}
                >
                  {party.ETH ? party.ETH.substr(0, 6) : ''}
                </td>
                <td
                  className={`text-center${this.state.colors[`OGN-${idx}`] ||
                    ''}${this.state.doFade ? ' fadebg' : ''}`}
                >
                  {party.OGN || ''}
                </td>
                <td
                  className={`text-center${this.state.colors[`DAI-${idx}`] ||
                    ''}${this.state.doFade ? ' fadebg' : ''}`}
                >
                  {party.DAI || ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.newParty && (
          <NewParty
            onClose={() => this.setState({ newParty: false })}
            addParty={party => {
              this.props.addParty(party)
              this.setState({ newParty: false })
            }}
          />
        )}
      </>
    )
  }

  icon(party) {
    var cls = ' '
    if (this.props.wallet.accounts.find(a => a === party.address)) {
      if (party.address === this.props.wallet.activeAddress) {
        cls += 'fa-user'
      } else {
        cls += 'fa-user-o text-muted'
      }
    } else {
      cls += 'fa-sticky-note-o text-muted'
    }
    return cls
  }

  rowCls() {
    //party) {
    var cls = ''
    // if (this.props.wallet.activeAddress === party.address) {
    //   cls += 'table-warning'
    // } else {
    //   cls += 'table-active'
    // }
    return cls
  }
}

const mapStateToProps = state => ({
  parties: state.parties,
  wallet: state.wallet
})

const mapDispatchToProps = dispatch => ({
  addParty: party => dispatch(addParty(party)),
  updateParties: () => dispatch(updateParties()),
  selectAccount: (...args) => dispatch(selectAccount(...args))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Parties)
)

require('react-styl')(`
  td.green
    transition: background-color 100ms linear;
    background: #cfc
  td.red
    transition: background-color 100ms linear;
    background: #fcc
  td.fadebg
    background: #fff
    transition: background-color 1000ms linear;
`)
