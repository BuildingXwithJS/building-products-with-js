import {Observable} from 'rxjs/Observable';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {loginErrorToMessage, registerErrorToMessage} from '../../util';
import {server as serverConfig} from '../../../config';

const host = serverConfig.host;
const port = serverConfig.port;

const getUser = () => {
  const storedUser = localStorage.getItem('user.data');
  // parse use from stored string
  let user;
  try {
    user = JSON.parse(storedUser);
  } catch (e) {
    console.error('Error parsing user data', e);
  }
  return user;
};

export const initAuth = action$ => action$
  .ofType(ActionTypes.INIT_AUTH)
  .switchMap(() => {
    const payload = {
      user: getUser(),
      token: localStorage.getItem('user.token'),
    };

    if (payload.token) {
      return Observable.of({
        type: ActionTypes.INIT_AUTH_SUCCESS,
        payload,
      });
    } else {
      return Observable.empty();
    }
  })

// ASCII diagram for Rx Streams (see: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

// Success login:
// --(DO_LOGIN|)
//       switchMap(credentials => ajax)
// -------------(token|)
//       mergeMap
// -------------(LOGIN_SUCCESS with token|)
// -------------(ADD_NOTIFICATION with login success|)

// Failed login:
// --(DO_LOGIN|)
//       switchMap(credentials => ajax)
// -------------(X|)
//       catch
// -------------(LOGIN_ERROR, ADD_NOTIFICATION with login error|)
export const login = action$ => action$
  .ofType(ActionTypes.DO_LOGIN)
  .switchMap(({payload}) => Observable
    .ajax.post(`http://${host}:${port}/api/login`, payload)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: response,
      },
      Actions.addNotificationAction(
        {text: 'Login success', alertType: 'info'}),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.LOGIN_ERROR,
        payload: {
          error,
        },
      },
      Actions.addNotificationAction({text: loginErrorToMessage(error), alertType: 'danger'}),
    )),
  );

export const githubLogin = action$ => action$
  .ofType(ActionTypes.DO_GITHUB_LOGIN)
  .switchMap(({payload}) => {
    if (payload.error) {
      return Observable.of(
        {
          type: ActionTypes.LOGIN_ERROR,
          payload: {
            error: payload.error,
          },
        },
        Actions.addNotificationAction({text: `GitHub Login error: ${payload.error}`, alertType: 'danger'}),
      );
    } else {
      return Observable.of(
        {
          type: ActionTypes.LOGIN_SUCCESS,
          payload,
        },
        Actions.addNotificationAction(
          {text: 'GitHub Login success', alertType: 'info'}),
      );
    }
  });

// Similar to login
export const register = action$ => action$
  .ofType(ActionTypes.DO_REGISTER)
  .switchMap(({payload}) => Observable
    .ajax.post(`http://${host}:${port}/api/register`, payload)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.REGISTER_SUCCESS,
        payload: response,
      },
      Actions.addNotificationAction(
        {text: 'Register success', alertType: 'info'},
      ),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.REGISTER_ERROR,
        payload: {
          error,
        },
      },
      Actions.addNotificationAction({text: registerErrorToMessage(error), alertType: 'danger'}),
    )),
  );

export const logout = action$ => action$
    .ofType(ActionTypes.DO_LOGOUT)
    .switchMap(() => Observable.of(
      Actions.addNotificationAction({text: 'Logout success', alertType: 'info'}),
    ));
