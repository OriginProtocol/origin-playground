let transactions = [
  // '0xfd1a57994ab26a1f67e31fc9240d4269397ac35f584a4ca969e4df78fa854c11'
]

const pct = {}
const status = {}

export async function getTransactions() {
  let results = []
  for (let hash of transactions) {
    const t = await web3.eth.getTransaction(hash)
    pct[hash] = pct[hash] || 0
    pct[hash] += 0.05
    results.push({
      id: hash,
      ...t,
      pct: pct[hash],
      status: status[hash]
    })
  }
  return results
}

export function addTransaction(hash) {
  transactions.push(hash)
  status[hash] = 'In pool'
}

export function updateTransactionStatus(hash, newStatus) {
  status[hash] = newStatus
}
