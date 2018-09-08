import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@blueprintjs/core'
import fragments from '../../../fragments'

import {
  Dialog,
  FormGroup,
  InputGroup,
  ControlGroup,
  HTMLSelect,
  Slider,
  Callout
} from '@blueprintjs/core'

import query from '../queries/_listings'

const CreateListingMutation = gql`
  mutation CreateListing(
    $deposit: String
    $arbitrator: String
    $from: String
    $data: NewListingInput
  ) {
    createListing(deposit: $deposit, arbitrator: $arbitrator, from: $from, data: $data) {
      ...basicListingFields
    }
  }
  ${fragments.Listing.basic}
`

class CreateListing extends Component {

  constructor(props) {
    super()
    this.state = {
      title: 'Cool Bike',
      currencyId: 'DAI',
      price: '100',
      arbitrator: props.arbitrator ? props.arbitrator.id : '',
      from: props.seller ? props.seller.id : '',
      deposit: 0,
      category: 'For Sale'
    }
  }

  render() {
    const input = field => ({
      value: this.state[field],
      onChange: e => this.setState({ [field]: e.currentTarget.value })
    })
    return (
      <Mutation
        mutation={CreateListingMutation}
        update={this.onUpdate}
        onCompleted={this.props.onCompleted}
      >
        {(createListing, { loading, error }) => (
          <Dialog
            title="Create Listing"
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
                  <FormGroup label="Category">
                    <HTMLSelect
                      fill={true}
                      {...input('category')}
                      options={[
                        'For Sale',
                        'Home Share',
                        'Car Share',
                        'Ticket'
                      ]}
                    />
                  </FormGroup>
                </div>
                <div style={{ flex: 2 }}>
                  <FormGroup label="Title">
                    <InputGroup {...input('title')} />
                  </FormGroup>
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Price">
                    <ControlGroup fill={true}>
                      <InputGroup {...input('price')} />
                      <HTMLSelect
                        style={{ minWidth: 65 }}
                        {...input('currencyId')}
                        options={['DAI', 'ETH', 'OGN']}
                      />
                    </ControlGroup>
                  </FormGroup>
                </div>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Arbitrator">
                    <HTMLSelect
                      fill={true}
                      {...input('arbitrator')}
                      options={[
                        { label: 'Origin', value: web3.eth.defaultAccount }
                      ]}
                    />
                  </FormGroup>
                </div>
                <div style={{ flex: 1, padding: '0 5px' }}>
                  <FormGroup label="Deposit" labelInfo="(OGN)">
                    <Slider
                      fill={true}
                      min={0}
                      max={10}
                      stepSize={1}
                      onChange={deposit => this.setState({ deposit })}
                      value={this.state.deposit}
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <Button
                  text="Create Listing"
                  intent="primary"
                  loading={loading}
                  onClick={() => createListing(this.getVars())}
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
        deposit: String(this.state.deposit),
        arbitrator: this.state.arbitrator,
        from: this.state.from,
        data: {
          title: this.state.title,
          price: this.state.price,
          currencyId: this.state.currencyId,
          category: this.state.category
        }
      }
    }
  }

  onUpdate(cache, { data }) {
    const res = cache.readQuery({ query })
    cache.writeQuery({
      query,
      data: {
        marketplace: {
          ...res.marketplace,
          allListings: [data.createListing, ...res.marketplace.allListings]
        }
      }
    })
  }
}

export default CreateListing
