import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import * as ActionTypes from './actionTypes';

const initialState = {world: 'click me'};

const helloWorld = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.HELLO_WORLD:
      return {
        world: 'loading...',
      };
    case ActionTypes.HELLO_WORLD_END:
      return {
        world: action.payload.world,
      };
    default:
      return state;
  }
};

export default combineReducers({
  helloWorld,
  routing: routerReducer,
});
