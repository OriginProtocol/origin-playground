import React from 'react'

import Providers from './_Providers'
import Accounts from './_Accounts'
import IPFS from './_IPFS'

const Console = () => (
  <div>
    <div className="mt-3 row">
      <div className="col-md-1 col-lg-2 col-xl-3" />
      <div className="col-md-10 col-lg-8 col-xl-6">
        <Providers />
        <IPFS />
        <Accounts />
      </div>
    </div>
  </div>
)

export default Console
