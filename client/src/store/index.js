import {createStore, combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

const helloWorld = (state = {world: 'click me'}, action) => {
  switch (action.type) {
    case 'HELLO':
      return {world: 'World'};
    default:
      return state;
  }
};

export const helloWorldAction = () => ({
  type: 'HELLO',
});

const reducer = combineReducers({
  helloWorld,
  routing: routerReducer,
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
