// npm packages
import React from 'react';
import {BrowserRouter, Match, Miss} from 'react-router';

// our packages
import Home from '../home';
import Other from '../other';
import NotFound from '../notfound';

export default () => (
  <BrowserRouter>
    <div>
      <Match exactly pattern="/" component={Home} />
      <Match exactly pattern="/other" component={Other} />
      <Miss component={NotFound} />
    </div>
  </BrowserRouter>
);
