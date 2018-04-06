import web3 from 'Web3'

export default function decodeFn(Contract, data) {
  var methodSigs = Contract.abi.filter(a => a.type === 'function').reduce((m, fn) => {
    m[web3.eth.abi.encodeFunctionSignature(fn)] = fn
    return m
  }, {})

  var methodAbi = methodSigs[data.slice(0, 10)]
  return { name: methodAbi.name, params: web3.eth.abi.decodeParameters(methodAbi.inputs, data.slice(10)) }
}
