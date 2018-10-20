export default function currency(obj) {
  if (!obj) return null
  let { amount, currency, converted } = obj
  if (currency === 'OGN' && !converted) {
    amount = web3.utils.fromWei(amount, 'ether')
  }
  return `${amount} ${currency}`
}
