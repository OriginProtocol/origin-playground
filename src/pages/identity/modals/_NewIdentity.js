import React, { Component } from 'react'
import RLP from 'rlp'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class NewIdentity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      uri: '',
      address: '',
      preAdd: false,
      icon: null,
      mode: ''
    }
  }

  async componentDidMount() {
    var address = this.props.activeAddress
    if (address) {
      var nonce = await web3.eth.getTransactionCount(address)
      var nextContract =
        '0x' + web3.utils.sha3(RLP.encode([address, nonce])).substring(26, 66)
      this.setState({ nextContract })
    }
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
  }

  render() {
    var { identityType, activeAddress, identities } = this.props
    var otherTypeSameOwner = identities.find(
      i => i.type !== identityType && i.owner === activeAddress
    )

    var modalProps = {
      style: { maxWidth: 425 },
      shouldClose: this.state.shouldClose,
      submitted: this.state.submitted,
      className: 'p-3',
      onClose: () => this.props.onClose()
    }

    if (!this.state.mode) {
      return (
        <Modal {...modalProps}>
          <div className="d-flex flex-column mt-2">
            <button
              className="btn btn-outline-primary mb-2"
              onClick={() => this.setState({ mode: 'create' })}
            >
              Add New Identity
            </button>
            <button
              className="btn btn-outline-primary mb-2"
              onClick={() => this.setState({ mode: 'import' })}
            >
              Import Existing Identity
            </button>
          </div>
        </Modal>
      )
    }

    if (this.state.mode === 'import') {
      return (
        <Modal
          {...modalProps}
          onPressEnter={() => this.onImport()}
        >
          <div className="font-weight-bold mb-3">
            Import an Identity contract:
          </div>
          <table className="w-100">
            <tbody>
              <FormRow label="Name">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  ref={r => (this.nameInput = r)}
                  onChange={e => this.setState({ name: e.currentTarget.value })}
                />
              </FormRow>
              <FormRow label="Address">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={e =>
                    this.setState({ address: e.currentTarget.value })
                  }
                />
              </FormRow>
            </tbody>
          </table>

          <div className="d-flex mt-2 align-items-center">
            <button
              className="btn btn-primary ml-auto"
              onClick={() => this.onImport()}
            >
              Import
            </button>
          </div>
        </Modal>
      )
    }

    return (
      <Modal {...modalProps} onPressEnter={() => this.onDeploy()}>
        <Loading show={this.state.loading} />
        <div className={`font-weight-bold${otherTypeSameOwner ? '' : ' mb-3'}`}>
          Deploy a new Identity contract:
        </div>
        {otherTypeSameOwner && (
          <div className="alert alert-warning py-1 px-2 mt-2">
            {`You may want to use a different wallet`}
          </div>
        )}
        <table className="w-100">
          <tbody>
            <FormRow label="Name">
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                ref={r => (this.nameInput = r)}
                onChange={e => this.setState({ name: e.currentTarget.value })}
              />
            </FormRow>
          </tbody>
        </table>

        <div className="d-flex mt-2 align-items-center">
          {this.state.preSign ? null : (
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                this.setState({ preSign: true })
              }}
            >
              Pre-Sign Claims
            </a>
          )}
          <button
            className="btn btn-primary ml-auto"
            onClick={() => this.onDeploy()}
          >
            Deploy
          </button>
        </div>

        {!this.state.preSign ? null : (
          <table className="table table-sm mt-3">
            <thead>
              <tr>
                <th>Issuer</th>
                <th>Available Claims</th>
              </tr>
            </thead>
            <tbody>
              {(this.props.certifiers || []).map((c, idx) => (
                <tr key={idx}>
                  <td>{c.name}</td>
                  <td>
                    {(c.signerServices || []).map((s, sidx) => (
                      <button
                        key={sidx}
                        className={`btn btn-sm btn-${
                          this.state[`claimData-${c.address}-${s.claimType}`]
                            ? 'success'
                            : 'outline-secondary'
                        } mr-1`}
                        onClick={() => {
                          this.onCertify(c.address, s.claimType, s.uri)
                        }}
                      >
                        <i className={`fa fa-${s.icon}`} />
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Modal>
    )
  }

  onDeploy() {
    var args

    if (this.state.preAdd) {
      var claim

      args = args || [[], [], [], '', '', '', [], [], []]
      Object.keys(this.state).forEach(k => {
        var match = k.match(/^claimData-(.*)$/)
        if (match) {
          claim = this.state[k]
          args[0].push(claim.claimType)
          args[1].push(claim.claimScheme)
          args[2].push(claim.issuer)
          args[3] += args[3].length ? claim.signature.slice(2) : claim.signature
          args[4] += args[4].length ? claim.claimData.slice(2) : claim.claimData
          args[5] += claim.uri
          args[6].push((claim.signature.length - 2) / 2)
          args[7].push((claim.claimData.length - 2) / 2),
            args[8].push(claim.uri.length)
        }
      })
    }

    this.props.deployIdentityContract(
      this.state.name,
      this.props.identityType,
      this.state.uri,
      args,
      this.state.icon
    )
  }

  onCertify(identity, claimType, href) {
    href = `${href}?target=${this.state.nextContract}&issuer=${identity}`

    var w = window.open(href, '', 'width=650,height=500')

    const finish = e => {
      if (String(e.data).match(/^signed-data:/)) {
        this.setState({
          preAdd: true,
          [`claimData-${identity}-${claimType}`]: {
            claimType: e.data.split(':')[3],
            claimScheme: '1',
            claimData: web3.utils.asciiToHex('Verified OK'),
            uri: '',
            issuer: identity,
            signature: e.data.split(':')[1]
          }
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

  onImport() {
    this.props.import(this.state.address, this.state.name)
    this.setState({ shouldClose: true, submitted: true })
  }
}

export default NewIdentity
