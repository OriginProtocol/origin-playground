import gql from 'graphql-tag'

export default {
  Account: {
    balance: gql`
      fragment balanceFields on Account {
        id
        role
        balance {
          eth
          usd
          wei
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
        ipfsHash
        value
        currency
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

        ipfs {
          buyer
          finalizes
          affiliate
          commission
          value
          currency
          arbitrator
        }
      }
    `
  }
}
