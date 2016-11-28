import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Notification from './notification';

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const Notifications = ({notifications}) => (
  <div>
    {
      notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))
    }
  </div>
);

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Notifications);
