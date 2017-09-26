import {applyMiddleware, createStore, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {history} from '../router/history';
import LogRocket from 'logrocket';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// import promise from 'redux-promise';

import Perf from 'react-addons-perf'

import rootReducer from '../reducers/rootReducer';


import createSagaMiddleware from 'redux-saga'
// import { helloSaga,watchIncrementAsync } from '../components/demo/saga/saga';

// Create a history of your choosing (we're using a browser history in this case)
// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);

const logger = createLogger({
  // ...options
  options:{
    timestamp:true
  }
});

const sagaMiddleware = createSagaMiddleware()

// Be sure to ONLY add this middleware in development!
// const middlewares = process.env.NODE_ENV !== 'production' ?
//   [require('redux-immutable-state-invariant').default(), thunk,historyMiddleware,logger] :
//   [thunk,historyMiddleware,logger];
const middlewares = [
  require('redux-immutable-state-invariant').default(),
  thunk,
  // promise,
  historyMiddleware,
  sagaMiddleware,
  logger,
  LogRocket.reduxMiddleware()
];


const win = window;
win.Perf = Perf
const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, storeEnhancers);
  return store;
}

export default configureStore;
export {sagaMiddleware}
