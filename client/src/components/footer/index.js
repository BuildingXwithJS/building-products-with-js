// npm packages
import React from 'react';

import {Notifications} from '../notifications';

const style = {
  footer: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
  },
};

export default () => (
  <footer style={style.footer}>
    <div className="row">
      <div className="col-xs-11 col-sm-9 col-md-7">
        <Notifications />
      </div>
    </div>
  </footer>
);
