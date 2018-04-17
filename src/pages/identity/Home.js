import React, { Component } from 'react'

class Home extends Component {

  render() {
    return (
      <div>
        <div className="mb-3">
          <i className="fa fa-arrow-left mr-2" />Select a contract for more
          information
        </div>
        <hr />
        <div className="mb-2">
          <div className="font-weight-bold">Identity</div>
          Controlled by Keys. Has Claims, can add Claims to other identities.
        </div>
        <div className="mb-2">
          <div className="font-weight-bold">Claim Issuer</div>
          Also an Identity. Trusted by Protected Contracts to certify
          Identities with Claims.
        </div>
        <div className="mb-2">
          <div className="font-weight-bold">Claim Checker</div>
          A contract only allowing interactions from Identites holding Claims
          from a trusted issuer.
        </div>
        <div className="mb-2">
          <div className="font-weight-bold">Claim</div>
          Some data on one Identity that provably came from another Identity.
        </div>
      </div>
    )
  }
}

export default Home
