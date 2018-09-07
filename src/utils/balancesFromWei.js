
export default function balancesFromWei(wei, context) {
  const eth = web3.utils.fromWei(wei, 'ether')
  const usd = String(Number(eth) * context.usd)
  return { wei, eth, usd }
}
