import React, { Component } from 'react'

import { Button } from '@blueprintjs/core'

import DeployToken from './_DeployToken'
import DeployMarketplace from './_DeployMarketplace'

class Contracts extends Component {
  state = {}
  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ deployToken: true })}>
          Deploy Token
        </Button>
        <Button onClick={() => this.setState({ deployMarketplace: true })}>
          Deploy Marketplace
        </Button>
        <DeployToken
          isOpen={this.state.deployToken}
          onCompleted={() => {
            this.setState({ deployToken: false })
          }}
        />
        <DeployMarketplace
          isOpen={this.state.deployMarketplace}
          onCompleted={() => {
            this.setState({ deployMarketplace: false })
          }}
        />
      </div>
    )
  }
}

export default Contracts
