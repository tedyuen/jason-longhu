import { call, put, takeLatest, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { RequestError } from './errors'
import { serverUrl,serverMockUrl } from '../../utils/serverData/server'
import { loadingBlock, loadingNone } from '../../components/utils/loading/loadingDucks'
import { isEmpty } from '../../utils/tools/objects'
import { SUCCESS,errorToken } from '../../utils/serverData/code'
import { failureBigBox } from '../../components/utils/actions/MessageActions'
import { pushHistory } from '../../utils/tools/params'

export const SAGA_FETCH = '@@SAGA_FETCH/FETCH_STARTED';
export const SAGA_FETCH_LAST_CHANNEL_1= '@@SAGA_FETCH_LAST_1/FETCH_STARTED';
export const SAGA_FETCH_LAST_CHANNEL_2= '@@SAGA_FETCH_LAST_2/FETCH_STARTED';
export const SAGA_FETCH_LAST_CHANNEL_3= '@@SAGA_FETCH_LAST_3/FETCH_STARTED';
export const POST = 'POST'
export const GET = 'GET'
export const PUT = 'PUT'
export const DELETE = 'DELETE'

const SAGA_TAKE_ADD_DATA = '@@SAGA_TAKE_ADD_DATA'

const addSagaTakeData = atype => ({
  type:SAGA_TAKE_ADD_DATA,
  atype
})

const getSagaType = (state) => {
  return state.sagaType.types
}

export const sagaTakeData = (state = {
  types:new Set()
},action) => {
  switch (action.type) {
    case SAGA_TAKE_ADD_DATA:
      return {
        types:state.types.add(action.atype)
      }
    default:
      return state;
  }
}


/**
 * 执行fetch请求
 * @param  {[type]}  params    [description]
 * @param  {[type]}  fetchData [description]
 * @return {Promise}           [description]
 */
const doFetch = async (params,fetchData) => {
  let headers = {
  }
  if(fetchData.fetch.needToken) {
    let loginData = JSON.parse(localStorage.getItem('loginData'));
    if(!isEmpty(loginData) && !isEmpty(loginData.token)) {
      // headers.token = loginData.token;
      // params.token = loginData.token;
      Object.assign(headers,{
        token:loginData.token
      })
    }
  }
  let url = serverUrl
  if(fetchData.fetch.isMock){
    url = serverMockUrl
  }
  try {
    if(fetchData.fetch.method === POST ) {
      var res = await fetch(
        url + fetchData.fetch.endpoint,
        {
          method: fetchData.fetch.method,
          body: JSON.stringify(params),
          headers
        }
      );
    }else if(fetchData.fetch.method === PUT) {
      // console.log("------> url: " + (url + fetchData.fetch.endpoint+(params.url!==undefined?params.url:"")));
      var res = await fetch(
        url + fetchData.fetch.endpoint + (params.url !== undefined ? params.url : ""),
        {
          method: fetchData.fetch.method,
          body: JSON.stringify(params.params),
          headers
        }
      );
    }else if(fetchData.fetch.method === GET || fetchData.fetch.method === DELETE) {
      var res = await fetch(
        url + fetchData.fetch.endpoint + params,
        {
          method: fetchData.fetch.method,
          headers
        }
      );
    }
  } catch(e) {
    return new RequestError(e);
  }
  if(res.ok) {
    return await (res.json());
  }else{
    return new RequestError('response is not ok');
  }
}

/**
 * 执行saga fetch
 * @return {Generator} [description]
 */
export function* sagaFetch(action) {
  const [requestType, successType, failureType] = action.fetch.types;
  const sagaTypes = yield select(getSagaType)
  // if(!sagaTypes.has(successType)) {
  //   yield put(addSagaTakeData(successType))
  //   yield takeLatest(successType,action.whenSuccess);
  //   yield takeLatest(failureType,action.whenFailure);
  // }
  yield takeLatest(successType,action.whenSuccess);
  yield takeLatest(failureType,action.whenFailure);
  try {
    yield put({type:requestType})
    if(action.fetch.needLoading){
      yield put(loadingBlock(successType))
    }
    const params = yield select(action.getParams);
    const response = yield call(doFetch,params,action);
    if(Object.prototype.toString.call(response) === '[object Error]') {
      yield put({type:failureType,response})
    }else{
      if(response.code !== SUCCESS) {
        failureBigBox('请求失败',response.content)
        if(errorToken(response.code)) {
          pushHistory('/login')
        }
      }

      yield put({type:successType,payload:response})
    }
    if(action.fetch.needLoading){
      yield put(loadingNone(successType))
    }
  } catch(error) {
    yield put({type:failureType,error})
    if(action.fetch.needLoading){
      yield put(loadingNone(successType))
    }
  }
}
