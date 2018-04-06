import React from 'react'

const NavItem = props => (
  <li className="nav-item">
    <a
      className={`nav-link${props.selected === props.id ? ' active' : ''}`}
      href="#"
      onClick={e => {
        e.preventDefault()
        props.onClick(props.id)
      }}
    >
      {props.label}
    </a>
  </li>
)

export default NavItem
