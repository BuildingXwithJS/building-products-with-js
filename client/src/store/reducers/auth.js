// our packages
import * as ActionTypes from '../actionTypes';

const initialState = {
  token: localStorage.getItem('user.token'),
  user: localStorage.getItem('user.data'),
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_SUCCESS:
      return {
        redirectToLogin: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('user.token', action.payload.token);
      localStorage.setItem('user.data', action.payload.user);
      return {
        ...action.payload,
      };
    case ActionTypes.LOGIN_ERROR:
    case ActionTypes.REGISTER_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
