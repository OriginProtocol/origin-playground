import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Switch, Tooltip } from '@blueprintjs/core'

import gql from 'graphql-tag'

const MetaMaskEnabled = gql`
  query MetaMaskEnabled {
    web3 {
      metaMaskAvailable
      metaMaskEnabled
    }
  }
`

const ToggleMetaMaskMutation = gql`
  mutation ToggleMetaMask {
    toggleMetaMask
  }
`

class MetaMaskSwitcher extends Component {
  render() {
    return (
      <Mutation
        mutation={ToggleMetaMaskMutation}
        refetchQueries={['MetaMaskEnabled']}
      >
        {toggleMetaMask => (
          <Query query={MetaMaskEnabled}>
            {({ loading, error, data }) => {
              if (loading || error) return null
              const SwitchCmp = (
                <Switch
                  inline={true}
                  disabled={!data.web3.metaMaskAvailable}
                  checked={data.web3.metaMaskEnabled}
                  onChange={() => toggleMetaMask()}
                  className="mb-0"
                  label={
                    <img
                      src="images/metamask.png"
                      style={{ width: 16, verticalAlign: -2 }}
                    />
                  }
                />
              )
              if (data.web3.metaMaskAvailable) {
                return SwitchCmp
              } else {
                return (
                  <Tooltip content="MetaMask unavailable">{SwitchCmp}</Tooltip>
                )
              }
            }}
          </Query>
        )}
      </Mutation>
    )
  }
}

export default MetaMaskSwitcher
