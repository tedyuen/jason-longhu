import {applyMiddleware, createStore, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {history} from '../router/history';
// import { createLogger } from 'redux-logger';

import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';
import createSagaMiddleware from 'redux-saga'
// Create a history of your choosing (we're using a browser history in this case)
// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware()

// const logger = createLogger({
//   // ...options
//   options:{
//     timestamp:true
//   }
// });


const middlewares = [
  thunk,
  historyMiddleware,
  sagaMiddleware,
];

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
);

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, storeEnhancers);
  return store;
}
export default configureStore;
export {sagaMiddleware}
