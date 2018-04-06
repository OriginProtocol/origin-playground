import React, { Component } from 'react'

export default class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.onBlur = this.onBlur.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onToggle = this.onToggle.bind(this)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onBlur)
  }

  render() {
    var size = this.props.size,
      active = this.state.open ? ' active' : '',
      disabled = this.props.disabled ? ' disabled' : ''

    return (
      <div
        className={this.props.className}
        style={this.props.style}
        onMouseOver={() => this.setState({ mouseOver: true })}
        onMouseOut={() => this.setState({ mouseOver: false })}
        onMouseDown={null}
        onClick={this.props.disabled ? null : this.onClick}
      >
        <a
          href="#"
          onClick={this.props.disabled ? null : this.onToggle}
          onMouseDown={e => {
            if (this.props.onMouseDown) {
              this.props.onMouseDown(e)
            }
          }}
          onMouseOver={e => {
            if (this.props.onMouseOver && !this.state.open) {
              this.props.onMouseOver(e)
            }
          }}
          onMouseOut={e => {
            if (this.props.onMouseOut) {
              this.props.onMouseOut(e)
            }
          }}
          className={`${size + active + disabled + this.props.linkClass}`}
        >
          {this.props.label}
          {this.props.caret && <i className="fa fa-caret-down ml-2" />}
        </a>
        {!this.state.open ? null : (
          <div
            className="dropdown-menu show"
            style={{ display: 'block', left: 'auto', right: 0, minWidth: 130 }}
            children={this.props.children}
          />
        )}
      </div>
    )
  }

  onToggle(e) {
    e.preventDefault()
    if (this.state.open) {
      document.removeEventListener('click', this.onBlur)
    } else {
      document.addEventListener('click', this.onBlur)
    }
    this.setState({ open: !this.state.open })
  }

  onClick() {
    if (this.state.open) {
      this.setState({ mouseOver: true, open: false })
      document.removeEventListener('click', this.onBlur)
    }
  }

  onBlur() {
    if (!this.state.mouseOver) {
      this.setState({ open: false })
    }
  }
}

Dropdown.defaultProps = {
  size: '',
  style: { position: 'relative', display: 'inline-block' }
}
