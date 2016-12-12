import * as ActionTypes from '../actionTypes';

const initialState = {conn: null};

export const realtime = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.OPEN_WEBSOCKET_CONN:
      return {...state, conn: action.payload};
    case ActionTypes.CLOSE_WEBSOCKET_CONN:
      return {...state, conn: null};
    default:
      return state;
  }
};
