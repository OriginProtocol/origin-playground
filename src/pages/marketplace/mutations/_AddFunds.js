import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@blueprintjs/core'
import fragments from '../../../fragments'

import { Dialog, FormGroup, InputGroup, Callout, Tag } from '@blueprintjs/core'

const AddFundsMutation = gql`
  mutation AddFunds($listingID: String!, $offerID: String!, $amount: String!, $from: String) {
    addFunds(listingID: $listingID, offerID: $offerID, amount: $amount, from: $from) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

class AddFunds extends Component {
  state = {
    amount: '0.1',
    reason: ''
  }

  render() {
    const input = field => ({
      value: this.state[field],
      onChange: e => this.setState({ [field]: e.currentTarget.value })
    })
    return (
      <Mutation
        mutation={AddFundsMutation}
        onCompleted={this.props.onCompleted}
      >
        {(addFunds, { loading, error }) => (
          <Dialog
            title="Add Funds"
            isOpen={this.props.isOpen}
            onClose={this.props.onCompleted}
          >
            <div className="bp3-dialog-body">
              {error && (
                <Callout
                  style={{ marginBottom: 15 }}
                  intent="danger"
                  icon="error"
                >
                  {error.toString()}
                </Callout>
              )}
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Amount">
                    <InputGroup
                      {...input('amount')}
                      rightElement={<Tag minimal={true}>ETH</Tag>}
                    />
                  </FormGroup>
                </div>
                <div style={{ flex: 2 }}>
                  <FormGroup label="Reason">
                    <InputGroup {...input('reason')} />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <Button
                  text="Add Funds"
                  intent="primary"
                  loading={loading}
                  onClick={() => addFunds(this.getVars())}
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
        from: this.props.offer.buyer.id,
        amount: web3.utils.toWei(this.state.amount, 'ether')
      }
    }
  }
}

export default AddFunds
