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
        status
        totalEvents
        seller {
          id
        }
        arbitrator {
          id
        }
        deposit
        createdEvent {
          timestamp
        }
        ipfs {
          id
          category
          title
          description
          currencyId
          price {
            amount
            currency
          }
          media {
            url
            contentType
          }
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
        finalizes
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
