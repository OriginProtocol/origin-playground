import { setContext } from '../context'

async function setNetwork(_, { network }) {
  setContext(network)
  return true
}

export default setNetwork
