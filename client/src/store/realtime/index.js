import {Observable} from 'rxjs/Observable';
import {rethinkdb} from 'rethinkdb-websocket-client';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';

const r = rethinkdb;

export const registerQuestionObservable = questionId => conn =>
  Observable.fromPromise(r.table('Question').get(questionId).changes().run(conn))
  .switchMap(cursor => Observable.create((observer) => {
    cursor.each((err, row) => {
      if (err) throw err;
      observer.next(row);
    });
    return function() {
      cursor.close();
    };
  }))
  .map(row => row.new_val)
  .filter(question => !!question)
  .map(question => ({
    type: ActionTypes.GET_ANSWERS_SUCCESS,
    payload: question,
  }))
  .catch(error => Observable.of(
    Actions.addNotificationAction({text: error.toString(), alertType: 'danger'}),
  ));
