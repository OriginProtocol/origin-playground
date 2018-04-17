import numberFormat from './numberFormat'

export default function(wei, exchangeRates) {
  var eth = web3.utils.fromWei(wei, 'ether')
  var balance = {
    wei,
    eth,
    ethStr: `${numberFormat(Number(eth), 4)} ETH`
  }
  Object.keys(exchangeRates).forEach(currency => {
    balance[currency] =
      Math.round(exchangeRates[currency] * Number(eth) * 100) / 100
    balance[currency + 'Str'] = '$' + numberFormat(balance[currency], 2)
  })
  return balance
}
