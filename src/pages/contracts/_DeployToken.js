import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@blueprintjs/core'

import { Dialog, FormGroup, InputGroup } from '@blueprintjs/core'

// mutation sendFromNode($from: String, $to: String, $value: String) {
//   sendFromNode(from: $from, to: $to, value: $value) {
//     fromAccount
//     toAccount
//   }
// }
// { "from": "0xBECf244F615D69AaE9648E4bB3f32161A87caFF1",
//  "to": "0x25A7ACe6bD49f1dB57B11ae005EF40ae30195Ef6",
//  "value": "1"}

// import query from './_query'

const DeployTokenMutation = gql`
  mutation DeployToken(
    $name: String
    $symbol: String
    $decimals: String
    $supply: String
  ) {
    deployToken(
      name: $name
      symbol: $symbol
      decimals: $decimals
      supply: $supply
    )
  }
`

class DeployToken extends Component {
  state = {
    name: 'Origin Token',
    symbol: 'OGN',
    decimals: '2',
    supply: '1000000'
  }

  render() {
    const input = field => ({
      value: this.state[field],
      onChange: e => this.setState({ [field]: e.currentTarget.value })
    })
    return (
      <Mutation
        mutation={DeployTokenMutation}
        // update={this.onUpdate}
        onCompleted={this.props.onCompleted}
      >
        {(deployToken, { loading }) => (
          <Dialog
            title="Deploy Token"
            isOpen={this.props.isOpen}
            onClose={this.props.onCompleted}
          >
            <div className="bp3-dialog-body">
              <FormGroup label="Name">
                <InputGroup {...input('name')} />
              </FormGroup>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Symbol">
                    <InputGroup {...input('symbol')} />
                  </FormGroup>
                </div>
                <div style={{ flex: 1, marginRight: 20 }}>
                  <FormGroup label="Supply">
                    <InputGroup {...input('supply')} />
                  </FormGroup>
                </div>
                <div style={{ flex: 1 }}>
                  <FormGroup label="Decimals">
                    <InputGroup {...input('decimals')} />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <Button
                  text="Deploy Token"
                  intent="primary"
                  loading={loading}
                  onClick={() => deployToken({ variables: this.state })}
                />
              </div>
            </div>
          </Dialog>
        )}
      </Mutation>
    )
  }

  // onUpdate(cache, { data }) {
  //   const res = cache.readQuery({ query })
  //   cache.writeQuery({
  //     query,
  //     data: {
  //       marketplace: {
  //         ...res.marketplace,
  //         allListings: [data.createListing, ...res.marketplace.allListings]
  //       }
  //     }
  //   })
  // }
}

export default DeployToken
