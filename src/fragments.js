import gql from 'graphql-tag'

export default {
  Account: {
    balance: gql`
      fragment balanceFields on Account {
        id
        role
        name
        balance {
          eth
          usd
          wei
        }
        ogn: token(symbol: "OGN") {
          id
          balance
        }
      }
    `
  },
  Listing: {
    basic: gql`
      fragment basicListingFields on Listing {
        id
        seller {
          id
        }
        deposit
        ipfs {
          id
          category
          title
          currencyId
          price
        }
      }
    `
  },
  Offer: {
    basic: gql`
      fragment basicOfferFields on Offer {
        id
        listingId
        value
        currency
        refund
        commission
        status
        arbitrator {
          id
        }
        affiliate {
          id
        }
        buyer {
          id
        }
        withdrawnBy {
          id
        }

        ipfs {
          id
          buyer
          finalizes
          affiliate
          commission
          value
          refund
          currency
          arbitrator
        }
      }
    `
  }
}
