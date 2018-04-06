import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, HashRouter } from 'react-router-dom'

import Store from './Store'
import App from './pages/App'

ReactDOM.render(
  <Provider store={Store}>
    <HashRouter>
      <Route component={App} />
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)

require('react-styl').addStylesheet()
