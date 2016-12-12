import React from 'react';
import {Observable} from 'rxjs/Observable';
import {rethinkdb} from 'rethinkdb-websocket-client';
import _ from 'lodash';

import * as Actions from '../actions';
import {UpdateQuestionNotification} from '../../components/question';

const r = rethinkdb;

export const registerQuestionObservable = questionId => (conn, getState) =>
  Observable.fromPromise(r.table('Question').filter({id: questionId}).changes().run(conn))
  .switchMap(cursor => Observable.create((observer) => {
    cursor.each((err, row) => {
      if (err) throw err;
      observer.next(row);
    });
    return function() {
      cursor.close();
    };
  }).debounceTime(5000))
  .map(row => row.new_val)
  .filter((question) => {
    if (!question) {
      return false;
    }
    const storedQuestion = _.find(getState().questions.questions, {id: question.id});
    return !storedQuestion || !_.isEqual(storedQuestion.answers, question.answers);
  })
  .map((question) => {
    const notificationId = Actions.getNextNotificationId();
    return Actions.addNotificationAction({
      text: <UpdateQuestionNotification notificationId={notificationId} question={question} />,
      alertType: 'warning',
      autoDisposable: false,
      refCode: `update-question-${question.id}`,
    });
  })
  .catch(error => Observable.of(
    Actions.addNotificationAction({text: error.toString(), alertType: 'danger'}),
  ));
