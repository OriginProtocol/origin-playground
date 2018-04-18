import assert from 'assert'
import helper from './_helper'

describe('ClaimVerifier.sol', async function() {
  var web3, accounts, deploy, prvSigner, pubSigner
  var UserIdentity, ClaimIssuer, ClaimVerifier

  before(async function() {
    ({ deploy, accounts, web3 } = await helper(
      `${__dirname}/../contracts/`
    ))

    prvSigner = web3.utils.randomHex(32)
    pubSigner = web3.eth.accounts.privateKeyToAccount(prvSigner).address

    UserIdentity = await deploy('ClaimHolder', { from: accounts[0] })
    ClaimIssuer = await deploy('ClaimHolder', { from: accounts[1] })
    ClaimVerifier = await deploy('ClaimVerifier', { from: accounts[2], args: [
      ClaimIssuer._address
    ] })
  })

  it('should allow verifier owner to addKey', async function() {
    var key = web3.utils.sha3(pubSigner)
    var result = await ClaimIssuer.methods.addKey(key, 3, 1).send({ from: accounts[1] })

    assert(result)
  })

  it('should not allow new listing without identity claim', async function() {
    var res = await ClaimVerifier.methods
      .checkClaim(UserIdentity._address, 3)
      .send({ from: accounts[0] })
    assert(res.events.ClaimInvalid)
  })

  it('should allow identity owner to addClaim', async function() {
    var data = web3.utils.asciiToHex('Verified OK')
    var claimType = 3
    var hashed = web3.utils.soliditySha3(UserIdentity._address, claimType, data)
    var signed = await web3.eth.accounts.sign(hashed, prvSigner)

    var claimRes = await UserIdentity.methods
        .addClaim(
          claimType,
          2,
          ClaimIssuer._address,
          signed.signature,
          data,
          'abc.com'
        ).send({ from: accounts[0] })

    assert(claimRes.events.ClaimAdded)
  })

  it('should not allow new listing without identity claim', async function() {
    var res = await ClaimVerifier.methods
      .checkClaim(UserIdentity._address, 3)
      .send({ from: accounts[0] })
    assert(res.events.ClaimValid)
  })

})
