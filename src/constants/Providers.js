const HOST = process.env.HOST || 'localhost'

export default [
  {
    name: 'Localhost',
    endpoints: [`http://${HOST}:8545`, `ws://${HOST}:8545`]
  },
  {
    name: 'Ropsten',
    endpoints: ['https://ropsten.infura.io', 'wss://ropsten.infura.io/ws'],
    faucet: 'http://faucet.ropsten.be:3001'
  },
  {
    name: 'Rinkeby',
    endpoints: ['https://rinkeby.infura.io', 'wss://rinkeby.infura.io/ws'],
    faucet: 'https://faucet.rinkeby.io'
  },
  {
    name: 'Mainnet',
    endpoints: ['https://mainnet.infura.io', 'wss://mainnet.infura.io/ws']
  },
  {
    name: 'Kovan',
    endpoints: ['https://kovan.infura.io'],
    website: 'https://kovan-testnet.github.io/website',
    faucet: 'https://github.com/kovan-testnet/faucet'
  }
  // {
  //   name: 'Custom'
  // }
]
