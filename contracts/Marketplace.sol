pragma solidity ^0.4.24;

import '/node_modules/openzeppelin-solidity/contracts/token/ERC827/ERC827Token.sol';
import '/contracts/arbitration/Arbitrable.sol';

contract Marketplace is Arbitrable {

  event ListingCreated(address indexed seller, uint indexed listingID);
  event ListingUpdated(address indexed seller, uint indexed listingID);
  event OfferCreated(address indexed buyer, uint indexed listingID, uint indexed offerID);
  event OfferAccepted(address indexed seller, uint indexed listingID, uint indexed offerID);
  event OfferWithdrawn(address indexed buyer, uint indexed listingID, uint indexed offerID);
  event OfferFinalized(address indexed party, uint indexed listingID, uint indexed offerID);

  struct Listing {
    address seller;       // Seller wallet / identity contract / other contract
    ERC827Token currency; // 0x0 for ETH or address of ERC20 token
    bytes32 ipfsHash;     // JSON blob with listing data
    uint deposit;         // Deposit in Origin Token
  }

  struct Offer {
    uint status;         // 0: Undefined, 1: Created, 2: Accepted, 3: Disputed,
                         // 4: Finalized, 5: Buyer wins dispute, 6: Seller wins dispute
    address buyer;       // Buyer wallet / identity contract / other contract
    bytes32 ipfsHash;    // JSON blob with offer data
    uint256 finalizes;   // Timestamp offer finalizes
    uint256 commission;  // Amount of commission earned if offer is accepted
    address affiliate;   // Address to send any commission
    uint value;          // Amount in Eth or token buyer is offering
    uint dispute;        // Dispute ID
  }

  struct DisputeMap {
    uint listingID;
    uint offerID;
    uint ruling;
  }

  Listing[] public listings;
  mapping(uint => Offer[]) public offers;
  mapping(uint => DisputeMap) public disputes;

  ERC827Token private tokenAddress; // Origin Token address
  Arbitrator public arbitrator;     // Address of arbitration contract

  constructor(address _tokenAddress, Arbitrator _arbitrator)
    Arbitrable(_arbitrator, "", "")
    public
  {
    tokenAddress = ERC827Token(_tokenAddress);
    arbitrator = Arbitrator(_arbitrator);
  }

  function totalListings() public constant returns (uint) {
    return listings.length;
  }

  function totalOffers(uint listingID) public constant returns (uint) {
    return offers[listingID].length;
  }

  // Seller creates listing
  function createListing(
    bytes32 _ipfsHash,
    uint _deposit,
    address _currency,
    address _seller
  )
    public
  {
    listings.push(Listing({
      seller: _seller,
      ipfsHash: _ipfsHash,
      deposit: _deposit,
      currency: ERC827Token(_currency)
    }));

    tokenAddress.transferFrom(_seller, this, _deposit);
    emit ListingCreated(_seller, listings.length - 1);
  }

  function updateListing(uint listingID, bytes32 _ipfsHash, uint _value, bool _withdraw) {
    Listing listing = listings[listingID];
    require(listing.seller == tx.origin);
    listing.ipfsHash = _ipfsHash;

    if (_value > 0) {
      if (_withdraw) {
        require(listing.deposit > _value);
        tokenAddress.transferFrom(this, listing.seller, _value);
        listing.deposit -= _value;
      } else {
        tokenAddress.transferFrom(listing.seller, this, _value);
        listing.deposit += _value;
      }
    }
    emit ListingUpdated(listing.seller, listingID);
  }

  // Buyer makes offer.
  function makeOffer(
    uint listingID,
    bytes32 _ipfsHash,
    uint _finalizes,
    address _affiliate,
    uint256 _commission,
    uint _value
  )
    public
    payable
  {
    offers[listingID].push(Offer({
      status: 1,
      buyer: tx.origin,
      ipfsHash: _ipfsHash,
      finalizes: _finalizes,
      affiliate: _affiliate,
      commission: _commission,
      value: _value,
      dispute: 0
    }));

    Listing listing = listings[listingID];
    if (address(listing.currency) == 0x0) { // Listing is in ETH
      require(msg.value >= _value);
    } else { // Listing in ERC20
      require(listing.currency.transferFrom(tx.origin, this, _value));
    }

    emit OfferCreated(tx.origin, listingID, offers[listingID].length-1);
  }

  // Seller accepts offer
  function acceptOffer(uint listingID, uint offerID) public {
    require(msg.sender == listings[listingID].seller);
    offers[listingID][offerID].status = 2;
    emit OfferAccepted(msg.sender, listingID, offerID);
  }

  // Buyer withdraws offer
  function withdrawOffer(uint listingID, uint offerID) public {
    require(msg.sender == offers[listingID][offerID].buyer);
    refund(listingID, offerID);
    emit OfferWithdrawn(msg.sender, listingID, offerID);
    delete offers[listingID][offerID];
  }

  // Buyer must finalize transaction to receive commission
  function buyerFinalize(uint listingID, uint offerID) public {
    Offer offer = offers[listingID][offerID];
    require(msg.sender == offer.buyer);
    offer.status = 4;
    paySeller(listingID, offerID, true);
    emit OfferFinalized(msg.sender, listingID, offerID);
  }

  // Buyer can dispute transaction during finalization window
  function dispute(uint listingID, uint offerID) public {
    Offer offer = offers[listingID][offerID];
    require(msg.sender == offer.buyer);
    uint disputeID = arbitrator.createDispute(1, '0x00');
    offer.status = 3;
    offer.dispute = disputeID;

    DisputeMap dispute = disputes[disputeID];
    dispute.listingID = listingID;
    dispute.offerID = offerID;
    emit Dispute(arbitrator, disputeID, "Buyer wins;Seller wins");
  }

  function executeRuling(uint _disputeID, uint _ruling) internal {
    DisputeMap dispute = disputes[_disputeID];
    uint listingID = dispute.listingID;
    uint offerID = dispute.offerID;
    Offer offer = offers[listingID][offerID];
    dispute.ruling = _ruling;
    if (_ruling == 0) {
      offer.status = 5; // Buyer wins
      refund(listingID, offerID);
    } else {
      offer.status = 6; // Seller wins
      paySeller(listingID, offerID, false);
    }
  }

  function refund(uint listingID, uint offerID) private {
    Offer offer = offers[listingID][offerID];
    Listing listing = listings[listingID];
    if (address(listing.currency) == 0x0) {
      require(offer.buyer.send(offer.value));
    }
    else {
      require(listing.currency.transfer(offer.buyer, offer.value));
    }
  }

  function paySeller(uint listingID, uint offerID, bool payCommission) private {
    Listing listing = listings[listingID];
    Offer offer = offers[listingID][offerID];

    if (payCommission && offer.affiliate != 0x0) {
      require(tokenAddress.transfer(offer.affiliate, offer.commission));
    }

    if (address(listing.currency) == 0x0) {
      require(listing.seller.send(offer.value));
    }
    else {
      require(listing.currency.transfer(listing.seller, offer.value));
    }
  }
}
