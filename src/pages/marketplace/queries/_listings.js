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
  }
  ${fragments.Listing.basic}
`
