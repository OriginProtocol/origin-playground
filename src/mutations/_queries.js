import gql from 'graphql-tag'

import fragments from '../fragments'

export const CreateWalletMutation = gql`
  mutation CreateWallet($role: String, $name: String) {
    createWallet(role: $role, name: $name) {
      ...balanceFields
    }
  }
  ${fragments.Account.balance}
`

export const DeployTokenMutation = gql`
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

export const SendFromNodeMutation = gql`
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

export const TransferTokenMutation = gql`
  mutation TransferToken(
    $token: String!
    $from: String!
    $to: String!
    $value: String!
  ) {
    transferToken(token: $token, from: $from, to: $to, value: $value)
  }
`

export const UpdateTokenAllowanceMutation = gql`
  mutation UpdateTokenAllowance(
    $token: String!
    $from: String!
    $to: String!
    $value: String!
  ) {
    updateTokenAllowance(token: $token, from: $from, to: $to, value: $value)
  }
`

export const DeployMarketplaceMutation = gql`
  mutation DeployMarketplace($token: String) {
    deployMarketplace(token: $token)
  }
`
