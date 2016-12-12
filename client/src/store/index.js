// npm packages
import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

// our packages
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';
import {initAuthAction} from './actions'

// instantiate epic middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

// pick debug or dummy enhancer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const preparedRouterMiddleware = routerMiddleware(browserHistory);
const middlewares = composeEnhancers(
  applyMiddleware(epicMiddleware),
  applyMiddleware(preparedRouterMiddleware),
);

// create store
const store = createStore(rootReducer, {}, middlewares);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

store.dispatch(initAuthAction());

export default store;
