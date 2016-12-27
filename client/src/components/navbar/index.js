// npm packages
import React from 'react';
import {Link} from 'react-router';

import NavbarLink from './navbarLink';
import Logout from './logout';

const NavBar = ({actualPath, user}) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#navbar"
          aria-expanded="false"
          aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link to="/" className="navbar-brand">Experts</Link>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <NavbarLink path="/" actualPath={actualPath}>
            Browse questions
          </NavbarLink>
          <NavbarLink path="/create" actualPath={actualPath}>
            Create new question
          </NavbarLink>
        </ul>
        {user ? <ul className="nav navbar-nav navbar-right">
          <li><a>Logged as {user.login}</a></li>
          <Logout />
        </ul> : null}
      </div>
    </div>
  </nav>
);

export default NavBar;
