import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Notification from './notification';
import transitions from './transitions.css';

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const Notifications = ({notifications}) => (
  <div>
    <ReactCSSTransitionGroup
      transitionName={transitions}
      transitionEnterTimeout={700}
      transitionLeaveTimeout={700}>
      {
        notifications.map(notification => (
          <Notification key={notification.id} notification={notification} />
        ))
      }
    </ReactCSSTransitionGroup>
  </div>
);

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Notifications);
