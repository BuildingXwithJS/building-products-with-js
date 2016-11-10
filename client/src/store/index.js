// npm packages
import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

// our packages
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

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
const store = createStore(rootReducer, middlewares);

export default store;
