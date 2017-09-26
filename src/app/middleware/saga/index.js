import { takeLatest,takeEvery } from 'redux-saga/effects';
// import { helloSaga,watchIncrementAsync } from '../../components/demo/saga/saga';

function* rootSaga() {

  yield [
    // fork(helloSaga),
    // fork(watchIncrementAsync),
  ]
}

export default rootSaga
