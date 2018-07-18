import assert from 'assert'
import helper from './_helper'
import { IpfsHash } from './_marketplaceHelpers'
import Table from 'cli-table'
import GasPriceInDollars from '../src/utils/gasPriceInDollars'

const gasPriceInDollars = GasPriceInDollars({
  gasPriceGwei: 8,
  pricePerEth: 500
})
let gasUsed = []
const trackGas = id => receipt => gasUsed.push([id, receipt.cumulativeGasUsed])
const gasOrder = `
Create Fractional Listing
Request Fractional Listing
Pay for Purchase
Seller Approve
Buyer Confirm Receipt
Seller Collect Payout
Create Unit Listing
Deployed Purchase
`.split('\n')

describe('Origin JS', async function() {
  var accounts, deploy
  var Buyer,
    // BuyerIdentity,
    Seller,
    ListingsRegistryStorage,
    ListingsRegistry,
    FractionalListing,
    Purchase

  before(async function() {
    ({ deploy, accounts } = await helper(
      `${__dirname}/../../origin-js/contracts/contracts/`
    ))

    Seller = accounts[1]
    Buyer = accounts[2]

    ListingsRegistryStorage = await deploy('ListingsRegistryStorage', {
      from: accounts[0]
    })
    ListingsRegistry = await deploy('ListingsRegistry', {
      from: accounts[0],
      args: [ListingsRegistryStorage._address]
    })
    await ListingsRegistryStorage.methods
      .setActiveRegistry(ListingsRegistry._address)
      .send({ from: accounts[0] })

    FractionalListing = await deploy('FractionalListing', {
      from: accounts[0],
      args: [Seller, IpfsHash]
    })

    Purchase = await deploy('Purchase', {
      from: Buyer,
      args: [FractionalListing._address, 0, IpfsHash, Buyer]
    })
  })

  after(function() {
    console.log()

    const gasTable = new Table({
      chars: { mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
      colAligns: ['left', 'right', 'right'],
      head: ['Transaction', 'Min', 'Max', 'Min $', 'Max $']
    })
    let used = []
    gasUsed.forEach(g => {
      var existing = used.findIndex(u => u[0] === g[0])
      if (existing < 0) {
        used.push([g[0], g[1], g[1]])
      } else {
        if (g[1] < used[existing][1]) used[existing][1] = g[1]
        if (g[2] > used[existing][2]) used[existing][2] = g[2]
      }
    })
    used = used.sort((a, b) => {
      if (gasOrder.indexOf(a[0]) > gasOrder.indexOf(b[0])) return 1
      if (gasOrder.indexOf(a[0]) < gasOrder.indexOf(b[0])) return -1
      return 0
    })

    used.forEach(u => {
      gasTable.push([...u, gasPriceInDollars(u[1]), gasPriceInDollars(u[2])])
    })
    console.log(gasTable.toString())
  })

  describe('Fractional Listing', function() {
    it('should allow creation', async function() {
      await ListingsRegistry.methods
        .createFractional(IpfsHash)
        .send({ from: Seller })
        .once('receipt', trackGas('Create Fractional Listing'))

      await ListingsRegistry.methods
        .createFractional(IpfsHash)
        .send({ from: Seller })
        .once('receipt', trackGas('Create Fractional Listing'))

      // fractionalAddress = frac.events.NewListing.returnValues._address
    })

    it('should allow request', async function() {
      const fl = await FractionalListing.methods
        .request(IpfsHash)
        .send({ from: Buyer, value: '100' })
        .once('receipt', trackGas('Request Fractional Listing'))
      assert(fl.events)
    })

    it('should allow payment', async function() {
      // const Listing = new web3.eth.Contract(
      //   FractionalListingContract.abi,
      //   fractionalAddress
      // )
      await Purchase.methods
        .pay()
        .send({ from: Buyer, value: '1' })
        .once('receipt', trackGas('Pay for Purchase'))

      await Purchase.methods
        .sellerApprove()
        .send({ from: Seller })
        .once('receipt', trackGas('Seller Approve'))

      await Purchase.methods
        .buyerConfirmReceipt(5, IpfsHash)
        .send({ from: Buyer })
        .once('receipt', trackGas('Buyer Confirm Receipt'))

      await Purchase.methods
        .sellerCollectPayout(5, IpfsHash)
        .send({ from: Seller })
        .once('receipt', trackGas('Seller Collect Payout'))
    })
  })

  // describe('Unit Listing', function() {
  //   it('unit', async function() {
  //     await ListingsRegistry.methods
  //       .create(IpfsHash, 0.1, 1)
  //       .send({ from: Seller })
  //       .once('receipt', trackGas('Create Unit Listing'))
  //
  //     await ListingsRegistry.methods
  //       .create(IpfsHash, 0.1, 1)
  //       .send({ from: Seller })
  //       .once('receipt', trackGas('Create Unit Listing'))
  //   })
  // })
})
