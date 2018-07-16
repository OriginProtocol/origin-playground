import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class NewParty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      privateKey: '',
      publicKey: '',
      pgpPass: ''
    }
  }

  render() {
    return (
      <Modal
        style={{ maxWidth: 425 }}
        className="p-3"
        shouldClose={this.state.shouldClose}
        submitted={this.state.submitted}
        onClose={() => this.props.onClose()}
      >
        <Loading show={this.state.loading} />
        <div className="font-weight-bold mb-2">Add a New Party:</div>
        <table className="w-100">
          <tbody>
            <FormRow label="Name">
              <input
                className="form-control"
                type="text"
                value={this.state.name}
                onChange={e => this.setState({ name: e.currentTarget.value })}
              />
            </FormRow>
            <FormRow label="Address">
              <input
                className="form-control"
                type="text"
                value={this.state.address}
                onChange={e =>
                  this.setState({ address: e.currentTarget.value })
                }
              />
            </FormRow>
            <tr>
              <td colSpan={2}>
                <hr className="mt-2 mb-3" />
              </td>
            </tr>
            <FormRow label="PGP Pass">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.pgpPass}
                  onChange={e =>
                    this.setState({ pgpPass: e.currentTarget.value })
                  }
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={async () => {
                      var key = await openpgp.generateKey({
                        userIds: [
                          { name: this.state.name, email: 'buyer@example.com' }
                        ],
                        curve: 'ed25519',
                        passphrase: this.state.pgpPass
                      })
                      this.setState({
                        privateKey: key.privateKeyArmored.replace(/\r\n\r\n/g, "\r\n"),
                        publicKey: key.publicKeyArmored.replace(/\r\n\r\n/g, "\r\n")
                      })
                    }}
                  >
                    <i className="fa fa-refresh" />
                  </button>
                </div>
              </div>
            </FormRow>
            <FormRow label="PGP Priv">
              <textarea
                className="form-control"
                placeholder="-----BEGIN PGP PRIVATE KEY BLOCK-----"
                value={this.state.privateKey}
                style={{ fontSize: '0.8rem' }}
                onChange={e =>
                  this.setState({ privateKey: e.currentTarget.value })
                }
              />
            </FormRow>
            <FormRow label="PGP Pub">
              <textarea
                className="form-control"
                value={this.state.publicKey}
                placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----"
                style={{ fontSize: '0.8rem' }}
                onChange={e =>
                  this.setState({ publicKey: e.currentTarget.value })
                }
              />
            </FormRow>
          </tbody>
        </table>
        <div className="text-right">
          <button
            className="btn btn-primary"
            onClick={() => {
              var obj = {
                name: this.state.name,
                address: this.state.address,
                privateKey: this.state.privateKey,
                publicKey: this.state.publicKey,
                pgpPass: this.state.pgpPass
              }
              this.props.addParty(obj)
            }}
          >
            Create
          </button>
        </div>
      </Modal>
    )
  }
}

export default NewParty
