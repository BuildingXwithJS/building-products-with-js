// npm packages
import React from 'react';
import {Link} from 'react-router';

const createLink = ({label, link, isText}) => isText ? (
  <a><b>{label}</b></a>
) : (
  <Link to={link}>{label}</Link>
);

export default ({user, current}) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Brand</Link>
      </div>

      <ul className="nav navbar-nav">
        <li>
          {createLink({label: 'Browse questions', link: '/', isText: current === '/'})}
        </li>
        <li>
          {createLink({label: 'Create new question', link: '/create', isText: current === '/create'})}
        </li>
      </ul>

      {user && (
        <ul className="nav navbar-nav navbar-right">
          <li>
            {createLink({label: `Logged in as "${user.login}"`, link: '/profile/me', isText: current === '/profile/me'})}
          </li>
        </ul>
      )}
    </div>
  </nav>
);
