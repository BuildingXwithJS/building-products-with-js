// our packages
import * as ActionTypes from '../actionTypes';

const initialState = () => ({
  token: null,
  user: null,
});

export const auth = (state = initialState(), action) => {
  switch (action.type) {
    case ActionTypes.INIT_AUTH_SUCCESS:
      return {
        ...action.payload,
      };
    case ActionTypes.REGISTER_SUCCESS:
      return {
        redirectToLogin: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('user.token', action.payload.token);
      localStorage.setItem('user.data', JSON.stringify(action.payload.user));
      return {
        ...action.payload,
      };
    case ActionTypes.LOGIN_ERROR:
    case ActionTypes.REGISTER_ERROR:
      // TODO: probably necessary in the future
      return state;
    case ActionTypes.DO_LOGOUT:
      localStorage.removeItem('user.token');
      localStorage.removeItem('user.data');
      return initialState();
    default:
      return state;
  }
};
