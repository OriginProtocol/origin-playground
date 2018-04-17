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
        {this.renderOfferedClaims()}
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
            <th>Issuer</th>
            <th className="text-center">Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {claims.length || executionReqs.length ? null : (
            <tr>
              <td colSpan={4}>No Claims</td>
            </tr>
          )}
          {claims.map((claim, idx) => (
            <tr
              className="pointer"
              key={`c-${idx}`}
              onClick={() => {
                this.setState({ claimDetail: claim.returnValues.claimId })
              }}
            >
              <td>{claimType(claim.returnValues.claimType)} </td>
              <td>
                {this.props.names[claim.returnValues.issuer] ||
                  String(claim.returnValues.issuer).substr(0, 8)}
                {claim.returnValues.issuer === this.props.identity.address
                  ? ' (self-claim)'
                  : ''}
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

  renderOfferedClaims() {
    const { certifiers, identity } = this.props
    if (!certifiers || !certifiers.length) {
      return null
    }
    if (!identity || identity.type !== 'identity') {
      return null
    }

    return (
      <table className="table table-sm mt-3">
        <thead>
          <tr>
            <th>Claim Issuer</th>
            <th>Signer Services</th>
          </tr>
        </thead>
        <tbody>
          {(certifiers || []).map((c, idx) => (
            <tr key={idx}>
              <td>{c.name}</td>
              <td>
                {(c.signerServices || []).map((s, sidx) => (
                  <a
                    key={sidx}
                    className="btn btn-sm btn-outline-secondary mr-1"
                    href={s.uri}
                    onClick={e => this.onCertify(e, c)}
                  >
                    <i className={`fa fa-${s.icon}`} />
                  </a>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  onCertify(e, identity) {
    e.stopPropagation()
    e.preventDefault()

    var href = `${e.currentTarget.href}?target=${
      this.props.identity.address
    }&issuer=${identity.address}`

    var w = window.open(href, '', 'width=650,height=500')

    const finish = e => {
      if (String(e.data).match(/^signed-data:/)) {
        this.props.onAddClaim({
          claimType: e.data.split(':')[3],
          claimScheme: '1',
          claimData: 'Verified OK',
          claimUri: '',
          issuer: identity.address,
          targetIdentity: this.props.identity.address,
          signature: e.data.split(':')[1]
        })
      } else if (e.data !== 'success') {
        return
      }
      window.removeEventListener('message', finish, false)

      if (!w.closed) {
        w.close()
      }
    }

    window.addEventListener('message', finish, false)
  }
}

export default IdentitySummary
