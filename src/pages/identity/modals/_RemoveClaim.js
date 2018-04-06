import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'

class RemoveClaim extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response !== 'success' && nextProps.response === 'success') {
      this.setState({ shouldClose: true, submitted: true })
    }
    if (this.props.response !== 'submitted' && nextProps.response === 'submitted') {
      this.setState({ loading: true })
    }
    if (this.props.response !== 'error' && nextProps.response === 'error') {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <Modal
        style={{ maxWidth: 375 }}
        shouldClose={this.state.shouldClose}
        submitted={this.state.submitted}
        onClose={() => this.props.onClose()}
      >
        <Loading show={this.state.loading} />

        <div className="p-3">
          <div className="mb-3">Are you sure?</div>
          {this.props.wrongOwner && (
            <div className="alert alert-warning py-1 px-2 mt-2">
              {`Active wallet does not own this identity`}
            </div>
          )}
          {this.state.error && (
            <div className="alert alert-danger py-1 px-2 mt-2">Error! Please try again.</div>
          )}
          <div className="text-right">
            <button
              className="btn btn-danger"
              onClick={() => {
                this.props.removeClaim()
              }}
            >
              Remove Claim
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default RemoveClaim
