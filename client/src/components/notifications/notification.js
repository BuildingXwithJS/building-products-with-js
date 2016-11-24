import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {removeNotificationAction} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  onRemoveNotificationClick: notificationId => dispatch(removeNotificationAction(notificationId)),
});

const Notification = ({onRemoveNotificationClick, notification}) => (
  <div className={`alert alert-dismissible alert-${notification.alertType}`} role="alert">
    <button
      type="button"
      className="close"
      data-dismiss="alert" aria-label="Close"
      onClick={() => onRemoveNotificationClick(notification.id)}
    >
      <span aria-hidden="true">&times;</span>
    </button>
    {notification.text}
  </div>
);

Notification.propTypes = {
  onRemoveNotificationClick: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(Notification);
