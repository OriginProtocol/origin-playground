import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { Button, ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core'

import SetWalletMutation from './_SetWalletMutation'

import query from './_query'

@ContextMenuTarget
class AccountButton extends Component {
  render() {
    const { account } = this.props
    if (!account) {
      return null
    }
    const accountId = typeof account === 'string' ? account : account.id
    if (accountId === '0x0000000000000000000000000000000000000000') {
      return null
    }
    return (
      <span>
        <Query query={query}>
          {({ loading, error, data }) =>
            !loading && !error && data.web3.defaultAccount ? (
              <SetWalletMutation>
                {setActiveWallet => (
                  <Button
                    small={true}
                    active={data.web3.defaultAccount.id === accountId}
                    disabled={!data.web3.accounts.find(a => a.id === accountId)}
                    onClick={() =>
                      setActiveWallet({ variables: { address: accountId } })
                    }
                  >
                    {accountId.substr(0, 6)}
                  </Button>
                )}
              </SetWalletMutation>
            ) : null
          }
        </Query>
      </span>
    )
  }

  getAddress() {
    const { account } = this.props
    return typeof account === 'string' ? account : account.id
  }

  renderContextMenu() {
    return (
      <Menu>
        <MenuItem
          text="Copy Address"
          onClick={() => {
            navigator.clipboard.writeText(this.getAddress()).then(
              function() {
                /* success */
              },
              function() {
                /* failure */
              }
            )
          }}
        />
      </Menu>
    )
  }
}

export default AccountButton
