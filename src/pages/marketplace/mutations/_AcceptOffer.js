import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@blueprintjs/core'
import fragments from '../../../fragments'

import { Dialog, FormGroup, InputGroup, Callout } from '@blueprintjs/core'

const AcceptOfferMutation = gql`
  mutation AcceptOffer($listingID: String!, $offerID: String!, $from: String) {
    acceptOffer(listingID: $listingID, offerID: $offerID, from: $from) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

class AcceptOffer extends Component {
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
        mutation={AcceptOfferMutation}
        update={this.onUpdate}
        onCompleted={this.props.onCompleted}
      >
        {(acceptOffer, { loading, error }) => (
          <Dialog
            title="Accept Offer"
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
                  text="Accept Offer"
                  intent="primary"
                  loading={loading}
                  onClick={() => acceptOffer(this.getVars())}
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
        from: this.props.listing.seller.id
      }
    }
  }
}

export default AcceptOffer
