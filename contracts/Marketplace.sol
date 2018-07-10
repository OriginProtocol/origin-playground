pragma solidity ^0.4.24;

/**
 * @title A Marketplace contract for managing listings, offers, payments, escrow and arbitration
 * @author Nick Poulden <nick@poulden.com>
 *
 * Listings may be priced in Eth or ERC20.
 */

import '/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import '/contracts/IMarketplace.sol';

contract IArbitrator {
  function createDispute(uint listingID, uint offerID) returns (uint);
}

contract Marketplace is IMarketplace {

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
  event OfferDisputed   (address indexed buyer,  uint indexed listingID, uint indexed offerID, bytes32 ipfsHash, uint disputeID);
  event OfferRuling     (address indexed party,  uint indexed listingID, uint indexed offerID, bytes32 ipfsHash, uint ruling);
  event OfferFinalized  (address indexed party,  uint indexed listingID, uint indexed offerID, bytes32 ipfsHash);
  event OfferData       (address indexed party,  uint indexed listingID, uint indexed offerID, bytes32 ipfsHash);

  struct Listing {
    address seller;   // Seller wallet / identity contract / other contract
    bytes32 ipfsHash; // JSON blob with listing data
    uint deposit;     // Deposit in Origin Token
  }

  struct Offer {
    uint value;         // Amount in Eth or token buyer is offering
    uint commission;    // Amount of commission earned if offer is accepted
    bytes32 ipfsHash;   // JSON blob with offer data
    ERC20 currency;     // Currency of listing. Copied incase seller deleted listing
    address buyer;      // Buyer wallet / identity contract / other contract
    address affiliate;  // Address to send any commission
    address arbitrator; // Address of arbitration contract
    uint32 finalizes;   // Timestamp offer finalizes
    uint8 status;       // 0: Undefined, 1: Created, 2: Accepted, 3: Disputed, 4: Finalized,
                        // 5: Buyer wins dispute, 6: Seller wins dispute, 7: Buyer wins by default
  }

  Listing[] public listings;
  mapping(uint => Offer[]) public offers;      // listingID => Offers

  ERC20 private tokenAddr;      // Origin Token address

  constructor(address _tokenAddr) public {
    tokenAddr = ERC20(_tokenAddr);        // Origin Token contract
  }

  // @dev Return the total number of listings
  function totalListings() public constant returns (uint) {
    return listings.length;
  }

  // @dev Return the total number of offers
  function totalOffers(uint listingID) public constant returns (uint) {
    return offers[listingID].length;
  }

  // @dev Seller creates listing
  function createListing(
    bytes32 _ipfsHash, // IPFS JSON with details, pricing, availability
    uint _deposit     // Deposit in Origin Token
  )
    public
  {
    require(_deposit > 0); // Listings must deposit some amount of Origin Token
    listings.push(Listing({
      seller: msg.sender,
      ipfsHash: _ipfsHash,
      deposit: _deposit
    }));

    tokenAddr.transferFrom(msg.sender, this, _deposit); // Transfer Origin Token
    emit ListingCreated(msg.sender, listings.length - 1, _ipfsHash);
  }

  // @dev Seller updates listing
  function updateListing(
    uint listingID,
    bytes32 _ipfsHash, // Updated IPFS hash
    uint _value        // Target Amount of Origin Token deposit
  ) {
    uint toTransfer;
    Listing listing = listings[listingID];
    require(listing.seller == msg.sender);
    listing.ipfsHash = _ipfsHash;

    if (_value > listing.deposit) {
      toTransfer = _value - listing.deposit;
      tokenAddr.transferFrom(msg.sender, this, toTransfer);
      listing.deposit += toTransfer;
    } else if (_value < listing.deposit) {
      toTransfer = listing.deposit - _value;
      tokenAddr.transfer(listing.seller, toTransfer);
      listing.deposit -= toTransfer;
    }

    emit ListingUpdated(listing.seller, listingID, _ipfsHash);
  }

  // @dev Seller withdraws listing. IPFS hash contains reason for withdrawl.
  function withdrawListing(uint listingID, bytes32 _ipfsHash) public {
    Listing listing = listings[listingID];
    require(msg.sender == listing.seller);
    tokenAddr.transfer(listing.seller, listing.deposit); // Send deposit back to seller
    delete listings[listingID]; // Remove data to get some gas back
    emit ListingWithdrawn(msg.sender, listingID, _ipfsHash);
  }

  // @dev Buyer makes offer.
  function makeOffer(
    uint listingID,
    bytes32 _ipfsHash,   // IPFS hash containing offer data
    uint32 _finalizes,     // Timestamp an accepted offer will finalize
    address _affiliate,  // Address to send any required commission to
    uint256 _commission, // Amount of commission to send in Origin Token if offer finalizes
    uint _value,         // Offer amount in ERC20 or Eth
    ERC20 _currency,
    address _arbitrator
  )
    public
    payable
  {
    offers[listingID].push(Offer({
      status: 1,
      buyer: msg.sender,
      ipfsHash: _ipfsHash,
      finalizes: _finalizes,
      affiliate: _affiliate,
      commission: _commission,
      currency: _currency,
      value: _value,
      arbitrator: _arbitrator
    }));

    if (address(_currency) == 0x0) { // Listing is in ETH
      require(msg.value == _value);
    } else { // Listing is in ERC20
      require(_currency.transferFrom(msg.sender, this, _value));
    }

    emit OfferCreated(msg.sender, listingID, offers[listingID].length-1, _ipfsHash);
  }

  // @dev Make new offer after withdrawl
  function makeOffer(
    uint listingID,
    bytes32 _ipfsHash,
    uint32 _finalizes,
    address _affiliate,
    uint256 _commission,
    uint _value,
    ERC20 _currency,
    address _arbitrator,
    uint _withdrawOfferID
  )
    public
    payable
  {
    withdrawOffer(listingID, _withdrawOfferID, _ipfsHash);
    makeOffer(listingID, _ipfsHash, _finalizes, _affiliate, _commission, _value, _currency, _arbitrator);
  }

  // @dev Seller accepts offer
  function acceptOffer(uint listingID, uint offerID, bytes32 _ipfsHash) public {
    require(msg.sender == listings[listingID].seller);
    Listing listing = listings[listingID];
    Offer offer = offers[listingID][offerID];
    require(offer.status == 1); // Offer must be in state 'Created'
    offer.status = 2;
    offer.ipfsHash = _ipfsHash;
    if (offer.affiliate != 0x0 && offer.commission > 0) {
      require(listing.deposit >= offer.commission);
      listing.deposit -= offer.commission; // Accepting an offer puts Origin Token into escrow
    }
    emit OfferAccepted(msg.sender, listingID, offerID, _ipfsHash);
  }

  // @dev Buyer withdraws offer. IPFS hash contains reason for withdrawl.
  function withdrawOffer(uint listingID, uint offerID, bytes32 _ipfsHash) public {
    Listing listing = listings[listingID];
    Offer offer = offers[listingID][offerID];
    require(msg.sender == offer.buyer);
    if (listing.seller == 0x0) { // If listing was withdrawn
      require(offer.status == 1 || offer.status == 2); // Offer must be in state 'Created' or 'Accepted'
      if (offer.status == 2) { // Pay out commission if seller accepted offer then withdrew listing
        payCommission(listingID, offerID);
      }
    } else {
      require(offer.status == 1); // Offer must be in state 'Created'
    }
    refund(listingID, offerID);
    emit OfferWithdrawn(msg.sender, listingID, offerID, _ipfsHash);
    delete offers[listingID][offerID];
  }

  // @dev Buyer must finalize transaction to receive commission
  function finalize(uint listingID, uint offerID, bytes32 _ipfsHash) public {
    Listing listing = listings[listingID];
    Offer offer = offers[listingID][offerID];
    if (now <= offer.finalizes) {
      require(msg.sender == offer.buyer);
    } else { // Allow seller to finalize if finalization window has passed
      require(msg.sender == offer.buyer || msg.sender == listing.seller);
    }
    require(offer.status == 2); // Offer must be in state 'Accepted'
    offer.status = 4; // Update to 'Finalized'
    paySeller(listingID, offerID); // Pay seller
    if (msg.sender == offer.buyer) { // Only pay commission if buyer is finalizing
      payCommission(listingID, offerID);
    }
    emit OfferFinalized(msg.sender, listingID, offerID, _ipfsHash);
    // TODO: delete offers[listingID][offerID];
  }

  // @dev Buyer can dispute transaction during finalization window
  function dispute(uint listingID, uint offerID, bytes32 _ipfsHash) public {
    Offer offer = offers[listingID][offerID];
    require(msg.sender == offer.buyer);
    require(offer.status == 2); // Offer must be in 'Accepted' state
    require(now <= offer.finalizes); // Must be before agreed finalization window
    offer.status = 3; // Set status to "Disputed"
    offer.ipfsHash = _ipfsHash; // IPFS hash contains dispute info
    uint disputeID = IArbitrator(offer.arbitrator).createDispute(listingID, offerID);
    emit OfferDisputed(msg.sender, listingID, offerID, _ipfsHash, disputeID);
  }

  // @dev Called from arbitration contract
  function executeRuling(uint listingID, uint offerID, uint _ruling) public {
    Offer offer = offers[listingID][offerID];
    Listing listing = listings[listingID];
    require(msg.sender == offer.arbitrator);
    require(offer.status == 3); // Offer must be 'disputed'
    if (_ruling == 0 || listing.seller == 0x0) { // If seller withdrew listing, buyer wins by default
      offer.status = listing.seller == 0x0 ? 7 : 5; // Buyer wins
      refund(listingID, offerID);
      payCommission(listingID, offerID); // Pay commission to affiliate
    } else {
      offer.status = 6; // Seller wins
      paySeller(listingID, offerID);
      if (offer.commission > 0 && offer.affiliate != 0x0) { // Refund commission to seller
        listings[listingID].deposit += offer.commission;
      }
    }
    emit OfferRuling(offer.arbitrator, listingID, offerID, 0x0, _ruling);
    // TODO: delete offers[listingID][offerID];
  }

  // @dev Refunds buyer in ETH or ERC20
  function refund(uint listingID, uint offerID) private {
    Offer offer = offers[listingID][offerID];
    if (address(offer.currency) == 0x0) {
      require(offer.buyer.send(offer.value));
    }
    else {
      require(offer.currency.transfer(offer.buyer, offer.value));
    }
  }

  // @dev Pay seller in ETH or ERC20
  function paySeller(uint listingID, uint offerID) private {
    Listing listing = listings[listingID];
    Offer offer = offers[listingID][offerID];

    if (address(offer.currency) == 0x0) {
      require(listing.seller.send(offer.value));
    }
    else {
      require(offer.currency.transfer(listing.seller, offer.value));
    }
  }

  // @dev Pay commission to affiliate
  function payCommission(uint listingID, uint offerID) private {
    Offer offer = offers[listingID][offerID];
    if (offer.affiliate != 0x0 && offer.commission > 0) {
      require(tokenAddr.transfer(offer.affiliate, offer.commission));
    }
  }

  // @dev Associate ipfs data with a listing
  function addData(uint listingID, bytes32 ipfsHash) public {
    emit ListingData(msg.sender, listingID, ipfsHash);
  }

  // @dev Associate ipfs data with an offer
  function addData(uint listingID, uint offerID, bytes32 ipfsHash) public {
    emit OfferData(msg.sender, listingID, offerID, ipfsHash);
  }
}
