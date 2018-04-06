import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'

import network from './reducers/Network'
import wallet from './reducers/Wallet'
import identity from './reducers/Identity'

let middlewares = [thunkMiddleware]

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require(`redux-logger`)
  middlewares.push(logger)
}

export default createStore(
  combineReducers({
    wallet,
    network,
    identity
  }),
  applyMiddleware(...middlewares)
)
