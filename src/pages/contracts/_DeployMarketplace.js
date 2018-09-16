import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@blueprintjs/core'

import { Dialog, FormGroup, InputGroup } from '@blueprintjs/core'

const DeployMarketplaceMutation = gql`
  mutation DeployMarketplace($token: String) {
    deployMarketplace(token: $token)
  }
`

class DeployMarketplace extends Component {
  state = {
    token: ''
  }

  render() {
    const input = field => ({
      value: this.state[field],
      onChange: e => this.setState({ [field]: e.currentTarget.value })
    })
    return (
      <Mutation
        mutation={DeployMarketplaceMutation}
        onCompleted={this.props.onCompleted}
      >
        {(deployMarketplace, { loading }) => (
          <Dialog
            title="Deploy Marketplace"
            isOpen={this.props.isOpen}
            onClose={this.props.onCompleted}
          >
            <div className="bp3-dialog-body">
              <FormGroup label="Token Address">
                <InputGroup {...input('token')} />
              </FormGroup>
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <Button
                  text="Deploy Marketplace"
                  intent="primary"
                  loading={loading}
                  onClick={() => deployMarketplace({ variables: this.state })}
                />
              </div>
            </div>
          </Dialog>
        )}
      </Mutation>
    )
  }
}

export default DeployMarketplace
