import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
    <li> <h2 className="line-sep">  </h2>
    </li>
    <li>
      <NavLink to="/create" exact>Create</NavLink>
    </li>
    <li>
      <NavLink to="/cases">View All</NavLink>
    </li>
    <li>
      <NavLink to="/mycases">Your Case Studies</NavLink>
    </li>
    <li>
      <NavLink to="/logout">Logout</NavLink>
    </li>
  </ul>
};

export default NavLinks;
