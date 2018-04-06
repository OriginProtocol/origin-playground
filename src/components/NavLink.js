import React from 'react'
import { Link, Route } from 'react-router-dom'

const NavLink = ({ to, exact, ...rest }) => (
  <Route exact={exact} path={to} children={({ match }) => (
    <li className={`nav-item${match ? ' active' : ''}`}>
      <Link className="nav-link" to={to} {...rest}/>
    </li>
  )}/>
)

export default NavLink
