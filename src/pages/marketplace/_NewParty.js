import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class NewParty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: ''
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
                onChange={e => this.setState({ address: e.currentTarget.value })}
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
                address: this.state.address
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
