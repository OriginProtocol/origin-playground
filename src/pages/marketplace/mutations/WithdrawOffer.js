import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { Button, Dialog, FormGroup, InputGroup } from '@blueprintjs/core'

import { WithdrawOfferMutation } from '../../../mutations'
import ErrorCallout from './_ErrorCallout'

class WithdrawOffer extends Component {
  state = {
    message: ''
  }

  render() {
    const input = field => ({
      value: this.state[field],
      onChange: e => this.setState({ [field]: e.currentTarget.value })
    })
    return (
      <Mutation
        mutation={WithdrawOfferMutation}
        onCompleted={this.props.onCompleted}
      >
        {(withdrawOffer, { loading, error }) => (
          <Dialog
            title="Withdraw Offer"
            isOpen={this.props.isOpen}
            onClose={this.props.onCompleted}
          >
            <div className="bp3-dialog-body">
              <ErrorCallout error={error} />
              <FormGroup label="Reason">
                <InputGroup {...input('message')} />
              </FormGroup>
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <Button
                  text="Withdraw Offer"
                  intent="primary"
                  loading={loading}
                  onClick={() => withdrawOffer(this.getVars())}
                />
              </div>
            </div>
          </Dialog>
        )}
      </Mutation>
    )
  }

  getVars() {
    return {
      variables: {
        listingID: String(this.props.listingId),
        offerID: String(this.props.offerId),
        from: this.props.offer.buyer.id
      }
    }
  }
}

export default WithdrawOffer
