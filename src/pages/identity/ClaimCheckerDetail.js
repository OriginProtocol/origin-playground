import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom'

import {
  getEvents,
  checkClaim,
  removeVerifier,
  claimType
} from 'actions/Identity'

import { selectAccount } from 'actions/Wallet'

import Events from './_Events'
import CheckClaim from './modals/_CheckClaim'

class ProtectedDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { mode: 'summary' }
    this.props.getEvents('ClaimVerifier', props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.getEvents('ClaimVerifier', nextProps.match.params.id)
    }
  }

  render() {
    var identities = this.props.identities.filter(i => i.type !== 'certifier')
    var address = this.props.match.params.id

    var verifier = this.props.verifiers.find(i => i.address === address)
    if (!verifier) {
      return null
    }
    var isOwner = verifier.owner === this.props.wallet.activeAddress

    return (
      <>
        <div>
          <ul className="nav nav-tabs mb-3">
            <li className="mr-auto">
              <a
                style={{ fontSize: '1.6rem' }}
                onClick={e => e.preventDefault()}
              >
                {verifier.name}
              </a>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/claim-checker/${address}`}
                exact
              >
                Summary
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/claim-checker/${address}/events`}
              >
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/claim-checker/${address}/info`}
              >
                Info
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route
            path={`/claim-checker/:id/info`}
            render={() => (
              <>
                <div className="mono">{`Address: ${verifier.address}`}</div>
                <div className="mono">{`Owner: ${verifier.owner}`}</div>

                <hr />
                <div className="d-flex">
                  <button
                    className={`btn btn-sm btn-outline-danger ml-auto${
                      isOwner ? '' : ' disabled'
                    }`}
                    onClick={() => {
                      if (isOwner) {
                        this.props.removeVerifier(verifier.address)
                        this.setState({ activeIdentity: null })
                      }
                    }}
                  >
                    <i className="fa fa-trash" /> Remove Contract
                  </button>
                </div>
              </>
            )}
          />
          <Route
            path={`/claim-checker/:id/events`}
            render={() => (
              <Events
                eventsResponse={this.props.eventsResponse}
                events={this.props.events}
              />
            )}
          />
          <Route
            path={`/claim-checker/:id`}
            exact
            render={() => (
              <>
                <div className="my-3">
                  <button
                    className="btn btn-sm btn-outline-primary ml-1"
                    onClick={() => this.setState({ checkClaim: true })}
                  >
                    {verifier.methodName || 'Check Claim via Contract'}
                  </button>
                </div>
                {this.renderAttempts(this.props.events, verifier)}
              </>
            )}
          />
        </Switch>

        {this.state.checkClaim && (
          <CheckClaim
            onClose={() => this.setState({ checkClaim: false })}
            verifier={verifier}
            identities={identities}
            checkClaim={this.props.checkClaim}
            response={this.props.checkClaimResponse}
          />
        )}
      </>
    )
  }

  renderAttempts(events, verifier) {
    if (!events || !events.length) {
      return null
    }

    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th className="text-center">Block</th>
            <th>Identity</th>
            <th>Claim Type</th>
            <th>Issuer</th>
            <th className="text-center">Result</th>
          </tr>
        </thead>
        <tbody>
          {events.map((evt, idx) => (
            <tr key={idx}>
              <td className="text-center">{evt.blockNumber}</td>
              <td>
                {this.props.identity.names[evt.returnValues._identity] ||
                  String(evt.returnValues._identity).substr(0, 8)}
              </td>
              <td>{claimType(verifier.claimType)}</td>
              <td>
                {this.props.identity.names[verifier.trustedIdentity] ||
                  String(verifier.trustedIdentity).substr(0, 8)}
              </td>
              <td className="text-center">
                {evt.event === 'ClaimValid' ? (
                  <span className="text-success">Valid <i className="fa fa-check" /></span>
                ) : (
                  <span className="text-danger">Invalid <i className="fa fa-times" /></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  identity: state.identity,
  identities: [
    ...state.identity.identities,
    ...state.identity.officialIdentities
  ],
  verifiers: state.identity.claimVerifiers,
  events: state.identity.events,
  eventsResponse: state.identity.eventsResponse,
  checkClaimResponse: state.identity.checkClaimResponse,
  wallet: state.wallet,
  activeIdentity: ownProps.match.params.id
})

const mapDispatchToProps = dispatch => ({
  getEvents: (type, address) => dispatch(getEvents(type, address)),
  checkClaim: (...args) => dispatch(checkClaim(...args)),
  removeVerifier: (...args) => dispatch(removeVerifier(...args)),
  selectAccount: hash => dispatch(selectAccount(hash))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedDetail)
