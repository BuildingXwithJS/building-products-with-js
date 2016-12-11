import {Observable} from 'rxjs/Observable';
import {connect} from 'rethinkdb-websocket-client';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {server as serverConfig} from '../../../config';

// Open a WebSocket connection to the server to send RethinkDB queries over
const options = {
  host: serverConfig.host, // hostname of the websocket server
  port: serverConfig.port,  // port number of the websocket server
  // path: '/realtime',       // HTTP path to websocket route
  secure: false,     // set true to use secure TLS websockets
  db: 'expertsdb',        // default database, passed to rethinkdb.connect
};

export const addObservable = (action$, {dispatch, getState}) => action$
  .ofType(ActionTypes.ADD_OBSERVABLE)
  .mergeMap(({payload: observableFn}) => {
    const {conn} = getState().realtime;
    if (conn && conn.isOpen()) {
      const observable = observableFn(conn, getState);
      return observable.takeUntil(
        Observable.merge(
          action$.ofType(ActionTypes.REMOVE_OBSERVABLE)
            .filter(action => action.payload.observable === observableFn),
          action$.ofType(ActionTypes.CLOSE_WEBSOCKET_CONN),
        ),
      );
    } else {
      return Observable.empty();
    }
  }).catch(error => Observable.of(
      Actions.addNotificationAction({text: `[add observable error] ${error.toString()}`, alertType: 'danger'}),
  ));

export const openConnection = (action$, {dispatch, getState}) => action$
  .ofType(ActionTypes.LOGIN_SUCCESS, ActionTypes.INIT_AUTH_SUCCESS)
  .switchMap(() => {
    const {token} = getState().auth;
    options.path = `/realtime?authToken=${token}`;
    return Observable.fromPromise(connect(options));
  })
  .do((conn) => {
    if (conn && conn.isOpen()) {
      conn.on('close', () => {
        dispatch({
          type: ActionTypes.CLOSE_WEBSOCKET_CONN,
        });
      });
    }
  })
  .map(conn =>
    ({
      type: ActionTypes.OPEN_WEBSOCKET_CONN,
      payload: conn,
    }),
  )
  .catch(error => Observable.of(
    Actions.addNotificationAction({text: `[open websocket error] ${error.toString()}`, alertType: 'danger'}),
  ));


export const closeConnection = (action$, {getState}) => action$
  .ofType(ActionTypes.DO_LOGOUT)
  .switchMap(() => {
    const {conn} = getState().realtime;
    if (conn && conn.isOpen()) {
      return Observable.fromPromise(conn.close()).mapTo({
        type: ActionTypes.CLOSE_WEBSOCKET_CONN,
      });
    } else {
      return Observable.of({
        type: ActionTypes.CLOSE_WEBSOCKET_CONN,
      });
    }
  })
  .catch(error => Observable.of(
    Actions.addNotificationAction({text: `close websocket error] ${error.toString()}`, alertType: 'danger'}),
  ));
