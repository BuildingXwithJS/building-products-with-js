import * as ActionTypes from '../actionTypes';

export const helloWorldAction = () => ({
  type: ActionTypes.HELLO_WORLD,
});

export const loginAction = payload => ({
  type: ActionTypes.DO_LOGIN,
  payload,
});

export const registerAction = payload => ({
  type: ActionTypes.DO_REGISTER,
  payload,
});

let nextNotificationId = 0;

/** 
 * Add a notification to the store.
 * @param {String} text - text to display
 * @param {String} alertType - Bootstrap alert style: success | info | warning | danger
*/ 
export const addNotificationAction = ({text, alertType}) => ({
  type: ActionTypes.ADD_NOTIFICATION,
  payload: {
    id: nextNotificationId++,
    text,
    alertType,
  },
});

/** 
 * Remove a notification from the store.
 * @param {String} notificationId
*/ 

export const removeNotificationAction = notificationId => ({
  type: ActionTypes.REMOVE_NOTIFICATION,
  payload: {notificationId},
});
