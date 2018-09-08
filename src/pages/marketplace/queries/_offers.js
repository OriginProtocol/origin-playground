import gql from 'graphql-tag'
import fragments from '../../../fragments'

export default gql`
  query Listing($listingId: String!) {
    marketplace {
      getListing(idx: $listingId) {
        ...basicListingFields
        offers {
          ...basicOfferFields
        }
      }
    }
  }
  ${fragments.Listing.basic}
  ${fragments.Offer.basic}
`
