import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class AddData extends Component {
  constructor(props) {
    super(props)
    this.state = { data: '' }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.dataInput) {
        this.dataInput.focus()
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
        <div className="font-weight-bold mb-2">Add Data:</div>

        <table className="w-100">
          <tbody>
            <FormRow label="Data">
              <textarea
                className="form-control"
                ref={ref => (this.dataInput = ref)}
                type="text"
                value={this.state.data}
                onChange={e => this.setState({ data: e.currentTarget.value })}
              />
            </FormRow>
          </tbody>
        </table>
        <div className="text-right">
          <button
            className="btn btn-primary"
            onClick={() => this.props.addData(this.state)}
          >
            Add Data
          </button>
        </div>
      </Modal>
    )
  }
}

export default AddData
