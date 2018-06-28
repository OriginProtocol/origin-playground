import assert from 'assert'
import helper from './_helper'

// Account 0: Token owner. Marketplace owner
// Account 1: Seller
// Account 2: Buyer
// Account 3: Dispute resolver

describe('Marketplace.sol', async function() {
  var accounts, deploy, web3
  var Marketplace, OriginToken, DaiStableCoin, Buyer, Seller, Arbitrator, ArbitratorAddr

  before(async function() {
    ({ deploy, accounts, web3 } = await helper(`${__dirname}/..`))

    Seller = accounts[1]
    Buyer = accounts[2]
    ArbitratorAddr = accounts[3]

    OriginToken = await deploy('Token', {
      from: accounts[0],
      path: 'contracts/',
      args: ['OriginToken', 'OG', 2, 12000]
    })

    DaiStableCoin = await deploy('Token', {
      from: accounts[0],
      path: 'contracts/',
      args: ['Dai', 'DAI', 2, 12000]
    })

    Arbitrator = await deploy('CentralizedArbitrator', {
      from: ArbitratorAddr,
      path: 'contracts/arbitration/',
      args: [0]
    })

    Marketplace = await deploy('Marketplace', {
      from: accounts[0],
      path: 'contracts/',
      args: [OriginToken._address, Arbitrator._address]
    })
  })

  it('should allow some tokens to be transferred to seller', async function() {
    var result = await OriginToken.methods.transfer(Seller, 400).send()
    assert(result.events.Transfer)
  })

  it('should allow DAI to be transferred to buyer', async function() {
    var result = await DaiStableCoin.methods.transfer(Buyer, 400).send()
    assert(result.events.Transfer)
  })

  describe('A listing in ETH', function() {
    it('should allow a new listing to be added', async function() {
      var listingAbi = await Marketplace.methods
        .createListing('0x12345678901234567890123456789012', 50, '0x0', Seller)
        .encodeABI()

      var result = await OriginToken.methods
        .approveAndCall(Marketplace._address, 50, listingAbi)
        .send({ from: Seller })

      assert(result)

      var balance = await OriginToken.methods
        .balanceOf(Marketplace._address)
        .call()
      assert.equal(balance, 50)

      var total = await Marketplace.methods.totalListings().call()
      assert.equal(total, 1)

      var listing = await Marketplace.methods.listings(0).call()
      assert.equal(listing.seller, Seller)
    })

    it('should allow an offer to be made', async function() {
      const blockNumber = await web3.eth.getBlockNumber()
      const block = await web3.eth.getBlock(blockNumber)
      var result = await Marketplace.methods
        .makeOffer(
          0,
          '0x12345678901234567890123456789012',
          // block.timestamp + 60 * 60,
          block.timestamp + 60 * 120,
          Buyer,
          2,
          web3.utils.toWei('0.1', 'ether')
        )
        .send({ from: Buyer, value: web3.utils.toWei('0.1', 'ether') })

      assert(result.events.OfferCreated)

      var offer = await Marketplace.methods.offers(0, 0).call()
      assert.equal(offer.buyer, Buyer)
    })

    it('should allow an offer to be accepted', async function() {
      var result = await Marketplace.methods
        .acceptOffer(0, 0)
        .send({ from: Seller })
      assert(result.events.OfferAccepted)
    })

    it('should allow an offer to be finalized by buyer', async function() {
      var balanceBefore = await web3.eth.getBalance(Seller)

      var result = await Marketplace.methods.buyerFinalize(0, 0).send({
        from: Buyer
      })
      assert(result.events.OfferFinalized)

      var balanceAfter = await web3.eth.getBalance(Seller)
      assert.equal(
        Number(balanceAfter),
        Number(balanceBefore) + Number(web3.utils.toWei('0.1', 'ether'))
      )
    })

    describe('withdrawing an offer', function() {
      it('should allow another offer to be made', async function() {
        const blockNumber = await web3.eth.getBlockNumber()
        const block = await web3.eth.getBlock(blockNumber)
        var result = await Marketplace.methods
          .makeOffer(
            0,
            '0x12345678901234567890123456789012',
            // block.timestamp + 60 * 60,
            block.timestamp + 60 * 120,
            Buyer,
            2,
            web3.utils.toWei('0.1', 'ether')
          )
          .send({ from: Buyer, value: web3.utils.toWei('0.1', 'ether') })

        assert(result.events.OfferCreated)

        var offer = await Marketplace.methods.offers(0, 1).call()
        assert.equal(offer.buyer, Buyer)
      })

      it('should allow an offer to be withdrawn', async function() {
        var balanceBefore = await web3.eth.getBalance(Buyer)
        var result = await Marketplace.methods
          .withdrawOffer(0, 1)
          .send({ from: Buyer })

        assert(result.events.OfferWithdrawn)

        var balanceAfter = await web3.eth.getBalance(Buyer)

        assert(Number(balanceAfter) > Number(balanceBefore))
      })
    })
  })

  describe('A listing in DAI', function() {
    it('should allow a new listing to be added', async function() {
      var listingAbi = await Marketplace.methods
        .createListing(
          '0x12345678901234567890123456789012',
          50,
          DaiStableCoin._address,
          Seller
        )
        .encodeABI()

      var result = await OriginToken.methods
        .approveAndCall(Marketplace._address, 50, listingAbi)
        .send({ from: Seller })

      assert(result)
    })

    it('should allow an offer to be made', async function() {
      const blockNumber = await web3.eth.getBlockNumber()
      const block = await web3.eth.getBlock(blockNumber)

      var offerAbi = await Marketplace.methods
        .makeOffer(
          1,
          '0x12345678901234567890123456789012',
          // block.timestamp + 60 * 60,
          block.timestamp + 60 * 120,
          Buyer,
          2,
          10
        )
        .encodeABI()

      var result = await DaiStableCoin.methods
        .approveAndCall(Marketplace._address, 100, offerAbi)
        .send({ from: Buyer })
      assert(result)

      var offer = await Marketplace.methods.offers(1, 0).call()
      assert.equal(offer.buyer, Buyer)
    })

    it('should allow an offer to be accepted', async function() {
      var result = await Marketplace.methods
        .acceptOffer(1, 0)
        .send({ from: Seller })
      assert(result.events.OfferAccepted)
    })

    it('should allow an offer to be finalized', async function() {
      var balanceBefore = await DaiStableCoin.methods.balanceOf(Seller).call()

      var result = await Marketplace.methods.buyerFinalize(1, 0).send({
        from: Buyer
      })
      assert(result.events.OfferFinalized)

      var balanceAfter = await DaiStableCoin.methods.balanceOf(Seller).call()
      assert.equal(Number(balanceAfter), Number(balanceBefore) + 10)
    })

    describe('withdrawing an offer', function() {
      it('should allow another offer to be made', async function() {
        const blockNumber = await web3.eth.getBlockNumber()
        const block = await web3.eth.getBlock(blockNumber)

        var offerAbi = await Marketplace.methods
          .makeOffer(
            1,
            '0x12345678901234567890123456789012',
            // block.timestamp + 60 * 60,
            block.timestamp + 60 * 120,
            Buyer,
            2,
            10
          )
          .encodeABI()

        var result = await DaiStableCoin.methods
          .approveAndCall(Marketplace._address, 100, offerAbi)
          .send({ from: Buyer })
        assert(result)

        var offer = await Marketplace.methods.offers(1, 1).call()
        assert.equal(offer.buyer, Buyer)
      })

      it('should allow an offer to be withdrawn', async function() {
        var balanceBefore = await DaiStableCoin.methods.balanceOf(Buyer).call()

        var result = await Marketplace.methods.withdrawOffer(1, 1).send({
          from: Buyer
        })
        assert(result.events.OfferWithdrawn)

        var balanceAfter = await DaiStableCoin.methods.balanceOf(Buyer).call()
        assert.equal(Number(balanceAfter), Number(balanceBefore) + 10)
      })
    })

  })

  describe("Arbitration", function() {

    let listingID, offerID

    it('should allow a new listing to be added', async function() {
      var listingAbi = await Marketplace.methods
        .createListing('0x12345678901234567890123456789012', 50, '0x0', Seller)
        .encodeABI()

      var result = await OriginToken.methods
        .approveAndCall(Marketplace._address, 50, listingAbi)
        .send({ from: Seller })

      listingID = web3.utils.hexToNumber(result.events['0'].raw.topics[2])

      assert(result)
    })

    it('should allow an offer to be made', async function() {
      const blockNumber = await web3.eth.getBlockNumber()
      const block = await web3.eth.getBlock(blockNumber)
      var result = await Marketplace.methods
        .makeOffer(
          listingID,
          '0x12345678901234567890123456789012',
          // block.timestamp + 60 * 60,
          block.timestamp + 60 * 120,
          Buyer,
          2,
          web3.utils.toWei('0.1', 'ether')
        )
        .send({ from: Buyer, value: web3.utils.toWei('0.1', 'ether') })

      assert(result.events.OfferCreated)

      offerID = result.events.OfferCreated.returnValues.offerID
    })

    it('should allow an offer to be accepted', async function() {
      var result = await Marketplace.methods
        .acceptOffer(listingID, offerID)
        .send({ from: Seller })
      assert(result.events.OfferAccepted)
    })

    it('should allow an offer to be disputed', async function() {
      var result = await Marketplace.methods
        .dispute(listingID, offerID)
        .send({ from: Buyer })
      assert(result.events.Dispute)
    })

    it('should allow a transaction to be resolved in favor of seller', async function() {
      var balanceBefore = await web3.eth.getBalance(Buyer)
      var result = await Arbitrator.methods
        .giveRuling(0, 0)
        .send({ from: ArbitratorAddr })

      assert(result)

      var balanceAfter = await web3.eth.getBalance(Buyer)
      assert(Number(balanceAfter) > Number(balanceBefore))

      // assert.equal(result.events.Dispute.returnValues.status, 1)
    })
  })

  describe("Updating", function() {

    let listingID

    it('should allow a new listing to be added', async function() {
      var listingAbi = await Marketplace.methods
        .createListing('0x12345678901234567890123456789012', 10, '0x0', Seller)
        .encodeABI()

      var result = await OriginToken.methods
        .approveAndCall(Marketplace._address, 10, listingAbi)
        .send({ from: Seller })

      listingID = web3.utils.hexToNumber(result.events['0'].raw.topics[2])

      assert(result)
    })

    it('should allow the listing to be updated', async function() {
      var updateAbi = await Marketplace.methods
        .updateListing(
          listingID, '0x98765432109876543210987654321098', 10, false
        )
        .encodeABI()

      var result = await OriginToken.methods
        .approveAndCall(Marketplace._address, 10, updateAbi)
        .send({ from: Seller })

      assert(result)
    })
  })
})
