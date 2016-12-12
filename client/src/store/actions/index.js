import * as ActionTypes from '../actionTypes';

let nextNotificationId = 0;

export const helloWorldAction = () => ({
  type: ActionTypes.HELLO_WORLD,
});

export const initAuthAction = () => ({
  type: ActionTypes.INIT_AUTH,
});

export const loginAction = payload => ({
  type: ActionTypes.DO_LOGIN,
  payload,
});

export const githubLoginAction = payload => ({
  type: ActionTypes.DO_GITHUB_LOGIN,
  payload,
});


export const logoutAction = () => ({
  type: ActionTypes.DO_LOGOUT,
});

export const registerAction = payload => ({
  type: ActionTypes.DO_REGISTER,
  payload,
});

/**
 * Add a notification to the store.
 * @param {String} text - text to display
 * @param {String} alertType - Bootstrap alert style: success | info | warning | danger
*/
export const addNotificationAction = payload => ({
  type: ActionTypes.ADD_NOTIFICATION,
  payload: {
    id: nextNotificationId++,
    ...payload,
  },
});

export const getNextNotificationId = () => nextNotificationId;


/**
 * Remove a notification from the store.
 * @param {String} notificationId
*/
export const removeNotificationAction = notificationId => ({
  type: ActionTypes.REMOVE_NOTIFICATION,
  payload: {notificationId},
});

export const removeNotificationByRefAction = notificationRef => ({
  type: ActionTypes.REMOVE_NOTIFICATION_BY_REF,
  payload: {notificationRef},
});


export const getMoreQuestions = payload => ({
  type: ActionTypes.GET_MORE_QUESTIONS,
  payload,
});

export const addObservable = observable => ({
  type: ActionTypes.ADD_OBSERVABLE,
  payload: observable,
});

export const removeObservable = payload => ({
  type: ActionTypes.REMOVE_OBSERVABLE,
  payload,
});

export const getAnswers = questionId => ({
  type: ActionTypes.GET_ANSWERS,
  payload: {questionId},
});

export const answerQuestion = payload => ({
  type: ActionTypes.ANSWER_QUESTION,
  payload,
});

export const createQuestion = payload => ({
  type: ActionTypes.CREATE_QUESTION,
  payload,
});
