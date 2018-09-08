import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@blueprintjs/core'
import fragments from '../../../fragments'

import { Dialog, FormGroup, InputGroup, Callout } from '@blueprintjs/core'

const WithdrawOfferMutation = gql`
  mutation WithdrawOffer($listingID: String, $offerID: String) {
    withdrawOffer(listingID: $listingID, offerID: $offerID) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

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
        update={this.onUpdate}
        onCompleted={this.props.onCompleted}
      >
        {(withdrawOffer, { loading, error }) => (
          <Dialog
            title="Withdraw Offer"
            isOpen={this.props.isOpen}
            onClose={this.props.onCompleted}
          >
            <div className="bp3-dialog-body">{error && (
              <Callout
                style={{ marginBottom: 15 }}
                intent="danger"
                icon="error"
              >
                {error.toString()}
              </Callout>
            )}
              <FormGroup label="Message to Buyer">
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
        listingID: this.props.listingId,
        offerID: String(this.props.offerId)
      }
    }
  }
}

export default WithdrawOffer
