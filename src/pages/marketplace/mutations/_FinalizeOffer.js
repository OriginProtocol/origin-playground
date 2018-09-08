import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@blueprintjs/core'
import fragments from '../../../fragments'

import { Dialog, FormGroup, InputGroup } from '@blueprintjs/core'

const FinalizeOfferMutation = gql`
  mutation FinalizeOffer($listingID: String, $offerID: String) {
    finalizeOffer(listingID: $listingID, offerID: $offerID) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

class FinalizeOffer extends Component {
  state = {
    review: ''
  }

  render() {
    const input = field => ({
      value: this.state[field],
      onChange: e => this.setState({ [field]: e.currentTarget.value })
    })
    return (
      <Mutation
        mutation={FinalizeOfferMutation}
        update={this.onUpdate}
        onCompleted={this.props.onCompleted}
      >
        {(finalizeOffer, { loading }) => (
          <Dialog
            title="Finalize Offer"
            isOpen={this.props.isOpen}
            onClose={this.props.onCompleted}
          >
            <div className="bp3-dialog-body">
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Review">
                    <InputGroup {...input('review')} />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <Button
                  text="Finalize Offer"
                  intent="primary"
                  loading={loading}
                  onClick={() => finalizeOffer(this.getVars())}
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

export default FinalizeOffer
