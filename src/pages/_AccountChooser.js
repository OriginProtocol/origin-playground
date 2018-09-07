import React from 'react'
import { Query } from 'react-apollo'

import { Button, Popover, Position, Menu } from '@blueprintjs/core'

import query from './accounts/_query'

const AccountChooser = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading || error || !data.web3.defaultAccount) return null

      return (
        <Popover
          content={
            <Menu>
              <Menu.Item
                icon="new-text-box"
                text="New text box"
              />
              <Menu.Item
                icon="new-object"
                text="New object"
              />
              <Menu.Item
                icon="new-link"
                text="New link"
              />
            </Menu>
          }
          position={Position.BOTTOM}
        >
          <Button
            minimal={true}
            icon="bank-account"
            text={`Wallet ${data.web3.defaultAccount.id.substr(0, 6)}: ${
              data.web3.defaultAccount.balance.eth
            } ETH`}
          />
        </Popover>
      )
    }}
  </Query>
)

export default AccountChooser
