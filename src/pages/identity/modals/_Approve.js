import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'

class NewIdentity extends Component {
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
        className="p-3"
        shouldClose={this.state.shouldClose}
        submitted={this.state.submitted}
        onClose={() => this.props.onClose()}
      >
        <Loading show={this.state.loading} />
        <div className="mb-3">Are you sure?</div>
        <div className="text-right">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.approveExecution(
                this.props.identity,
                this.props.executionId
              )
            }}
          >
            Approve
          </button>
        </div>
      </Modal>
    )
  }
}

export default NewIdentity
