import gql from 'graphql-tag'

import fragments from './fragments'

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

export const CreateListingMutation = gql`
  mutation CreateListing(
    $deposit: String
    $arbitrator: String
    $from: String
    $data: NewListingInput
  ) {
    createListing(
      deposit: $deposit
      arbitrator: $arbitrator
      from: $from
      data: $data
    ) {
      ...basicListingFields
    }
  }
  ${fragments.Listing.basic}
`

export const MakeOfferMutation = gql`
  mutation MakeOffer(
    $listingID: String
    $finalizes: String
    $affiliate: String
    $commission: String
    $value: String
    $currency: String
    $arbitrator: String
    $data: MakeOfferInput
    $from: String
  ) {
    makeOffer(
      listingID: $listingID
      finalizes: $finalizes
      affiliate: $affiliate
      commission: $commission
      value: $value
      currency: $currency
      arbitrator: $arbitrator
      data: $data
      from: $from
    ) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

export const AcceptOfferMutation = gql`
  mutation AcceptOffer($listingID: String!, $offerID: String!, $from: String) {
    acceptOffer(listingID: $listingID, offerID: $offerID, from: $from) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

export const AddFundsMutation = gql`
  mutation AddFunds(
    $listingID: String!
    $offerID: String!
    $amount: String!
    $from: String
  ) {
    addFunds(
      listingID: $listingID
      offerID: $offerID
      amount: $amount
      from: $from
    ) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

export const UpdateRefundMutation = gql`
  mutation UpdateRefundMutation(
    $listingID: String!
    $offerID: String!
    $amount: String!
    $from: String
  ) {
    updateRefund(
      listingID: $listingID
      offerID: $offerID
      amount: $amount
      from: $from
    ) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

export const ExecuteRulingMutation = gql`
  mutation ExecuteRulingMutation(
    $listingID: String!
    $offerID: String!
    $ruling: String!
    $commission: String!
    $message: String
    $refund: String
    $from: String
  ) {
    executeRuling(
      listingID: $listingID
      offerID: $offerID
      amount: $amount
      ruling: $ruling
      commission: $commission
      message: $message
      refund: $refund
      from: $from
    ) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

export const FinalizeOfferMutation = gql`
  mutation FinalizeOffer($listingID: String, $offerID: String, $from: String) {
    finalizeOffer(listingID: $listingID, offerID: $offerID, from: $from) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

export const DisputeOfferMutation = gql`
  mutation DisputeOffer($listingID: String, $offerID: String, $from: String) {
    disputeOffer(listingID: $listingID, offerID: $offerID, from: $from) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`

export const WithdrawOfferMutation = gql`
  mutation WithdrawOffer($listingID: String, $offerID: String, $from: String) {
    withdrawOffer(listingID: $listingID, offerID: $offerID, from: $from) {
      ...basicOfferFields
    }
  }
  ${fragments.Offer.basic}
`
