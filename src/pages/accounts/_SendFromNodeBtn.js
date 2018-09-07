import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Tooltip } from '@blueprintjs/core'

import fragments from '../../fragments'

// mutation sendFromNode($from: String, $to: String, $value: String) {
//   sendFromNode(from: $from, to: $to, value: $value) {
//     fromAccount
//     toAccount
//   }
// }
// { "from": "0xBECf244F615D69AaE9648E4bB3f32161A87caFF1",
//  "to": "0x25A7ACe6bD49f1dB57B11ae005EF40ae30195Ef6",
//  "value": "1"}

const SendFromNode = gql`
  mutation SendFromNode($from: String, $to: String, $value: String) {
    sendFromNode(from: $from, to: $to, value: $value) {
      toAccount {
        ...balanceFields
      }
      fromAccount {
        ...balanceFields
      }
    }
  }
  ${fragments.Account.balance}
`

const SendFromNodeBtn = ({ from, to, value }) => (
  <Mutation mutation={SendFromNode}>
    {(sendFromNode, { loading }) => (
      <Tooltip content="Fund with 0.5 ETH" hoverOpenDelay={1000}>
        <Button
          icon="bank-account"
          loading={loading}
          onClick={() => sendFromNode({ variables: { from, to, value } })}
        />
      </Tooltip>
    )}
  </Mutation>
)

export default SendFromNodeBtn
