import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Listings from './Listings'
import Parties from './Parties'
import Listing from './Listing'

class Selector extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="pt-3">
        <div className="row">
          <div className="col-md-5">
            <Parties />
            <Listings />
          </div>
          <div className="col-md-7">
            <Switch>
              <Route path="/marketplace/listing/:idx" component={Listing} />
              <Route component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default Selector
