import assert from 'assert'
import helper from './_helper'

describe('Identity', async function() {
  let web3, accounts, deploy, randomHex
  let UserIdentity

  before(async function() {
    ({
      web3,
      deploy,
      accounts,
      web3: {
        utils: { randomHex }
      }
    } = await helper(`${__dirname}/..`))

    UserIdentity = await deploy('Identity', {
      from: accounts[0],
      path: `${__dirname}/../contracts/identity3/`,
      args: [
        [
          {
            claimType: 1,
            scheme: 3,
            issuer: accounts[0],
            signature: randomHex(10),
            data: randomHex(10),
            uri: ''
          }
        ]
      ],
      log: true
    })
    // acctSha3 = web3.utils.keccak256(accounts[0])
  })

  describe('Identity', function() {
    it('should deploy successfully', async function() {
      assert(UserIdentity)
    })
  })

  describe('ClaimHolder', function() {
    it('should allow a claim to be added', async function() {
      const response = await UserIdentity.methods
        .addClaim({
          claimType: 1,
          scheme: 3,
          issuer: accounts[0],
          signature: randomHex(10),
          data: randomHex(10),
          uri: ''
        })
        .send()
      assert(response.events.ClaimAdded)
    })
    it('should allow a claim to be retrieved', async function() {
      const claimId = web3.utils.soliditySha3(accounts[0], 1)
      const response = await UserIdentity.methods.claims(claimId).call()
      assert(response.claimType === '1')
    })
  })

  describe('KeyHolder', function() {
    it('should allow a key to be added', async function() {
      var response = await UserIdentity.methods
        .addKey(web3.utils.keccak256(accounts[2]), {
          purpose: 1,
          keyType: 1
        })
        .send()
      assert(response.events.KeyAdded)
    })

    it('should not allow a key to be added from non-manager', async function() {
      await new Promise((resolve, reject) => {
        UserIdentity.methods
          .addKey(web3.utils.keccak256(accounts[2]), {
            purpose: 1,
            keyType: 1
          })
          .send({ from: accounts[1] })
          .then(reject)
          .catch(resolve)
      })
    })

    it('should not allow a key to be removed by non manager', async function() {
      await new Promise((resolve, reject) => {
        UserIdentity.methods
          .removeKey(web3.utils.keccak256(accounts[2]))
          .send({ from: accounts[1] })
          .then(reject)
          .catch(resolve)
      })
    })

    it('should allow a key to be removed', async function() {
      var response = await UserIdentity.methods
        .removeKey(web3.utils.keccak256(accounts[2]))
        .send()
      assert(response.events.KeyRemoved)
    })

    it('should allow an execution to be added', async function() {
      const addClaimAbi = await UserIdentity.methods
        .addClaim({
          claimType: 1,
          scheme: 3,
          issuer: accounts[0],
          signature: randomHex(10),
          data: randomHex(10),
          uri: ''
        })
        .encodeABI()

      var response = await UserIdentity.methods
        .execute(UserIdentity.options.address, 0, addClaimAbi)
        .send({ from: accounts[1]})

      assert(response.events.ExecutionRequested)
    })

    it('should allow an execution to be approved', async function() {
      var response = await UserIdentity.methods
        .approve(0, true)
        .send({ from: accounts[0]})
      // console.log(response)

      assert(response.events.Approved)
    })
  })
})
