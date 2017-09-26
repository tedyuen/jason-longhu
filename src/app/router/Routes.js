import React from 'react'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../router/history';
import configureStore,{sagaMiddleware} from '../store/configureStore';
import { MainRouter } from './MainRouter';
import rootSaga from '../middleware/saga/index'

let initStore = {

}
const store = configureStore(initStore);

sagaMiddleware.run(rootSaga);

const Routes = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MainRouter></MainRouter>
    </ConnectedRouter>
  </Provider>
)

export default Routes;
