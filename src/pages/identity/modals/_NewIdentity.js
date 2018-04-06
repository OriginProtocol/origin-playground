import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

class NewIdentity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      uri: 'http://localhost:3001/r?target=TARGET&issuer=ISSUER',
      preAdd: false
    }
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

    return (
      <Modal
        style={{ maxWidth: 375 }}
        shouldClose={this.state.shouldClose}
        submitted={this.state.submitted}
        onClose={() => this.props.onClose()}
        onOpen={() => this.nameInput.focus()}
        onPressEnter={() => this.onDeploy()}
      >
        <div className="p-3">
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
            <FormRow label="URI">
              <input
                type="text"
                className="form-control"
                value={this.state.uri}
                onChange={e => this.setState({ uri: e.currentTarget.value })}
              />
            </FormRow>
          )}

          <div className="d-flex">
            <button
              className={`btn btn-${
                this.state['claimData-3'] ? 'success' : 'outline-secondary'
              }`}
              onClick={() => {
                this.onCertify(
                  '0x7478258bf67bDFbdAAE71A963DA1119240088074',
                  '3',
                  'http://localhost:3001/r?dataOnly=1&target=123&issuer=456'
                )
              }}
            >
              <i className="fa fa-facebook" />
            </button>
            <button
              className={`btn btn-${
                this.state['claimData-4'] ? 'success' : 'outline-secondary'
              } ml-2`}
              onClick={() => {
                this.onCertify(
                  '0xbb67846882b43D64251732C926108c5faDB99809',
                  '4',
                  'http://localhost:3001/t'
                )
              }}
            >
              <i className="fa fa-twitter" />
            </button>
            <button
              className="btn btn-primary ml-auto"
              onClick={() => this.onDeploy()}
            >
              Deploy
            </button>
          </div>
        </div>
      </Modal>
    )
  }

  onDeploy() {
    var args

    if (this.state.preAdd) {
      var claim

      args = args || [[], [], [], '', [], '', [], []]
      if (this.state['claimData-3']) {
        claim = this.state['claimData-3']
        args[0].push(claim.claimType)
        args[1].push(claim.claimScheme)
        args[2].push(claim.issuer)
        args[3] += args[3].length ? claim.signature.slice(2) : claim.signature
        args[4].push(claim.messageHash)
        args[5] += claim.uri
        args[6].push(claim.messageHash.length - 1)
        args[7].push(claim.uri.length)
      }
      if (this.state['claimData-4']) {
        claim = this.state['claimData-4']
        args[0].push(claim.claimType)
        args[1].push(claim.claimScheme)
        args[2].push(claim.issuer)
        args[3] += args[3].length ? claim.signature.slice(2) : claim.signature
        args[4].push(claim.messageHash)
        args[5] += claim.uri
        args[6].push(claim.messageHash.length - 1)
        args[7].push(claim.uri.length)
      }
    }

    this.props.deployIdentityContract(
      this.state.name,
      this.props.identityType,
      this.state.uri,
      args
    )
  }

  onCertify(identity, claimType, href) {
    var w = window.open(href, '', 'width=650,height=500')

    const finish = e => {
      if (String(e.data).match(/^signed-data:/)) {
        this.setState({
          preAdd: true,
          [`claimData-${claimType}`]: {
            claimType,
            claimScheme: '1',
            claimData: '{"username":"abc"}',
            uri: 'id.originprotocol.com/user/abc',
            issuer: identity,
            signature: e.data.split(':')[1],
            messageHash: e.data.split(':')[2]
          }
        })
      } else if (e.data !== 'success') {
        return
      }
      window.removeEventListener('message', finish, false)

      setTimeout(() => {
        if (!w.closed) {
          w.close()
        }
      }, 1500)
    }

    window.addEventListener('message', finish, false)
  }
}

export default NewIdentity
