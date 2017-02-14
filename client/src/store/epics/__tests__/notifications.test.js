import Rx from 'rxjs';
import {ActionsObservable} from 'redux-observable';
import * as ActionTypes from '../../actionTypes';
import {addNotification} from '../notifications';

// increase test timeout to 6s
jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;

test('# notifications epic', (done) => {
  const payload = {id: 0};
  const input = {type: ActionTypes.ADD_NOTIFICATION, payload};
  const input$ = ActionsObservable.from([input]);

  addNotification(input$)
  .subscribe((res) => {
    expect(res).toEqual({type: 'REMOVE_NOTIFICATION', payload: {notificationId: 0}});
    done();
  });
});
