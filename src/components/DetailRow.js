import React, { Component } from 'react'

class DetailRow extends Component {
  constructor() {
    super()
    this.state = { expanded: false }
  }
  render() {
    var { label, className } = this.props
    return (
      <tr
        className={className}
        onMouseDown={() => this.setState({ mouseDown: +new Date() })}
        onMouseUp={() => {
          if (this.state.mode === 'info') {
            this.setState({ mode: null })
          } else if (
            this.state.expanded &&
            +new Date() - this.state.mouseDown < 250
          ) {
            this.setState({ expanded: false })
          } else if (!this.state.expanded) {
            this.setState({ expanded: true })
          }
        }}
      >
        <th className="pr-2 text-right label">{label}</th>
        <td className="w-100 position-relative">
          {this.state.mode === 'info' ? (
            <div className="">{this.props.info}</div>
          ) : (
            <div className={this.state.expanded ? 'wb' : 'ellipsis'}>
              {this.props.children}
            </div>
          )}
        </td>
        <td className="info">
          {!this.props.info ? null : (
            <a
              href="#"
              className={`ml-2${this.state.mode === 'info' ? ' active' : ''}`}
              onClick={e => e.preventDefault()}
              onMouseUp={e => {
                e.stopPropagation()
                if (this.state.mode === 'info') {
                  this.setState({ mode: null, expanded: false })
                } else {
                  this.setState({ mode: 'info', expanded: false })
                }
              }}
            >
              <i className={`fa fa-info-circle`} />
            </a>
          )}
        </td>
      </tr>
    )
  }
}

export default DetailRow
