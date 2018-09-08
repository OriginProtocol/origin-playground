import gql from 'graphql-tag'
import fragments from '../../../fragments'

export default gql`
  query AllListings {
    marketplace {
      totalListings
      allListings {
        ...basicListingFields
      }
    }
    web3 {
      accounts {
        ...balanceFields
      }
    }
  }
  ${fragments.Listing.basic}
  ${fragments.Account.balance}
`
