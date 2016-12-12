import _ from 'lodash';

import * as ActionTypes from '../actionTypes';

const initialState = [];
export const notifications = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION: {
      const {payload} = action;
      const {refCode} = payload;

      if (refCode && _.find(state, {refCode})) {
        return state;
      }

      return [
        payload,
        ...state,
      ];
    }
    case ActionTypes.REMOVE_NOTIFICATION: {
      const notificationId = action.payload.notificationId;
      return state.filter(notification => notification.id !== notificationId);
    }
    case ActionTypes.REMOVE_NOTIFICATION_BY_REF: {
      const notificationRef = action.payload.notificationRef;
      return state.filter(notification =>
        !('refCode' in notification) ||
        !notification.refCode.includes(notificationRef)
      );
    }
    default:
      return state;
  }
};
