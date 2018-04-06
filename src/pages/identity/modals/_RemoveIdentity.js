import React, { Component } from 'react'

import Modal from 'components/Modal'

class RemoveIdentity extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Modal
        style={{ maxWidth: 375 }}
        onClose={() => this.props.onClose()}
      >
        <div className="p-3">
          <p>Are you sure you wish to remove this identity?</p>
          <div>
            <button
              className="btn btn-danger"
              onClick={() => {
                this.props.removeIdentity()
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default RemoveIdentity
