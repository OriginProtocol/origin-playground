import React from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

const NEW_BLOCKS_SUBSCRIPTION = gql`
  subscription onNewBlock {
    newBlock {
      id
      number
    }
  }
`

const Subs = () => (
  <Subscription subscription={NEW_BLOCKS_SUBSCRIPTION}>
    {({ data, loading }) => (
      <span style={{ marginRight: '1rem' }}>
        {loading ? null : `Block: ${data.newBlock.number}`}
      </span>
    )}
  </Subscription>
)

export default Subs
