import assert from 'assert'
import helper from './_helper'

// Account 0: Token owner. Marketplace owner
// Account 1: Seller
// Account 2: Buyer
// Account 3: Dispute resolver
// Account 4: Claim Issuer

describe.skip('Marketplace.sol', async function() {
  var accounts, deploy, web3, prvSigner, pubSigner
  var Marketplace,
    OriginToken,
    DaiStableCoin,
    Buyer,
    Seller,
    SellerIdentity,
    ClaimIssuer

  before(async function() {
    ({ deploy, accounts, web3 } = await helper(`${__dirname}/..`))

    Seller = accounts[1]
    Buyer = accounts[2]

    prvSigner = web3.utils.randomHex(32)
    pubSigner = web3.eth.accounts.privateKeyToAccount(prvSigner).address

    SellerIdentity = await deploy('ClaimHolder', {
      from: Seller,
      path: `${__dirname}/../contracts/identity`
    })
    ClaimIssuer = await deploy('ClaimHolder', {
      from: accounts[4],
      path: `${__dirname}/../contracts/identity`
    })

    var key = web3.utils.sha3(pubSigner)
    await ClaimIssuer.methods.addKey(key, 3, 1).send({ from: accounts[4] })

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

    Marketplace = await deploy('Marketplace', {
      from: accounts[0],
      path: 'contracts/',
      args: [OriginToken._address, '0x0']
    })
  })

  it('should allow some tokens to be transferred to seller', async function() {
    var result = await OriginToken.methods.transfer(Seller, 100).send()
    await OriginToken.methods.transfer(SellerIdentity._address, 100).send()
    assert(result.events.Transfer)
  })

  it('should not allow a new listing to be added', async function() {
    var listingAbi = await Marketplace.methods
      .createListing('0x12345678901234567890123456789012', 50, '0x0', SellerIdentity._address, '0x0', 0)
      .encodeABI()

    try {
      var result = await OriginToken.methods
        .approveAndCall(Marketplace._address, 50, listingAbi)
        .send({ from: accounts[1] })
      assert(!result)
    } catch (e) {
      /* Ignore */
    }
  })

  it('should allow a new listing to be added after claim has been added', async function() {
    var data = web3.utils.asciiToHex('Verified OK')
    var claimType = 3
    var hashed = web3.utils.soliditySha3(
      SellerIdentity._address,
      claimType,
      data
    )
    var signed = await web3.eth.accounts.sign(hashed, prvSigner)

    var claimRes = await SellerIdentity.methods
      .addClaim(
        claimType,
        2,
        ClaimIssuer._address,
        signed.signature,
        data,
        'abc.com'
      )
      .send({ from: Seller })

    assert(claimRes.events.ClaimAdded)

    var claimIsValid = await Marketplace.methods
      .claimIsValid(ClaimIssuer._address, SellerIdentity._address, 3)
      .call()
    assert(claimIsValid)

    var listingAbi = await Marketplace.methods
      .createListing('0x1234', 50, '0x0', SellerIdentity._address, '0x0', 0)
      .encodeABI()

    var tokenTransferAbi = await OriginToken.methods
      .approveAndCall(Marketplace._address, 50, listingAbi)
      .encodeABI()

    var result = await SellerIdentity.methods
      .execute(OriginToken._address, 0, tokenTransferAbi)
      .send({
        from: Seller
      })

    assert(result)
  })
})
