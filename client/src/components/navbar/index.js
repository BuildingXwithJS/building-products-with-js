// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import NavbarLink from './navbarLink';

const mapStateToProps = state => ({
  actualPath: state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname,
});

const NavBar = ({actualPath}) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Experts</Link>
      </div>

      <ul className="nav navbar-nav">
        <NavbarLink path="/" actualPath={actualPath}>
          Browse questions
        </NavbarLink>
        <NavbarLink path="/create" actualPath={actualPath}>
          Create new question
        </NavbarLink>
      </ul>
    </div>
  </nav>
);

export default connect(mapStateToProps)(NavBar);
