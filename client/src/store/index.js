// npm packages
import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

// our packages
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

// instantiate epic middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

// pick debug or dummy enhancer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));

export default store;
