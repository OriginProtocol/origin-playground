pragma solidity ^0.4.24;

/**
 * @title A Marketplace contract for managing listings, offers, payments, escrow and arbitration
 * @author Nick Poulden <nick@poulden.com>
 *
 * Listings may be priced in Eth or ERC20.
 */

import '/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

interface IMarketplace {

  /**
   * @notice All events have the same indexed signature offsets for easy filtering
   */
  event ListingCreated  (address indexed seller, uint indexed listingID, bytes32 ipfsHash);
  event ListingUpdated  (address indexed seller, uint indexed listingID, bytes32 ipfsHash);
  event ListingWithdrawn(address indexed seller, uint indexed listingID, bytes32 ipfsHash);
  event ListingData     (address indexed party,  uint indexed listingID, bytes32 ipfsHash);
  event OfferCreated    (address indexed buyer,  uint indexed listingID, uint indexed offerID, bytes32 ipfsHash);
  event OfferWithdrawn  (address indexed buyer,  uint indexed listingID, uint indexed offerID, bytes32 ipfsHash);
  event OfferAccepted   (address indexed seller, uint indexed listingID, uint indexed offerID, bytes32 ipfsHash);
  event OfferDisputed   (address indexed buyer,  uint indexed listingID, uint indexed offerID, bytes32 ipfsHash);
  event OfferFinalized  (address indexed party,  uint indexed listingID, uint indexed offerID, bytes32 ipfsHash);
  event OfferData       (address indexed party,  uint indexed listingID, uint indexed offerID, bytes32 ipfsHash);

  // @dev Return the total number of listings
  function totalListings() public constant returns (uint);

  // @dev Return the total number of offers
  function totalOffers(uint listingID) public constant returns (uint);

  // @dev Seller creates listing
  function createListing(
    bytes32 _ipfsHash, // IPFS JSON with details, pricing, availability
    uint _deposit     // Deposit in Origin Token
  ) public;

  // @dev Seller updates listing
  function updateListing(
    uint listingID,
    bytes32 _ipfsHash, // Updated IPFS hash
    uint _value        // Target Amount of Origin Token deposit
  ) public;

  // @dev Seller withdraws listing. IPFS hash contains reason for withdrawl.
  function withdrawListing(uint listingID, bytes32 _ipfsHash) public;

  // @dev Buyer makes offer.
  function makeOffer(
    uint listingID,
    bytes32 _ipfsHash,   // IPFS hash containing offer data
    uint32 _finalizes,   // Timestamp an accepted offer will finalize
    address _affiliate,  // Address to send any required commission to
    uint256 _commission, // Amount of commission to send in Origin Token if offer finalizes
    uint _value,         // Offer amount in ERC20 or Eth
    ERC20 _currency,
    address _arbitrator
  ) public payable;

  // @dev Seller accepts offer
  function acceptOffer(uint listingID, uint offerID, bytes32 _ipfsHash) public;

  // @dev Buyer withdraws offer. IPFS hash contains reason for withdrawl.
  function withdrawOffer(uint listingID, uint offerID, bytes32 _ipfsHash) public;

  // @dev Buyer must finalize transaction to receive commission
  // Seller can finalize after finalization window has passed
  function finalize(uint listingID, uint offerID, bytes32 _ipfsHash) public;

  // @dev Buyer can dispute transaction during finalization window
  function dispute(uint listingID, uint offerID, bytes32 _ipfsHash) public;

  // @dev Associate ipfs data with a listing
  function addData(uint listingID, bytes32 ipfsHash) public;

  // @dev Associate ipfs data with an offer
  function addData(uint listingID, uint offerID, bytes32 ipfsHash) public;
}
