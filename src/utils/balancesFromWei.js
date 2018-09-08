import numberFormat from './numberFormat'

export default function balancesFromWei(wei, context) {
  const eth = web3.utils.fromWei(wei, 'ether').substr(0, 7)
  const usd = '$' + numberFormat(Number(eth) * context.usd, 2)
  return { wei, eth, usd }
}
