import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {loginErrorToMessage, registerErrorToMessage} from '../../util';


// ASCII diagram for Rx Streams (see: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

// Success login:
// --(DO_LOGIN|)
//       switchMap(credentials => ajax)
// -------------(token|)
//       map
// -------------(LOGIN_SUCCESS with token|)
//       concat
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
    .ajax.post('http://localhost:8080/api/login', payload)
    .map(res => res.response)
    .map(response => ({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: response,
    }))
    .concat(Observable.of(
      Actions.addNotificationAction(
        {text: 'Login success', alertType: 'info'},
    )))
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

// Similar to login
export const register = action$ => action$
  .ofType(ActionTypes.DO_REGISTER)
  .switchMap(({payload}) => Observable
    .ajax.post('http://localhost:8080/api/register', payload)
    .map(res => res.response)
    .map(response => ({
      type: ActionTypes.REGISTER_SUCCESS,
      payload: response,
    }))
    .concat(Observable.of(
      Actions.addNotificationAction(
        {text: 'Register success', alertType: 'info'},
    )))
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
