// npm packages
import React from 'react';

import {Notifications} from '../notifications';

const style = {
  footer: {
    zIndex: 9999,
    position: 'fixed',
    bottom: '0',
  },
};

export default () => (
  <footer style={style.footer} className="col-xs-11">
    <div className="col-md-8">
      <Notifications />
    </div>
  </footer>
);
