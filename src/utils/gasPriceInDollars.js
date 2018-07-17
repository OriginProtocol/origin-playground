export default function({ gasPriceGwei = 8, pricePerEth = 500 }) {
  return function(gas) {
    var pricePerGwei = pricePerEth / 1000000000,
      priceInUsd = gas * gasPriceGwei * pricePerGwei
    return priceInUsd ? '$' + (Math.round(priceInUsd * 100) / 100).toFixed(2) : ''
  }
}
