import React, { Component } from 'react'

import Modal from 'components/Modal'
import Loading from 'components/Loading'
import FormRow from 'components/FormRow'

import { ClaimTypes, claimType } from 'actions/Identity'

class NewClaimIssuer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      uri: '',
      preAdd: false,
      icon: 'key',
      claimType: '3',
      stage: 'main',
      signerServices: []
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
    return (
      <Modal
        style={{ maxWidth: 465 }}
        shouldClose={this.state.shouldClose}
        submitted={this.state.submitted}
        className="p-3"
        closeBtn={true}
        onClose={() => this.props.onClose()}
        onOpen={() => this.nameInput.focus()}
        onPressEnter={() => this.onDeploy()}
      >
        <Loading show={this.state.loading} />
        {this.state.stage === 'main'
          ? this.renderMain()
          : this.renderSignerService()}
      </Modal>
    )
  }

  renderMain() {
    var { identityType, activeAddress, identities } = this.props
    var otherTypeSameOwner = identities.find(
      i => i.type !== identityType && i.owner === activeAddress
    )
    return (
      <>
        <div className={`font-weight-bold${otherTypeSameOwner ? '' : ' mb-3'}`}>
          Deploy a new Claim Issuer contract:
        </div>
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
          </tbody>
        </table>
        {this.state.signerServices.length === 0 ? null : (
          <table className="table table-sm mb-2 mt-2">
            <thead>
              <tr>
                <th>Claim Type</th>
                <th className="text-center">Icon</th>
                <th>Service URL</th>
              </tr>
            </thead>
            <tbody>
              {this.state.signerServices.map((ss, idx) => (
                <tr key={idx}>
                  <td className="no-wrap">{claimType(ss.claimType)}</td>
                  <td className="text-center">
                    <i className={`fa fa-${ss.icon}`} />
                  </td>
                  <td>{ss.uri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            this.setState({
              stage: 'add-service',
              uri: '',
              icon: 'key',
              claimType: '7'
            })
          }}
        >
          <i className="fa fa-plus mr-2" />Add Claim Signer Service
        </a>
        <div className="d-flex mt-2">
          <button
            className="btn btn-primary ml-auto"
            onClick={() => this.onDeploy()}
          >
            Deploy
          </button>
        </div>
      </>
    )
  }

  renderSignerService() {
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
      <>
        <div className="font-weight-bold mb-3">
          Add Signer Service to Claim Issuer:
        </div>
        <table className="w-100">
          <tbody>
            <FormRow label="Claim Type">
              <select
                className="form-control"
                value={this.state.claimType}
                onChange={e => {
                  this.setState({
                    claimType: e.currentTarget.value
                  })
                }}
              >
                {ClaimTypes.map(ct => (
                  <option key={ct.id} value={ct.id}>
                    {ct.value}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="URL">
              <input
                type="text"
                className="form-control"
                value={this.state.uri}
                onChange={e => this.setState({ uri: e.currentTarget.value })}
              />
            </FormRow>
            <FormRow label="Icon">
              <div className="btn-group btn-group-sm">
                <Btn icon="key" />
                <Btn icon="facebook" />
                <Btn icon="twitter" />
                <Btn icon="google" />
                <Btn icon="github" />
                <Btn icon="linkedin" />
                <Btn icon="envelope-o" />
                <Btn icon="phone" />
                <Btn icon="cc-visa" />
              </div>
            </FormRow>
          </tbody>
        </table>
        <div className="d-flex mt-2">
          <button
            className="btn btn-outline-secondary ml-auto"
            onClick={() => {
              this.setState({ stage: 'main' })
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary ml-2"
            onClick={() => {
              this.setState({
                stage: 'main',
                signerServices: [
                  ...this.state.signerServices,
                  {
                    uri: this.state.uri,
                    icon: this.state.icon,
                    claimType: this.state.claimType
                  }
                ]
              })
            }}
          >
            Add
          </button>
        </div>
      </>
    )
  }

  onDeploy() {
    this.props.deployIdentityContract(
      this.state.name,
      this.props.identityType,
      this.state.uri,
      null,
      this.state.icon,
      this.state.signerServices
    )
  }
}

export default NewClaimIssuer
