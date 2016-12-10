import React from 'react';
import {connect} from 'react-redux';

import {removeNotificationAction, getAnswers} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  onRemoveNotificationClick: notificationId => dispatch(removeNotificationAction(notificationId)),
  onGetAnswersClick: questionId => dispatch(getAnswers(questionId)),
});

const UpdateQuestionNotification = ({notificationId, question, onRemoveNotificationClick, onGetAnswersClick}) => {
  const onClickUpdate = (e) => {
    e.preventDefault();
    onRemoveNotificationClick(notificationId);
    onGetAnswersClick(question.id);
    return false;
  };

  const textAlert = (
    <div>
      Question with text &quot;{question.text}&quot; has been externally modified.
      Pulse <a href="#" onClick={onClickUpdate}>here</a> to update.
    </div>);

  return textAlert;
};

export default connect(null, mapDispatchToProps)(UpdateQuestionNotification);
