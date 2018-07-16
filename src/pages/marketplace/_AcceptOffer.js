import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class AcceptOffer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.messageInput) {
        this.messageInput.focus()
      }
    }, 10)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
    return (
      <Modal
        style={{ maxWidth: 375 }}
        className="p-3"
        shouldClose={this.state.shouldClose}
        submitted={this.state.submitted}
        onClose={() => this.props.onClose()}
      >
        <Loading show={this.state.loading} />
        <div className="font-weight-bold mb-2">Accept Offer:</div>
        <table className="w-100">
          <tbody>
            <FormRow label="Message">
              <input
                className="form-control"
                ref={ref => (this.messageInput = ref)}
                type="text"
                value={this.state.message}
                onChange={e =>
                  this.setState({ message: e.currentTarget.value })
                }
              />
            </FormRow>
          </tbody>
        </table>
        <div className="text-right">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.acceptOffer({
                message: this.state.message
              })
            }}
          >
            Accept
          </button>
        </div>
      </Modal>
    )
  }
}

export default AcceptOffer
