import React, { Component } from 'react'
import numberFormat from 'utils/numberFormat'

import GasPrice from 'utils/gasPriceInDollars'
const price = GasPrice({})

class GasTracker extends Component {
  constructor() {
    super()
    this.state = {
      to: 0,
      anim: 'is-entering',
      active: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.items.length > prevProps.items.length) {
      this.setState({
        show: true,
        to: prevProps.items.length,
        anim: 'is-entering',
        active: false
      })
      setTimeout(() => this.setState({ active: true }), 10)

      clearTimeout(this.hideTimeout)
      clearTimeout(this.hideTimeout2)
      this.hideTimeout = setTimeout(() => {
        this.setState({ anim: 'is-leaving', active: false })
        setTimeout(() => this.setState({ active: true }), 10)
        this.hideTimeout2 = setTimeout(
          () => this.setState({ show: false, active: false }),
          300
        )
      }, 4000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hideTimeout)
    clearTimeout(this.hideTimeout2)
  }

  render() {
    if (!this.state.show) return null
    var items = this.props.items.slice(this.state.to)
    return (
      <div
        className={`alert alert-success popup px-2 py-1 ${this.state.anim}${
          this.state.active ? ' is-active' : ''
        }`}
      >
        {items.map((i, idx) => (
          <div key={idx}>{`Gas used: ${numberFormat(i)} (${price(i)})`}</div>
        ))}
      </div>
    )
  }
}

export default GasTracker

require('react-styl')(`
  .alert.popup
    position: fixed
    bottom: 0.5rem
    right: 1rem
    z-index: 100

  .popup.is-entering
      opacity: 0;
      transition-duration: .2s;
      transition-timing-function: ease

  .popup.is-active.is-entering
      opacity: 1

  .popup.is-leaving
      opacity: 1;
      transition-duration: .2s;
      transition-timing-function: ease-in-out

  .popup.is-active.is-leaving
      opacity: 0
`)
