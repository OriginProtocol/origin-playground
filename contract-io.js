var ans = Object.keys(localStorage).reduce((m, k) => {
  try {
    m[k] = JSON.parse(localStorage[k])
  } catch (e) {
    m[k] = localStorage[k]
  }
  return m
}, {})
copy(ans)

originTest.contractService.contracts.V00_Marketplace.networks['4'].address

const contracts = originTest.contractService.contracts
var ans = Object.keys(contracts).reduce((m, k) => {
    m[k] = contracts[k].networks['1'].address
  return m
}, {})
copy(JSON.stringify(ans))

localStorage.OGNContract = ans.OriginToken
localStorage.tokens = JSON.stringify({ "OGN": ans.OriginToken })
localStorage.marketplaceContract = ans.V00_Marketplace
localStorage.marketplaces = JSON.stringify({ "001": ans.V00_Marketplace })
localStorage.userRegistryContract = ans.V00_UserRegistry


{
  "OGNContract": "0x7B7beAB66E974aeBDd4751eC32F10c1a243116B9",
  localStorage["accountNames"] = JSON.stringify({
    "0x10483DC634325D4Fc2b29A8BD6058aF982196cC9": "Admin",
    "0x519db68D6a7F1d4b979C80355a5D59F1D32beD5f": "Stan",
    "0xF764C88454DF5967C8EE063D77A492c0b9B5ce11": "Nick",
    "0x5D20fFf7Daaa805Ea8bb048FFF05acFf7549d10B": "Origin",
    "0x19D0aA3246A884ddBd927990f854937Bb6039191": "Origin"
  })
  localStorage["accountRoles"] = JSON.stringify({
    "0x10483DC634325D4Fc2b29A8BD6058aF982196cC9": "Admin",
    "0x519db68D6a7F1d4b979C80355a5D59F1D32beD5f": "Seller",
    "0xF764C88454DF5967C8EE063D77A492c0b9B5ce11": "Buyer",
    "0x5D20fFf7Daaa805Ea8bb048FFF05acFf7549d10B": "Arbitrator",
    "0x19D0aA3246A884ddBd927990f854937Bb6039191": "Affiliate"
  })
  "defaultAccount": "0x19D0aA3246A884ddBd927990f854937Bb6039191",
  "loglevel:webpack-dev-server": "INFO",
  "marketplaceContract": "0x05A1CE37eAF7720742603260229b5d8c9c7D3FB6",
  localStorage["marketplaces"] = JSON.stringify({
    "001": "0x05A1CE37eAF7720742603260229b5d8c9c7D3FB6"
  })
  localStorage["privateKeys"] = JSON.stringify([
    "0x0f9f677dfc4cedc51b380a59e8006f598047b32b25dfdee3d96dfb7cdb2824c2",
    "0xc8461c732952b67debc8c2600d1d673354fc774dd4d67ade552b22f38339c55a",
    "0x0892b370ea621f6cedfcecc42365771979e68b583bca89842b19b9b116117939",
    "0x706628aa1d4156466efb7d90a0bb1bffe144d40c33941035e9033b89cdb8e704",
    "0x8eb0ceb4171ca5c1baa00d49608decf1f432abf8ea33e9ad504a3a4cf086225c"
  ])
  localStorage["tokens"] = JSON.stringify({
    "OGN": "0x7B7beAB66E974aeBDd4751eC32F10c1a243116B9"
  })
}



// IPFS Download

hashes = (await context.marketplace.getPastEvents('allEvents', { fromBlock: 3000000, toBlock: 'latest' })).map(e => e.returnValues.ipfsHash)
hashes = hashes.map(h => getIpfsHashFromBytes32(h))

hashes.map(h => `curl "https://ipfs.staging.originprotocol.com/ipfs/${h}" -o ${h} -m 2`).join("\n")
