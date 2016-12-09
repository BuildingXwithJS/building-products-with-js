import {Observable} from 'rxjs/Observable';

import {connPromise, r} from '../../util';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';

export const registerQuestionObservable = questionId =>
  Observable.fromPromise(connPromise)
  .concatMap(conn => Observable.fromPromise(r.table('Question').get(questionId).changes().run(conn)))
  .switchMap(cursor => Observable.create((observer) => {
    cursor.each((err, row) => {
      if (err) throw err;
      observer.next(row);
    })
    return function() {
      cursor.close();
    }
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
