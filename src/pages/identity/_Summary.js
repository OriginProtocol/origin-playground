import React, { Component } from 'react'

import decodeFn from 'utils/decodeFn'
import ClaimHolder from '../../contracts/ClaimHolder'

import Loading from 'components/Loading'
import ValidateClaim from './_ValidateClaim'

import ClaimDetail from './modals/ClaimDetail'
import KeyDetail from './modals/KeyDetail'

import { claimType, keyPurpose, keyType } from 'actions/Identity'

class IdentitySummary extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div className="mt-3 position-relative">
        <Loading show={this.props.response === null} />
        {this.renderKeys()}
        {this.renderClaims()}
        {this.renderServices()}
      </div>
    )
  }

  renderKeys() {
    var keys = this.props.events.filter(
      e =>
        e.event === 'KeyAdded' &&
        !this.props.events.find(
          ex =>
            ex.event === 'KeyRemoved' &&
            ex.returnValues.key === e.returnValues.key
        )
    )

    return (
      <>
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th>
                Keys{this.props.isOwner && (
                  <a
                    href="#"
                    className="ml-2"
                    onClick={e => {
                      e.preventDefault()
                      this.props.onAddKey()
                    }}
                  >
                    <i className="fa fa-plus" />
                  </a>
                )}
              </th>
              <th>Purpose</th>
              <th>Type</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {keys.length ? null : (
              <tr>
                <td colSpan={4}>No Keys</td>
              </tr>
            )}
            {keys.map((key, idx) => (
              <tr
                className="pointer"
                key={idx}
                onClick={() => {
                  this.setState({ keyDetail: key.returnValues.key })
                }}
              >
                <td>{`${key.returnValues.key.substr(0, 8)}...`}</td>
                <td>{keyPurpose(key.returnValues.purpose)}</td>
                <td>{keyType(key.returnValues.keyType)}</td>
                <td className="text-right">
                  {this.props.isOwner && (
                    <a
                      href="#"
                      className="btn btn-sm btn-outline-danger"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        this.props.onRemoveKey(key.returnValues.key)
                      }}
                    >
                      <i className="fa fa-trash" />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!this.state.claimDetail ? null : (
          <ClaimDetail
            claimId={this.state.claimDetail}
            identity={this.props.identity}
            onClose={() => this.setState({ claimDetail: false })}
          />
        )}
        {!this.state.keyDetail ? null : (
          <KeyDetail
            keyId={this.state.keyDetail}
            identity={this.props.identity}
            onClose={() => this.setState({ keyDetail: false })}
          />
        )}
      </>
    )
  }

  renderClaims() {
    var claims = [],
      executionReqs = []

    this.props.events.forEach(e => {
      if (e.event === 'ClaimAdded') {
        claims.push(e)
      }
      if (e.event === 'ClaimRemoved') {
        claims = claims.filter(
          c => c.returnValues.claimId !== e.returnValues.claimId
        )
      }
      if (e.event === 'ExecutionRequested') {
        executionReqs.push(e)
      }
      if (e.event === 'Executed') {
        executionReqs = executionReqs.filter(
          c => c.returnValues.executionId !== e.returnValues.executionId
        )
      }
    })

    if (!claims.length && !executionReqs.length) {
      if (!this.props.isOwner) {
        return null
      }
      return (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => this.props.onAddClaim()}
        >
          <i className="fa fa-plus" /> Add Claim
        </button>
      )
    }

    return (
      <table className="table table-sm table-hover">
        <thead>
          <tr>
            <th>
              Claims{this.props.isOwner && (
                <a
                  href="#"
                  className="ml-2"
                  onClick={e => {
                    e.preventDefault()
                    this.props.onAddClaim()
                  }}
                >
                  <i className="fa fa-plus" />
                </a>
              )}
            </th>
            <th>Data</th>
            <th>Issuer</th>
            <th className="text-center">Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {claims.length || executionReqs.length ? null : (
            <tr>
              <td colSpan={4}>
                <i className="text-muted">No Claims</i>
              </td>
            </tr>
          )}
          {claims.map((claim, idx) => (
            <tr
              className="pointer"
              key={`c-${claim.returnValues.claimId}-${idx}`}
              onClick={() => {
                this.setState({ claimDetail: claim.returnValues.claimId })
              }}
            >
              <td>{claimType(claim.returnValues.claimType)} </td>
              <td>
                {web3.utils.hexToAscii(claim.returnValues.data).substr(0, 15)}
                {web3.utils.hexToAscii(claim.returnValues.data).length > 15
                  ? '...'
                  : ''}
              </td>
              <td>
                {claim.returnValues.issuer === this.props.identity.address ? (
                  <i>Self-claim</i>
                ) : (
                  this.props.names[claim.returnValues.issuer] ||
                  String(claim.returnValues.issuer).substr(0, 8)
                )}
              </td>
              <td className="text-center">
                <ValidateClaim
                  claim={claim.returnValues}
                  subject={this.props.identity.address}
                />
              </td>
              <td className="text-right">
                {this.props.isOwner && (
                  <a
                    href="#"
                    className="btn btn-sm btn-outline-danger"
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      this.props.onRemoveClaim(claim.returnValues.claimId)
                    }}
                  >
                    <i className="fa fa-trash" />
                  </a>
                )}
              </td>
            </tr>
          ))}
          {executionReqs.map((exec, idx) => {
            var decoded = decodeFn(ClaimHolder, exec.returnValues.data)
            return (
              <tr
                key={`e-${idx}`}
                className={
                  this.props.isOwner ? 'table-warning' : 'table-secondary'
                }
              >
                <td>{claimType(decoded.params._claimType)}</td>
                <td>{web3.utils.hexToAscii(decoded.params._data)}</td>
                <td>
                  {this.props.names[decoded.params._issuer] ||
                    decoded.params._issuer.substr(0, 8)}
                </td>
                <td className="text-center">
                  {this.props.isOwner ? (
                    <a
                      className="font-weight-bold"
                      href="#"
                      onClick={e => {
                        e.preventDefault()
                        this.props.approveExecution(
                          exec.returnValues.executionId
                        )
                      }}
                    >
                      Approve
                    </a>
                  ) : (
                    <span>Un-Approved</span>
                  )}
                </td>
                <td />
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  renderServices() {
    const { signerServices } = this.props.identity
    if (!signerServices || !signerServices.length) {
      return null
    }

    return (
      <table className="table table-sm table-hover">
        <thead>
          <tr>
            <th>Claim Signer Services</th>
            <th>Icon</th>
            <th>Claim Type</th>
          </tr>
        </thead>
        <tbody>
          {signerServices.map((ss, idx) => (
            <tr key={idx}>
              <td className="wb">{ss.uri}</td>
              <td className="text-center">
                <i className={`fa fa-${ss.icon}`} />
              </td>
              <td className="no-wrap">{claimType(ss.claimType)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default IdentitySummary
