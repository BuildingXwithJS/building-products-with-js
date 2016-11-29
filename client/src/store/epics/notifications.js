import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';

export const addNotification = action$ => action$
  .ofType(ActionTypes.ADD_NOTIFICATION)
  .mergeMap(({payload: notification}) =>
    Observable.of(Actions.removeNotificationAction(notification.id))
    .delay(5000)
    .takeUntil(
      action$.ofType(ActionTypes.REMOVE_NOTIFICATION)
      .filter(({payload: {notificationId}}) => notification.id === notificationId),
    ),
  );
