import React, { Component } from 'react'
import format from 'date-fns/format'

import Dropdown from './Dropdown'

function fd(timestamp) {
  return format(new Date(timestamp * 1000), 'h:mm a')
}

const Item = props => (
  <a
    href="#"
    className="dropdown-item"
    onClick={e => {
      e.preventDefault()
      props.timeTravel(props.seconds)
    }}
  >
    {props.children}
  </a>
)

export default class TimeTraveler extends Component {
  render() {
    if (!this.props.network.block.number) {
      return null
    }
    return (
      <div>
        <Dropdown
          style={{ position: 'relative' }}
          linkClass=" nav-link"
          label={
            <>
              {`Block ${this.props.network.block.number} @ ${fd(
                this.props.network.block.timestamp
              )}`}
              <i className="fa fa-caret-down ml-2" />
            </>
          }
        >
          <Item {...this.props} seconds={60 * 60}>
            +1 hour
          </Item>
          <Item {...this.props} seconds={60 * 60 * 4}>
            +4 hours
          </Item>
          <Item {...this.props} seconds={60 * 60 * 12}>
            +12 hours
          </Item>
          <Item {...this.props} seconds={60 * 60 * 24}>
            +1 day
          </Item>
          <Item {...this.props} seconds={60 * 60 * 24 * 2}>
            +2 days
          </Item>
          <Item {...this.props} seconds={60 * 60 * 24 * 7}>
            +7 days
          </Item>
        </Dropdown>
      </div>
    )
  }
}
