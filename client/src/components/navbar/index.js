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
      </div>
    </div>
  </nav>
);

export default connect(mapStateToProps)(NavBar);
