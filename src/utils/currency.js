export default function currency(obj) {
  if (!obj) return null
  let { amount, currency } = obj
  if (currency === 'OGN') {
    amount = web3.utils.fromWei(amount, 'ether')
  }
  return `${amount} ${currency}`
}
