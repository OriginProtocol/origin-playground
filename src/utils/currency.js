export default function currency({ amount, currency }) {
  if (currency === 'OGN') {
    amount = web3.utils.fromWei(amount, 'ether')
  }
  return `${amount} ${currency}`
}
