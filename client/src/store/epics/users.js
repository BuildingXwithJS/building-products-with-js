import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import {signRequest} from '../../util/signRequest';

export const getUser = action$ => action$
  .ofType(ActionTypes.GET_USER)
  .map(signRequest)
  .switchMap(({payload, headers}) => Observable
    .ajax.get(`${API_HOST}/api/user/${payload.id}`, headers)
    .map(res => res.response)
    .map(user => ({
      type: ActionTypes.GET_USER_SUCCESS,
      payload: {user},
    }))
    .catch(error => Observable.of({
      type: ActionTypes.GET_USER_ERROR,
      payload: {error},
    })),
  );

export const updateUser = action$ => action$
  .ofType(ActionTypes.UPDATE_USER)
  .map(signRequest)
  .switchMap(({payload, headers}) => Observable
    .ajax.post(`${API_HOST}/api/user/${payload.id}`, payload, headers)
    .map(res => res.response)
    .map(user => ({
      type: ActionTypes.UPDATE_USER_SUCCESS,
      payload: {user},
    }))
    .catch(error => Observable.of({
      type: ActionTypes.UPDATE_USER_ERROR,
      payload: {error},
    })),
  );
