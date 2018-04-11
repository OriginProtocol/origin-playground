import React, { Component } from 'react'
import RLP from 'rlp'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class NewIdentity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      uri: '',
      preAdd: false,
      icon: null
    }
  }

  async componentDidMount() {
    var address = this.props.activeAddress
    var nonce = await web3.eth.getTransactionCount(this.props.activeAddress)
    var nextContract =
      '0x' + web3.utils.sha3(RLP.encode([address, nonce])).substring(26, 66)
    this.setState({ nextContract })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response !== 'success' && nextProps.response === 'success') {
      this.setState({ shouldClose: true, submitted: true })
    }
    if (
      this.props.response !== 'submitted' &&
      nextProps.response === 'submitted'
    ) {
      this.setState({ loading: true })
    }
  }

  render() {
    var { identityType, activeAddress, identities } = this.props
    var otherTypeSameOwner = identities.find(
      i => i.type !== identityType && i.owner === activeAddress
    )

    const Btn = props => (
      <button
        className={`btn btn-outline-secondary${
          props.icon === this.state.icon ? ' active' : ''
        }`}
        onClick={() => {
          this.setState({
            icon: props.icon === this.state.icon ? null : props.icon
          })
        }}
      >
        <i className={`fa fa-${props.icon}`} />
      </button>
    )

    return (
      <Modal
        style={{ maxWidth: 375 }}
        shouldClose={this.state.shouldClose}
        submitted={this.state.submitted}
        className="p-3"
        onClose={() => this.props.onClose()}
        onOpen={() => this.nameInput.focus()}
        onPressEnter={() => this.onDeploy()}
      >
        <Loading show={this.state.loading} />
        <div
          className={`font-weight-bold${otherTypeSameOwner ? '' : ' mb-3'}`}
        >{`Deploy a new ${
          identityType === 'identity' ? 'Identity' : 'Certifier'
        } contract:`}</div>
        {otherTypeSameOwner && (
          <div className="alert alert-warning py-1 px-2 mt-2">
            {`You may want to use a different wallet`}
          </div>
        )}
        <table className="w-100">
          <tbody>
            <FormRow label="Name">
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                ref={r => (this.nameInput = r)}
                onChange={e => this.setState({ name: e.currentTarget.value })}
              />
            </FormRow>
            {identityType === 'identity' ? null : (
              <>
                <FormRow label="URI">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.uri}
                    onChange={e =>
                      this.setState({ uri: e.currentTarget.value })
                    }
                  />
                </FormRow>
                <FormRow label="Icon">
                  <div className="btn-group btn-group-sm">
                    <Btn icon="facebook" />
                    <Btn icon="twitter" />
                    <Btn icon="google" />
                    <Btn icon="github" />
                    <Btn icon="envelope-o" />
                    <Btn icon="phone" />
                    <Btn icon="cc-visa" />
                    <Btn icon="key" />
                  </div>
                </FormRow>
              </>
            )}
          </tbody>
        </table>

        <div className="d-flex mt-2">
          {identityType !== 'identity' ? null : (
            <>
              {(this.props.certifiers || []).map((c, idx) => (
                <button
                  key={idx}
                  className={`btn btn-${
                    this.state[`claimData-${c.address}`]
                      ? 'success'
                      : 'outline-secondary'
                  } mr-1`}
                  onClick={() => {
                    this.onCertify(c.address, '3', c.uri)
                  }}
                >
                  <i className={`fa fa-${c.icon}`} />
                </button>
              ))}
            </>
          )}
          <button
            className="btn btn-primary ml-auto"
            onClick={() => this.onDeploy()}
          >
            Deploy
          </button>
        </div>
      </Modal>
    )
  }

  onDeploy() {
    var args

    if (this.state.preAdd) {
      var claim

      args = args || [[], [], [], '', [], '', [], []]
      Object.keys(this.state).forEach(k => {
        var match = k.match(/^claimData-(.*)$/)
        if (match) {
          claim = this.state[k]
          args[0].push(claim.claimType)
          args[1].push(claim.claimScheme)
          args[2].push(claim.issuer)
          args[3] += args[3].length ? claim.signature.slice(2) : claim.signature
          args[4].push(claim.messageHash)
          args[5] += claim.uri
          args[6].push(claim.messageHash.length - 1)
          args[7].push(claim.uri.length)
        }
      })
    }

    this.props.deployIdentityContract(
      this.state.name,
      this.props.identityType,
      this.state.uri,
      args,
      this.state.icon
    )
  }

  onCertify(identity, claimType, href) {
    href = `${href}?target=${this.state.nextContract}&issuer=${identity}`

    var w = window.open(href, '', 'width=650,height=500')

    const finish = e => {
      if (String(e.data).match(/^signed-data:/)) {
        this.setState({
          preAdd: true,
          [`claimData-${identity}`]: {
            claimType: e.data.split(':')[3],
            claimScheme: '1',
            claimData: 'Verified OK',
            uri: '',
            issuer: identity,
            signature: e.data.split(':')[1],
            messageHash: web3.utils.soliditySha3('Verified OK')
          }
        })
      } else if (e.data !== 'success') {
        return
      }
      window.removeEventListener('message', finish, false)

      if (!w.closed) {
        w.close()
      }
    }

    window.addEventListener('message', finish, false)
  }
}

export default NewIdentity
