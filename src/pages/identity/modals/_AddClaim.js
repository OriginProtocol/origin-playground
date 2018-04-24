import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

import { ClaimTypes, Schemes } from 'actions/Identity'

class AddClaim extends Component {
  constructor(props) {
    super(props)
    var identity = props.identity
    var state = props.claimData || {
      claimType: '10',
      claimScheme: '1',
      claimData: '',
      claimUri: '',
      issuer: props.issuer || (identity && identity.address),
      targetIdentity: identity ? identity.address : props.identities[0].address,
      signature: ''
    }
    state.mode = ''
    this.state = state
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response !== 'success' && nextProps.response === 'success') {
      this.setState({ shouldClose: true, submitted: true })
    }
    if (
      this.props.response !== 'submitted' &&
      nextProps.response === 'submitted'
    ) {
      this.setState({ loading: true })
    }
    if (this.props.response !== 'error' && nextProps.response === 'error') {
      this.setState({ error: true })
    }
  }

  render() {
    const modalProps = {
      style: { maxWidth: 375 },
      className: 'p-3',
      shouldClose: this.state.shouldClose,
      submitted: this.state.submitted,
      onClose: () => this.props.onClose()
    }

    if (!this.state.mode) {
      return (
        <Modal {...modalProps}>
          <div className="font-weight-bold mb-2">
            Add a Claim to an Identity:
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-outline-primary mb-2"
              onClick={() => this.setState({ mode: 'issuer' })}
            >
              Get Claim from Issuer
            </button>
            <button
              className="btn btn-outline-primary mb-2"
              onClick={() => this.setState({ mode: 'self' })}
            >
              Add Self-Claim
            </button>
            <button
              className="btn btn-outline-primary mb-2"
              onClick={() => this.setState({ mode: 'other' })}
            >
              Add Claim to another Identity
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => this.setState({ mode: 'manual' })}
            >
              Add Claim Manually
            </button>
          </div>
        </Modal>
      )
    }

    if (this.state.mode === 'issuer') {
      return (
        <Modal {...modalProps}>
          <div className="font-weight-bold mb-2">
            Add a Claim from an Issuer:
          </div>
          {this.renderOfferedClaims()}
        </Modal>
      )
    }

    return (
      <Modal {...modalProps} onPressEnter={() => this.onAddClaim()}>
        <Loading show={this.state.loading} />
        <div className="font-weight-bold mb-2">Add a Claim to an Identity:</div>
        <table className="w-100">
          <tbody>
            {this.state.mode.match(/^(self)$/) ? null : (
              <FormRow label="Target">
                <select
                  className="form-control"
                  value={this.state.targetIdentity}
                  onChange={e => {
                    this.setState({
                      targetIdentity: e.currentTarget.value
                    })
                  }}
                >
                  {this.props.identities.map((identity, idx) => (
                    <option key={idx} value={identity.address}>
                      {identity.name}
                    </option>
                  ))}
                </select>
              </FormRow>
            )}
            {this.state.mode.match(/^(self|other)$/) ? null : (
              <FormRow label="Issuer">
                <select
                  className="form-control"
                  value={this.state.issuer}
                  onChange={e => {
                    this.setState({
                      issuer: e.currentTarget.value
                    })
                  }}
                >
                  {this.props.identities.map((identity, idx) => (
                    <option key={idx} value={identity.address}>
                      {identity.name}
                    </option>
                  ))}
                </select>
              </FormRow>
            )}
            <FormRow label="Claim Type">
              <select
                className="form-control"
                value={this.state.claimType}
                onChange={e => {
                  this.setState({
                    claimType: e.currentTarget.value
                  })
                }}
              >
                {ClaimTypes.map(ct => (
                  <option key={ct.id} value={ct.id}>
                    {ct.value}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Scheme">
              <select
                className="form-control"
                value={this.state.claimScheme}
                onChange={e => {
                  this.setState({
                    claimScheme: e.currentTarget.value
                  })
                }}
              >
                {Schemes.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.value}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Data">
              <input
                className="form-control"
                type="text"
                value={this.state.claimData}
                onChange={e =>
                  this.setState({ claimData: e.currentTarget.value })
                }
              />
            </FormRow>
            <FormRow label="URI">
              <input
                className="form-control"
                type="text"
                value={this.state.claimUri}
                onChange={e =>
                  this.setState({ claimUri: e.currentTarget.value })
                }
              />
            </FormRow>
            {this.state.mode.match(/^(self|other)$/) ? null : (
              <FormRow label="Signature">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.signature}
                  onChange={e =>
                    this.setState({ signature: e.currentTarget.value })
                  }
                />
              </FormRow>
            )}
          </tbody>
        </table>
        <div className="text-right mt-2">
          <button className="btn btn-primary" onClick={() => this.onAddClaim()}>
            Add Claim
          </button>
        </div>
      </Modal>
    )
  }

  onAddClaim() {
    this.props.addClaim({
      data: this.state.claimData,
      prvSigner: this.state.privateKey,
      claimIssuer: this.state.issuer,
      targetIdentity: this.state.targetIdentity,
      uri: this.state.claimUri,
      claimType: this.state.claimType,
      scheme: this.state.claimScheme,
      signature: this.state.signature,
      refresh: this.props.identity && (this.props.identity.address === this.state.targetIdentity)
    })
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
      <table className="table mt-1">
        <thead>
          <tr>
            <th>Issuer</th>
            <th>Offered Claims</th>
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
                    className="btn btn-outline-secondary mr-1"
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
        this.setState({
          claimType: e.data.split(':')[3],
          claimScheme: '1',
          claimData: 'Verified OK',
          claimUri: '',
          issuer: identity.address,
          targetIdentity: this.props.identity.address,
          signature: e.data.split(':')[1],
          mode: 'manual'
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

export default AddClaim
