import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Button } from '@blueprintjs/core'
import { DateInput } from '@blueprintjs/datetime'

import {
  Dialog,
  FormGroup,
  InputGroup,
  HTMLSelect,
  Tag
} from '@blueprintjs/core'

import rnd from 'utils/rnd'
import withAccounts from '../hoc/withAccounts'
import { MakeOfferMutation } from '../../../mutations'
import ErrorCallout from 'components/ErrorCallout'

const jsDateFormatter = {
  formatDate: date => date.toLocaleDateString(),
  parseDate: str => new Date(str),
  placeholder: 'M/D/YYYY'
}

class MakeOffer extends Component {
  constructor(props) {
    super()

    const buyer = rnd(props.accounts.filter(a => a.role === 'Buyer'))
    const arbitrator = rnd(props.accounts.filter(a => a.role === 'Arbitrator'))
    const affiliate = rnd(props.accounts.filter(a => a.role === 'Affiliate'))

    this.state = {
      finalizes: new Date(+new Date() + 1000 * 60 * 60 * 24 * 3),
      affiliate: affiliate
        ? affiliate.id
        : '0x0000000000000000000000000000000000000000',
      commission: '2',
      value: '0.1',
      currency: '0x0000000000000000000000000000000000000000',
      arbitrator: arbitrator ? arbitrator.id : '',
      from: buyer ? buyer.id : ''
    }
  }

  render() {
    const input = field => ({
      value: this.state[field],
      onChange: e => this.setState({ [field]: e.currentTarget.value })
    })
    const title = this.props.offer ? 'Update Offer' : 'Make Offer'
    return (
      <Mutation
        mutation={MakeOfferMutation}
        onCompleted={this.props.onCompleted}
        refetchQueries={['AllAccounts', 'Listing']}
      >
        {(makeOffer, { loading, error }) => (
          <Dialog
            title={title}
            isOpen={this.props.isOpen}
            onClose={this.props.onCompleted}
          >
            <div className="bp3-dialog-body">
              <ErrorCallout error={error} />
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Buyer">
                    <HTMLSelect
                      fill={true}
                      {...input('from')}
                      options={this.props.accounts
                        .filter(a => a.role === 'Buyer')
                        .map(a => ({
                          label: `${(a.name || a.id).substr(0, 24)}`,
                          value: a.id
                        }))}
                    />
                  </FormGroup>
                </div>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Amount">
                    <InputGroup
                      {...input('value')}
                      rightElement={<Tag minimal={true}>ETH</Tag>}
                    />
                  </FormGroup>
                </div>
                <div style={{ flex: 1 }}>
                  <FormGroup label="Finalizes">
                    <DateInput
                      value={this.state.finalizes}
                      onChange={finalizes => this.setState({ finalizes })}
                      {...jsDateFormatter}
                      minDate={new Date()}
                      maxDate={new Date(2023, 0)}
                      timePrecision="minute"
                      timePickerProps={{
                        useAmPm: true,
                        value: this.state.finalizes,
                        onChange: finalizes => this.setState({ finalizes })
                      }}
                    />
                  </FormGroup>
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Affiliate">
                    <HTMLSelect
                      fill={true}
                      {...input('affiliate')}
                      options={this.props.accounts
                        .filter(a => a.role === 'Affiliate')
                        .map(a => ({
                          label: `${(a.name || a.id).substr(0, 24)}`,
                          value: a.id
                        }))}
                    />
                  </FormGroup>
                </div>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Commission">
                    <InputGroup
                      {...input('commission')}
                      rightElement={<Tag minimal={true}>OGN</Tag>}
                    />
                  </FormGroup>
                </div>
                <div style={{ flex: 1 }}>
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
              </div>
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <Button
                  text={title}
                  intent="primary"
                  loading={loading}
                  onClick={() => makeOffer(this.getVars())}
                />
              </div>
            </div>
          </Dialog>
        )}
      </Mutation>
    )
  }

  getVars() {
    const variables = {
      listingID: String(this.props.listing.id),
      from: this.state.from,
      finalizes: String(Math.floor(Number(this.state.finalizes) / 1000)),
      affiliate: this.state.affiliate,
      commission: this.state.commission,
      value: web3.utils.toWei(this.state.value, 'ether'),
      currency: '0x0000000000000000000000000000000000000000',
      arbitrator: this.state.arbitrator
    }
    if (this.props.offer) {
      variables.withdraw = String(this.props.offer.id)
    }
    return { variables }
  }
}

export default withAccounts(MakeOffer, 'marketplace')
