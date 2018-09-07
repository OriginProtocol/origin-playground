import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@blueprintjs/core'
import { DateInput } from '@blueprintjs/datetime'
import fragments from '../../fragments'

import {
  Dialog,
  FormGroup,
  InputGroup,
  HTMLSelect,
  Tag
} from '@blueprintjs/core'

const jsDateFormatter = {
  formatDate: date => date.toLocaleDateString(),
  parseDate: str => new Date(str),
  placeholder: 'M/D/YYYY'
}

// mutation sendFromNode($from: String, $to: String, $value: String) {
//   sendFromNode(from: $from, to: $to, value: $value) {
//     fromAccount
//     toAccount
//   }
// }
// { "from": "0xBECf244F615D69AaE9648E4bB3f32161A87caFF1",
//  "to": "0x25A7ACe6bD49f1dB57B11ae005EF40ae30195Ef6",
//  "value": "1"}

import query from './_offersQuery'

const MakeOfferMutation = gql`
  mutation MakeOffer(
    $listingID: String
    $finalizes: String
    $affiliate: String
    $commission: String
    $value: String
    $currencyAddr: String
    $arbitrator: String
    $data: MakeOfferInput
  ) {
    makeOffer(
      listingID: $listingID
      finalizes: $finalizes
      affiliate: $affiliate
      commission: $commission
      value: $value
      currencyAddr: $currencyAddr
      arbitrator: $arbitrator
      data: $data
    ) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

class CreateOffer extends Component {
  state = {
    finalizes: new Date(+new Date() + 1000 * 60 * 60 * 24 * 3),
    affiliate: '0x7c38A2934323aAa8dAda876Cfc147C8af40F8D0e',
    commission: '0',
    value: '0.1',
    currencyAddr: '0x0000000000000000000000000000000000000000',
    arbitrator: '0x7c38A2934323aAa8dAda876Cfc147C8af40F8D0e'
  }

  render() {
    const input = field => ({
      value: this.state[field],
      onChange: e => this.setState({ [field]: e.currentTarget.value })
    })
    return (
      <Mutation
        mutation={MakeOfferMutation}
        update={this.onUpdate}
        onCompleted={this.props.onCompleted}
      >
        {(makeOffer, { loading }) => (
          <Dialog
            title="Make Offer"
            isOpen={this.props.isOpen}
            onClose={this.props.onCompleted}
          >
            <div className="bp3-dialog-body">
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Amount">
                    <InputGroup
                      {...input('value')}
                      rightElement={<Tag minimal={true}>ETH</Tag>}
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
                      // onChange={this.handleDateChange}
                      // popoverProps={{ position: Position.BOTTOM }}
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <Button
                  text="Make Offer"
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
    return {
      variables: {
        listingID: this.props.listingId,
        finalizes: '1536300000',
        affiliate: '0x7c38A2934323aAa8dAda876Cfc147C8af40F8D0e',
        commission: this.state.commission,
        value: web3.utils.toWei(this.state.value, 'ether'),
        currencyAddr: '0x0000000000000000000000000000000000000000',
        arbitrator: '0x7c38A2934323aAa8dAda876Cfc147C8af40F8D0e'
      }
    }
  }

  onUpdate = (cache, { data }) => {
    const res = cache.readQuery({
      query,
      variables: { listingId: this.props.listingId }
    })
    // console.log(res)
    cache.writeQuery({
      query,
      data: {
        marketplace: {
          ...res.marketplace,
          getListing: {
            ...res.marketplace.getListing,
            offers: [...res.marketplace.getListing.offers, data.makeOffer]
          }
        }
      }
    })
  }
}

export default CreateOffer
