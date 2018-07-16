import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'
import BtnGroup from 'components/BtnGroup'

class FinalizeOffer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      review: '',
      rating: '3'
    }
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
        <div className="font-weight-bold mb-2">Finalize Offer:</div>
        <table className="w-100">
          <tbody>
            <FormRow label="Rating">
              <BtnGroup
                buttons={['1', '2', '3', '4', '5']}
                active={this.state.rating}
                onClick={rating => this.setState({ rating })}
              />
            </FormRow>
            <FormRow label="Review">
              <input
                className="form-control"
                type="text"
                value={this.state.review}
                onChange={e => this.setState({ review: e.currentTarget.value })}
              />
            </FormRow>
          </tbody>
        </table>
        <div className="text-right">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.acceptOffer({
                review: this.state.review,
                rating: this.state.rating
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

export default FinalizeOffer
