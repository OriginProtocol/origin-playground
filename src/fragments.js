import gql from 'graphql-tag'

export default {
  Account: {
    balance: gql`
      fragment balanceFields on Account {
        id
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
        ipfsHash
        value
        currency
        commission
        affiliate {
          id
        }
        buyer {
          id
        }
      }
    `
  }
}
