import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Button } from '@blueprintjs/core'

import {
  Dialog,
  FormGroup,
  InputGroup,
  ControlGroup,
  HTMLSelect,
  Slider
} from '@blueprintjs/core'

import rnd from 'utils/rnd'
import withAccounts from '../hoc/withAccounts'

import { UpdateListingMutation } from '../../../mutations'
import ErrorCallout from './_ErrorCallout'

function showOGN(account) {
  if (!account.ogn) return ''
  return ` (${account.ogn.balance} OGN available, ${
    account.ogn.allowance
  } allowed)`
}

class UpdateListing extends Component {
  constructor(props) {
    super()

    const seller = rnd(props.accounts.filter(a => a.role === 'Seller'))

    this.state = {
      title: props.listing.ipfs.title || '',
      currencyId: props.listing.ipfs.currencyId || 'ETH',
      price: props.listing.ipfs.price || '0.1',
      from: seller ? seller.id : '',
      additionalDeposit: 0,
      category: props.listing.ipfs.category || 'For Sale'
    }
  }

  render() {
    const input = field => ({
      value: this.state[field],
      onChange: e => this.setState({ [field]: e.currentTarget.value })
    })
    return (
      <Mutation
        mutation={UpdateListingMutation}
        onCompleted={this.props.onCompleted}
        refetchQueries={[
          'AllAccounts',
          'AccountsWithAllowance',
          'AllListings',
          'Listing'
        ]}
      >
        {(updateListing, { loading, error }) => (
          <Dialog
            title="Update Listing"
            isOpen={this.props.isOpen}
            onClose={this.props.onCompleted}
          >
            <div className="bp3-dialog-body">
              <ErrorCallout error={error} />
              <FormGroup label="Seller">
                <HTMLSelect
                  {...input('from')}
                  options={this.props.accounts
                    .filter(a => a.role === 'Seller')
                    .map(a => ({
                      label: `${(a.name || a.id).substr(0, 24)} ${showOGN(a)}`,
                      value: a.id
                    }))}
                />
              </FormGroup>
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
                <div style={{ flex: 1, padding: '0 5px' }}>
                  <FormGroup label="Additional Deposit" labelInfo="(OGN)">
                    <Slider
                      fill={true}
                      min={0}
                      max={100}
                      stepSize={5}
                      labelStepSize={25}
                      onChange={additionalDeposit =>
                        this.setState({ additionalDeposit })
                      }
                      value={this.state.additionalDeposit}
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div
              className="bp3-dialog-footer"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                text="Update Listing"
                intent="primary"
                loading={loading}
                onClick={() => updateListing(this.getVars())}
              />
            </div>
          </Dialog>
        )}
      </Mutation>
    )
  }

  getVars() {
    return {
      variables: {
        listingID: String(this.props.listing.id),
        additionalDeposit: String(this.state.additionalDeposit),
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
}

export default withAccounts(UpdateListing, 'marketplace')
