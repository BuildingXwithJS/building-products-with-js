// npm packages
import React, {Component} from 'react';
import {Link} from 'react-router';

import NavbarLink from './navbarLink';
import Logout from './logout';

class NavBar extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      collapse: true,
    };
  }
  render() {
    const {actualPath, user} = this.props;
    const {collapse} = this.state;

    const handleClick = (e) => {
      e.preventDefault();
      this.setState({
        collapse: !collapse,
      });
      return false;
    };

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className={collapse ? 'navbar-toggle collapsed' : 'navbar-toggle'}
              onClick={handleClick}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">Experts</Link>
          </div>
          <div
            className={collapse ? 'navbar-collapse collapse' : 'navbar-collapse collapse in'}
            style={collapse ? {height: '1px'} : {}}
          >
            <ul className="nav navbar-nav">
              <NavbarLink path="/" actualPath={actualPath}>
                Browse questions
              </NavbarLink>
              <NavbarLink path="/create" actualPath={actualPath}>
                Create new question
              </NavbarLink>
            </ul>
            {user ? <ul className="nav navbar-nav navbar-right">
              <li><a>Logged as {user.login}{user.provider ? ` (${user.provider})` : null}</a></li>
              <Logout />
            </ul> : null}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
