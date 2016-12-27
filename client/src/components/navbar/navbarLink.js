// npm packages
import React from 'react';
import {Link} from 'react-router';

export default ({path, actualPath, children}) => (
  <li>
    {
      path !== actualPath ?
        <Link to={path}>{children}</Link>
      :
        <a><b>{children}</b></a>
    }
  </li>
);
