import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import DataRows from 'components/DataRows'

class TransactionModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      ipfsRaw: JSON.stringify(props.data.ipfs, null, 2)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.response !== 'success' && nextProps.response === 'success') {
      this.setState({ shouldClose: true, submitted: true })
      if (this.props.onSuccess) {
        this.props.onSuccess()
      }
    }
    if (
      this.props.response !== 'submitted' &&
      nextProps.response === 'submitted'
    ) {
      this.setState({ loading: true })
    }
    if (this.props.response !== 'error' && nextProps.response === 'error') {
      this.setState({ error: nextProps.error, loading: false })
    }
  }

  render() {
    return (
      <Modal
        style={{ maxWidth: 375 }}
        className="p-3"
        shouldClose={this.state.shouldClose}
        submitted={this.state.submitted}
        onClose={() => this.props.onClose()}
      >
        <Loading show={this.state.loading} />
        <div className="font-weight-bold mb-2">{this.props.title}</div>
        {!this.state.error ? null : (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
        <table className="w-100">
          <tbody>
            <DataRows
              data={this.state.data}
              rows={this.props.contractRows}
              onChange={(field, value) =>
                this.setState({ data: { ...this.state.data, [field]: value } })
              }
            />
            <tr>
              <td colSpan={2}>
                <hr className="mt-2 mb-3" />
              </td>
            </tr>
            {this.state.showIpfs ? (
              <tr>
                <td colSpan={2}>
                  <textarea
                    className="form-control"
                    style={{ minHeight: 150, fontFamily: 'monospace' }}
                    type="text"
                    value={this.state.ipfsRaw}
                    onChange={e => {
                      const ipfsRaw = e.currentTarget.value
                      try {
                        const ipfs = JSON.parse(ipfsRaw)
                        this.setState({
                          ipfsRaw,
                          data: { ...this.state.data, ipfs },
                          jsonError: false
                        })
                      } catch (e) {
                        this.setState({ ipfsRaw, jsonError: true })
                      }
                    }}
                  />
                </td>
              </tr>
            ) : (
              <DataRows
                data={this.state.data.ipfs}
                rows={this.props.ipfsRows}
                onChange={(...args) => this.updateIpfs(...args)}
              />
            )}
          </tbody>
        </table>
        <div className="d-flex align-items-baseline mt-2">
          <label className="mr-auto">
            {this.state.jsonError ? (
              <span className="text-danger">JSON Error</span>
            ) : (
              <>
                <input
                  checked={this.state.showIpfs ? true : false}
                  onChange={e =>
                    this.setState({ showIpfs: e.currentTarget.checked })
                  }
                  className="mr-2"
                  type="checkbox"
                />Show IPFS JSON
              </>
            )}
          </label>
          <button
            className={`btn btn-primary${
              this.state.jsonError ? ' disabled' : ''
            }`}
            onClick={() => {
              if (this.state.jsonError) {
                return
              }
              this.props.onExecute(this.state.data)
            }}
          >
            {this.props.executeText}
          </button>
        </div>
      </Modal>
    )
  }

  updateIpfs(field, value) {
    const ipfs = { ...this.state.data.ipfs, [field]: value }
    this.setState({
      data: { ...this.state.data, ipfs },
      ipfsRaw: JSON.stringify(ipfs, null, 2)
    })
  }
}

export default TransactionModal
