import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom'

import {
  deployIdentityContract,
  deployClaimVerifier,
  addClaim,
  removeClaim,
  addKey,
  removeKey,
  getEvents,
  approveExecution,
  checkClaim,
  removeIdentity
} from 'actions/Identity'

import { selectAccount } from 'actions/Wallet'

import Events from './_Events'
import Summary from './_Summary'
import AddKey from './modals/_AddKey'
import RemoveKey from './modals/_RemoveKey'
import AddClaim from './modals/_AddClaim'
import RemoveClaim from './modals/_RemoveClaim'
import Approve from './modals/_Approve'
import RemoveIdentity from './modals/_RemoveIdentity'

class IdentityDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { mode: 'summary' }
    this.props.getEvents('ClaimHolder', props.match.params.identity)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeIdentity !== nextProps.activeIdentity) {
      this.props.getEvents('ClaimHolder', nextProps.activeIdentity)
    }
  }

  render() {
    var identity = this.props.identities.find(
      i => i.address === this.props.activeIdentity
    )
    if (!identity) {
      return null
    }

    var certifiers = this.props.identities.filter(i => i.type === 'certifier')

    var isOwner = identity.owner === this.props.wallet.activeAddress
    var wrongOwner = !isOwner
    var unlockable =
      !isOwner && this.props.wallet.accounts.indexOf(identity.owner) >= 0

    return (
      <>
        <div>
          <ul className="nav nav-tabs mb-3">
            <li className="mr-auto">
              <a
                style={{ fontSize: '1.6rem' }}
                onClick={e => {
                  e.preventDefault()
                }}
              >
                {identity.name}
                <i
                  className={`account-lock fa fa-${
                    isOwner
                      ? 'unlock'
                      : `lock${unlockable ? ' unlockable' : ''}`
                  } ml-3`}
                  onClick={
                    !unlockable
                      ? null
                      : () => {
                          this.props.selectAccount(identity.owner)
                        }
                  }
                />
              </a>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/identity/${identity.address}`}
                exact
              >
                Summary
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/identity/${identity.address}/events`}
              >
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/identity/${identity.address}/info`}
              >
                Info
              </NavLink>
            </li>
          </ul>
        </div>

        <Switch>
          <Route
            path={`/identity/:address/events`}
            render={() => (
              <Events
                eventsResponse={this.props.eventsResponse}
                events={this.props.events}
              />
            )}
          />
          <Route
            path={`/identity/:address/info`}
            render={() => (
              <>
                <div className="d-flex flex-column align-items-center">
                  <div className="mono w-100">{`Address: ${
                    identity.address
                  }`}</div>
                  <div className="mono w-100">
                    &nbsp;&nbsp;{`Owner: ${identity.owner}`}
                  </div>
                </div>
                <hr />
                <div className="d-flex">
                  {identity.official ? null : (
                    <button
                      className={`btn btn-sm btn-outline-danger ml-auto${
                        isOwner ? '' : ' disabled'
                      }`}
                      onClick={() =>
                        isOwner ? this.setState({ removeIdentity: true }) : null
                      }
                    >
                      <i className="fa fa-trash" /> Remove Identity
                    </button>
                  )}
                </div>
              </>
            )}
          />
          <Route
            render={() => (
              <div>
                <Summary
                  events={this.props.events}
                  response={this.props.eventsResponse}
                  names={this.props.identity.names}
                  identity={identity}
                  isOwner={isOwner}
                  certifiers={certifiers}
                  onAddKey={() => this.setState({ addKey: true })}
                  onRemoveKey={key => this.setState({ removeKey: key })}
                  onRemoveClaim={claim => this.setState({ removeClaim: claim })}
                  onAddClaim={claimData =>
                    this.setState({ addClaim: true, claimData })
                  }
                  approveExecution={executionId => {
                    this.setState({ executionId, approve: true })
                  }}
                />
              </div>
            )}
          />
        </Switch>

        {this.state.addClaim && (
          <AddClaim
            onClose={() => this.setState({ addClaim: false })}
            addClaim={this.props.addClaim}
            claimData={this.state.claimData}
            identity={identity}
            certifiers={certifiers}
            identities={this.props.identities}
            response={this.props.addClaimResponse}
          />
        )}

        {this.state.removeClaim && (
          <RemoveClaim
            onClose={() => this.setState({ removeClaim: false })}
            response={this.props.removeClaimResponse}
            identity={this.props.activeIdentity}
            removeClaim={() =>
              this.props.removeClaim({
                identity: this.props.activeIdentity,
                claim: this.state.removeClaim
              })
            }
            wrongOwner={wrongOwner}
          />
        )}

        {this.state.addKey && (
          <AddKey
            onClose={() => this.setState({ addKey: false })}
            response={this.props.addKeyResponse}
            identity={this.props.activeIdentity}
            addKey={this.props.addKey}
            wrongOwner={wrongOwner}
          />
        )}

        {this.state.removeKey && (
          <RemoveKey
            onClose={() => this.setState({ removeKey: false })}
            response={this.props.removeKeyResponse}
            identity={this.props.activeIdentity}
            removeKey={() =>
              this.props.removeKey({
                identity: this.props.activeIdentity,
                key: this.state.removeKey
              })
            }
            wrongOwner={wrongOwner}
          />
        )}

        {this.state.approve && (
          <Approve
            onClose={() => this.setState({ approve: false })}
            identities={this.props.identities}
            identity={this.props.activeIdentity}
            executionId={this.state.executionId}
            approveExecution={this.props.approveExecution}
            response={this.props.identity.approveExecutionResponse}
          />
        )}

        {this.state.removeIdentity && (
          <RemoveIdentity
            onClose={() => this.setState({ removeIdentity: false })}
            removeIdentity={() => {
              this.props.removeIdentity(this.props.activeIdentity)
              this.setState({ removeIdentity: false })
              this.props.history.push('/')
            }}
          />
        )}
      </>
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
  addKeyResponse: state.identity.addKeyResponse,
  removeKeyResponse: state.identity.removeKeyResponse,
  addClaimResponse: state.identity.addClaimResponse,
  removeClaimResponse: state.identity.removeClaimResponse,
  approveExecutionResponse: state.identity.approveExecutionResponse,
  checkClaimResponse: state.identity.checkClaimResponse,
  wallet: state.wallet,
  activeIdentity: ownProps.match.params.identity
})

const mapDispatchToProps = dispatch => ({
  deployIdentityContract: (...args) =>
    dispatch(deployIdentityContract(...args)),
  deployClaimVerifier: (...args) => dispatch(deployClaimVerifier(...args)),
  addClaim: opts => dispatch(addClaim(opts)),
  removeClaim: opts => dispatch(removeClaim(opts)),
  addKey: opts => dispatch(addKey(opts)),
  removeKey: opts => dispatch(removeKey(opts)),
  getEvents: (type, address) => dispatch(getEvents(type, address)),
  approveExecution: (...args) => dispatch(approveExecution(...args)),
  checkClaim: (...args) => dispatch(checkClaim(...args)),
  removeIdentity: (...args) => dispatch(removeIdentity(...args)),
  selectAccount: hash => dispatch(selectAccount(hash))
})

export default connect(mapStateToProps, mapDispatchToProps)(IdentityDetails)

require('react-styl')(`
  .unlockable
    cursor: pointer
  .account-lock
    color: #6c757d
    &.unlockable:hover
      color: #28a745
`)
