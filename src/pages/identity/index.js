import React, { Component } from 'react'
import { connect } from 'react-redux'

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
  removeIdentity,
  removeVerifier
} from 'actions/Identity'

import { selectAccount } from 'actions/Wallet'
import NavItem from 'components/NavItem'

import Events from './_Events'
import Summary from './_Summary'
import WalletChooser from './_WalletChooser'
import NewVerifier from './modals/_NewVerifier'
import NewIdentity from './modals/_NewIdentity'
import CheckClaim from './modals/_CheckClaim'
import AddKey from './modals/_AddKey'
import RemoveKey from './modals/_RemoveKey'
import AddClaim from './modals/_AddClaim'
import RemoveClaim from './modals/_RemoveClaim'
import Approve from './modals/_Approve'
import RemoveIdentity from './modals/_RemoveIdentity'

class Identity extends Component {
  constructor() {
    super()
    this.state = {
      mode: 'summary'
    }
  }

  render() {
    var identities = this.props.identities.filter(i => i.type !== 'certifier')
    var certifiers = this.props.identities.filter(i => i.type === 'certifier')
    var activeIdentity = this.props.identities.find(
      i => i.address === this.state.activeIdentity
    )
    var wrongOwner =
      activeIdentity && this.props.wallet.activeAddress !== activeIdentity.owner

    return (
      <div className="pt-3">
        <div className="row">
          <div className="col-md-6">
            <WalletChooser
              wallet={this.props.wallet}
              selectAccount={this.props.selectAccount}
            />

            <table
              className={`table table-sm${
                identities.length ? ' table-hover' : ''
              } identities-list`}
            >
              <thead>
                <tr>
                  <th>
                    <i className="fa fa-user mr-2" />Identities
                    {!identities.length ? null : (
                      <a
                        href="#"
                        className="ml-2"
                        onClick={e => {
                          e.preventDefault()
                          this.setState({
                            identityType: 'identity',
                            deploy: true
                          })
                        }}
                      >
                        <i className="fa fa-plus" />
                      </a>
                    )}
                  </th>
                  <th className="text-center" style={{ width: 100 }}>
                    Addr
                  </th>
                  <th className="text-center" style={{ width: 100 }}>
                    Owner
                  </th>
                </tr>
              </thead>
              <tbody>
                {!identities.length && (
                  <tr>
                    <td colSpan={2} className="p-2">
                      <button
                        href="#"
                        className="btn btn-sm btn-outline-primary"
                        onClick={e => {
                          e.preventDefault()
                          this.setState({
                            identityType: 'identity',
                            deploy: true
                          })
                        }}
                      >
                        <i className="fa fa-plus" /> Add an Identity
                      </button>
                    </td>
                  </tr>
                )}
                {identities.map((identity, idx) => (
                  <tr
                    key={idx}
                    onClick={() =>
                      this.selectIdentity(identity.address, 'ClaimHolder')
                    }
                    style={{ cursor: 'pointer' }}
                    className={this.rowCls(identity)}
                  >
                    <td>
                      <i
                        className={`row-fa fa fa-${
                          this.props.wallet.activeAddress === identity.owner
                            ? 'un'
                            : ''
                        }lock`}
                      />
                      {identity.name}
                    </td>
                    <td className="text-center">
                      {!identity.address ? '' : identity.address.substr(0, 8)}
                    </td>
                    <td className="text-center">
                      {!identity.owner ? '' : identity.owner.substr(0, 8)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table
              className={`table table-sm${
                certifiers.length ? ' table-hover' : ''
              } certifiers-list`}
            >
              <thead>
                <tr>
                  <th>
                    <i className="fa fa-certificate mr-2" />Certifiers
                    {!certifiers.length ? null : (
                      <a
                        href="#"
                        className="ml-2"
                        onClick={e => {
                          e.preventDefault()
                          this.setState({
                            identityType: 'certifier',
                            deploy: true
                          })
                        }}
                      >
                        <i className="fa fa-plus" />
                      </a>
                    )}
                  </th>
                  <th />
                  <th className="text-center" style={{ width: 100 }}>
                    Addr
                  </th>
                  <th className="text-center" style={{ width: 100 }}>
                    Owner
                  </th>
                </tr>
              </thead>
              <tbody>
                {!certifiers.length && (
                  <tr>
                    <td colSpan={2} className="p-2">
                      <button
                        href="#"
                        className="btn btn-sm btn-outline-primary"
                        onClick={e => {
                          e.preventDefault()
                          this.setState({
                            identityType: 'certifier',
                            deploy: true
                          })
                        }}
                      >
                        <i className="fa fa-plus" /> Add a Certifier
                      </button>
                    </td>
                  </tr>
                )}
                {certifiers.map((identity, idx) => (
                  <tr
                    key={idx}
                    onClick={() =>
                      this.selectIdentity(identity.address, 'ClaimHolder')
                    }
                    style={{ cursor: 'pointer' }}
                    className={this.rowCls(identity)}
                  >
                    <td>
                      <i
                        className={`row-fa fa fa-${
                          this.props.wallet.activeAddress === identity.owner
                            ? 'un'
                            : ''
                        }lock`}
                      />
                      {!identity.icon ? null : (
                        <i className={`fa fa-${identity.icon} fa-fw mr-1`} />
                      )}
                      {identity.name}
                    </td>
                    <td>
                      {identity.uri ? (
                        activeIdentity && activeIdentity.type === 'identity' ? (
                          <>
                            <a
                              target="_blank"
                              href={identity.uri}
                              onClick={e => this.onCertify(e, identity, true)}
                            >
                              Get Claim
                            </a>
                          </>
                        ) : null
                      ) : null}
                    </td>
                    <td className="text-center">
                      {!identity.address ? '' : identity.address.substr(0, 8)}
                    </td>
                    <td className="text-center">
                      {!identity.owner ? '' : identity.owner.substr(0, 8)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table
              className={`table table-sm${
                this.props.verifiers.length ? ' table-hover' : ''
              } protected-list`}
            >
              <thead>
                <tr>
                  <th>
                    <i className="fa fa-lock mr-2" />Protected Contracts
                    {!this.props.verifiers.length ? null : (
                      <a
                        href="#"
                        className="ml-2"
                        onClick={e => {
                          e.preventDefault()
                          this.setState({ newVerifier: true })
                        }}
                      >
                        <i className="fa fa-plus" />
                      </a>
                    )}
                  </th>
                  <th>Certifier</th>
                  <th className="text-center" style={{ width: 100 }}>
                    Addr
                  </th>
                  <th className="text-center" style={{ width: 100 }}>
                    Owner
                  </th>
                </tr>
              </thead>
              <tbody>
                {!this.props.verifiers.length && (
                  <tr>
                    <td colSpan={2} className="p-2">
                      <button
                        href="#"
                        className="btn btn-sm btn-outline-primary"
                        onClick={e => {
                          e.preventDefault()
                          this.setState({ newVerifier: true })
                        }}
                      >
                        <i className="fa fa-plus" /> Add a Protected Contract
                      </button>
                    </td>
                  </tr>
                )}
                {this.props.verifiers.map((verifier, idx) => {
                  var trusted = this.props.identities.find(
                    i => i.address === verifier.trustedIdentity
                  )
                  return (
                    <tr
                      key={idx}
                      onClick={() =>
                        this.selectIdentity(verifier.address, 'ClaimVerifier')
                      }
                      style={{ cursor: 'pointer' }}
                      className={this.rowCls(verifier)}
                    >
                      <td>
                        <i
                          className={`row-fa fa fa-${
                            this.props.wallet.activeAddress === verifier.owner
                              ? 'un'
                              : ''
                          }lock`}
                        />
                        {verifier.name}
                      </td>
                      <td>{trusted ? trusted.name : 'None'}</td>
                      <td className="text-center">
                        {!verifier.address ? '' : verifier.address.substr(0, 8)}
                      </td>
                      <td className="text-center">
                        {!verifier.owner ? '' : verifier.owner.substr(0, 8)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">{this.renderDetails()}</div>
        </div>

        {this.state.deploy && (
          <NewIdentity
            onClose={() => this.setState({ deploy: false })}
            identityType={this.state.identityType}
            identities={this.props.identities}
            certifiers={certifiers}
            activeAddress={this.props.wallet.activeAddress}
            response={this.props.identity.createIdentityResponse}
            deployIdentityContract={this.props.deployIdentityContract}
          />
        )}

        {this.state.newVerifier && (
          <NewVerifier
            onClose={() => this.setState({ newVerifier: false })}
            deployClaimVerifier={this.props.deployClaimVerifier}
            response={this.props.identity.createVerifierResponse}
            identities={certifiers}
          />
        )}

        {this.state.addClaim && (
          <AddClaim
            onClose={() => this.setState({ addClaim: false })}
            addClaim={this.props.addClaim}
            claimData={this.state.claimData}
            identity={this.state.activeIdentity}
            identities={this.props.identities}
            response={this.props.addClaimResponse}
          />
        )}

        {this.state.removeClaim && (
          <RemoveClaim
            onClose={() => this.setState({ removeClaim: false })}
            response={this.props.removeClaimResponse}
            identity={this.state.activeIdentity}
            removeClaim={() =>
              this.props.removeClaim({
                identity: this.state.activeIdentity,
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
            identity={this.state.activeIdentity}
            addKey={this.props.addKey}
            wrongOwner={wrongOwner}
          />
        )}

        {this.state.removeKey && (
          <RemoveKey
            onClose={() => this.setState({ removeKey: false })}
            response={this.props.removeKeyResponse}
            identity={this.state.activeIdentity}
            removeKey={() =>
              this.props.removeKey({
                identity: this.state.activeIdentity,
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
            identity={this.state.activeIdentity}
            executionId={this.state.executionId}
            approveExecution={this.props.approveExecution}
            response={this.props.identity.approveExecutionResponse}
          />
        )}

        {this.state.removeIdentity && (
          <RemoveIdentity
            onClose={() => this.setState({ removeIdentity: false })}
            removeIdentity={() => {
              this.props.removeIdentity(this.state.activeIdentity)
              this.setState({ removeIdentity: false, activeIdentity: null })
            }}
          />
        )}

        {this.state.checkClaim && (
          <CheckClaim
            onClose={() => this.setState({ checkClaim: false })}
            identity={this.state.activeIdentity}
            identities={identities}
            verifiers={this.props.verifiers}
            checkClaim={this.props.checkClaim}
            response={this.props.checkClaimResponse}
          />
        )}
      </div>
    )
  }

  renderDetails() {
    if (!this.state.activeIdentity) {
      return (
        <div>
          <div className="mb-3">
            <i className="fa fa-arrow-left mr-2" />Select a contract for more
            information
          </div>
          <hr />
          <div className="mb-2">
            <div className="font-weight-bold">Identity</div>
            Controlled by Keys. Has Claims, can add Claims to other identities.
          </div>
          <div className="mb-2">
            <div className="font-weight-bold">Protected Contract</div>
            A contract only allowing interactions from Identites holding Claims
            from a trusted Certifier.
          </div>
          <div className="mb-2">
            <div className="font-weight-bold">Certifier</div>
            Also an Identity. Trusted by Protected Contracts to certify
            Identities with Claims.
          </div>
          <div className="mb-2">
            <div className="font-weight-bold">Claim</div>
            Some data on one Identity that provably came from another Identity.
          </div>
        </div>
      )
    }

    if (this.state.activeType === 'ClaimHolder') {
      var identity = this.props.identities.find(
        i => i.address === this.state.activeIdentity
      )

      var isOwner = identity.owner === this.props.wallet.activeAddress

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
                    className={`fa fa-${
                      isOwner ? 'unlock' : 'lock text-muted'
                    } ml-3`}
                  />
                </a>
              </li>
              <NavItem
                label="Summary"
                id="summary"
                selected={this.state.mode}
                onClick={mode => this.setState({ mode })}
              />
              <NavItem
                label="Events"
                id="events"
                selected={this.state.mode}
                onClick={mode => this.setState({ mode })}
              />
            </ul>
          </div>
          {this.state.mode === 'summary' ? (
            <div>
              <div className="mono">{`Address: ${identity.address}`}</div>
              <div className="mono">
                &nbsp;&nbsp;{`Owner: ${identity.owner}`}
              </div>
              <Summary
                events={this.props.events}
                response={this.props.eventsResponse}
                names={this.props.identity.names}
                identity={identity}
                isOwner={isOwner}
                onAddKey={() => this.setState({ addKey: true })}
                onRemoveKey={key => this.setState({ removeKey: key })}
                onRemoveClaim={claim => this.setState({ removeClaim: claim })}
                onAddClaim={() => this.setState({ addClaim: true })}
                approveExecution={executionId => {
                  this.setState({ executionId, approve: true })
                }}
              />
              <hr />

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
          ) : (
            <Events
              eventsResponse={this.props.eventsResponse}
              events={this.filterEvents()}
            />
          )}
        </>
      )
    }

    var verifier = this.props.verifiers.find(
      i => i.address === this.state.activeIdentity
    )
    isOwner = verifier.owner === this.props.wallet.activeAddress

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
                {verifier.name}
              </a>
            </li>
            <NavItem
              label="Events"
              id="events"
              selected="events"
              onClick={mode => this.setState({ mode })}
            />
          </ul>
        </div>
        <div>
          <div className="mono">{`Address: ${verifier.address}`}</div>
          <div className="mono">{`Owner: ${verifier.owner}`}</div>
        </div>
        <div className="my-3">
          <button
            className="btn btn-sm btn-outline-primary ml-1"
            onClick={() => this.setState({ checkClaim: true })}
          >
            Run Protected Method
          </button>
        </div>
        <Events
          eventsResponse={this.props.eventsResponse}
          events={this.props.events}
        />
        <hr />

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
      </>
    )
  }

  filterEvents() {
    if (this.state.mode === 'keys') {
      return this.props.events.filter(e => e.event.match(/(KeyAdded)/))
    }
    if (this.state.mode === 'claims') {
      return this.props.events.filter(e => e.event.match(/(ClaimAdded)/))
    }
    return this.props.events
  }

  selectIdentity(address, activeType) {
    this.setState({
      activeIdentity: address,
      activeType
    })
    if (address && activeType) {
      this.props.getEvents(activeType, address)
    }
  }

  rowCls(identity) {
    var cls = ''
    if (this.props.wallet.activeAddress !== identity.owner) {
      cls += 'text-muted '
    }
    if (this.state.activeIdentity === identity.address) {
      if (this.props.wallet.activeAddress === identity.owner) {
        cls += 'table-warning'
      } else {
        cls += 'table-active'
      }
    }
    return cls
  }

  onCertify(e, identity) {
    e.stopPropagation()
    e.preventDefault()

    var href = e.currentTarget.href
      .replace('TARGET', this.state.activeIdentity)
      .replace('ISSUER', identity.address)

    var w = window.open(href, '', 'width=650,height=500')

    const finish = e => {
      if (String(e.data).match(/^signed-data:/)) {
        this.setState({
          addClaim: true,
          claimData: {
            claimType: e.data.split(':')[3],
            claimScheme: '1',
            claimData: '{"username":"abc"}',
            claimUri: 'id.originprotocol.com/user/abc',
            issuer: identity.address,
            targetIdentity: this.state.activeIdentity,
            signature: e.data.split(':')[1],
            messageHash: e.data.split(':')[2]
          }
        })
      } else if (e.data !== 'success') {
        return
      }
      window.removeEventListener('message', finish, false)

      if (!w.closed) {
        w.close()
      }

      this.props.getEvents(this.state.activeType, this.state.activeIdentity)
    }

    window.addEventListener('message', finish, false)
  }
}

const mapStateToProps = state => ({
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
  wallet: state.wallet
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
  removeVerifier: (...args) => dispatch(removeVerifier(...args)),
  selectAccount: hash => dispatch(selectAccount(hash))
})

export default connect(mapStateToProps, mapDispatchToProps)(Identity)

require('react-styl')(`
  .mono
    font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  .circ
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: #2e8af7;
    display: inline-block;
    vertical-align: 1px;
    margin: 0 8px 0 1px
  .row-fa.fa-lock
    margin: 0 9px 0 2px
  .row-fa.fa-unlock
    margin: 0 6px 0 0px
  .fa-unlock
    color: green
`)
