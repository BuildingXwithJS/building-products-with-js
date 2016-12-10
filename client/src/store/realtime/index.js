import {Observable} from 'rxjs/Observable';
import {rethinkdb} from 'rethinkdb-websocket-client';
import _ from 'lodash';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';

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
  .map(question => Actions.addNotificationAction(
    {
      text: `Question with text "${question.text}" has been externally modified.`,
      alertType: 'warning',
      autoDisposable: false,
      duplicationCode: `update-question-${question.id}`,
    }))
  .catch(error => Observable.of(
    Actions.addNotificationAction({text: error.toString(), alertType: 'danger'}),
  ));
