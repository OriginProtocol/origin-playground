import React, { Component } from 'react'
import { Query } from 'react-apollo'

import gql from 'graphql-tag'

const CurrentPrice = gql`
  {
    ethUsd
  }
`

class Price extends Component {
  render() {
    const { label, amount, className } = this.props
    return (
      <Query query={CurrentPrice}>
        {({ loading, error, data }) => {
          if (loading || error) return null
          const usdAmount = data.ethUsd * Number(amount || 0)
          let rounded = Math.round(usdAmount * 100) / 100
          if (rounded === 0) rounded = 0.01
          return (
            <span className={className}>{`${
              label ? `${label}: ` : ''
            }$${rounded}`}</span>
          )
        }}
      </Query>
    )
  }
}

export default Price
