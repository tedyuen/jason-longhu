import RSAA from './RSAA';
// import { normalize, schema } from 'normalizr';
// import { camelizeKeys } from 'humps';
import { isRSAA, validateRSAA } from './validation';
import { InvalidRSAA, RequestError } from './errors' ;
import { normalizeTypeDescriptors, actionWith } from './util';
import { serverUrl } from '../../utils/serverData/server';
import { isEmpty } from '../../utils/tools/objects'
import { NEED_TOKEN,PARAM_JSON } from './index'
import { loadingBlock, loadingNone } from '../../components/utils/loading/loadingDucks'

// require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';


// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => async (action) => {

  // Do not process actions without an [RSAA] property
  if (!isRSAA(action)) {
    return next(action);
  }
  // Try to dispatch an error request FSA for invalid RSAAs
  const validationErrors = validateRSAA(action);
  if (validationErrors.length) {
    const callAPI = action[RSAA];
    if (callAPI.types && Array.isArray(callAPI.types)) {
      let requestType = callAPI.types[0];
      if (requestType && requestType.type) {
        requestType = requestType.type;
      }
      next({
        type: requestType,
        payload: new InvalidRSAA(validationErrors),
        error: true
      });
    }
    return;
  }

  // Parse the validated RSAA action
  const callAPI = action[RSAA];
  var { endpoint, headers } = callAPI;
  endpoint = serverUrl+endpoint;
  const { method, body, bailout, types } = callAPI;
  const [requestType, successType, failureType] = normalizeTypeDescriptors(types);
  if(headers===undefined){
    headers = {

    }
  }
  // Should we bail out?
  try {
    if ((typeof bailout === 'boolean' && bailout) ||
        (typeof bailout === 'function' && bailout(store.getState()))) {
      return;
    }
  } catch (e) {
    return next(await actionWith(
      {
        ...requestType,
        payload: new RequestError('[RSAA].bailout function failed'),
        error: true
      },
      [action, store.getState()]
    ));
  }

  // Process [RSAA].endpoint function
  if (typeof endpoint === 'function') {
    try {
      endpoint = endpoint(store.getState());
    } catch (e) {
      return next(await actionWith(
        {
          ...requestType,
          payload: new RequestError('[RSAA].endpoint function failed'),
          error: true
        },
        [action, store.getState()]
      ));
    }
  }
  // Process [RSAA].headers function
  if (typeof headers === 'function') {
    try {
      //noinspection JSUnresolvedFunction
      headers = headers(store.getState());
    } catch (e) {
      return next(await actionWith(
        {
          ...requestType,
          payload: new RequestError('[RSAA].headers function failed'),
          error: true
        },
        [action, store.getState()]
      ));
    }
  }
  // We can now dispatch the request FSA
  next(await actionWith(
    requestType,
    [action, store.getState()]
  ));
  next(loadingBlock(successType.type))

  try{
    let json = JSON.parse(body.get(NEED_TOKEN));
    let loginData = JSON.parse(localStorage.getItem('loginData'));

    if(!isEmpty(json) && !isEmpty(loginData) && !isEmpty(loginData.token)) {
      json.token = loginData.token;
      body.append(PARAM_JSON,JSON.stringify(json));
      // body.delete(NEED_TOKEN);
    }
  }catch(e){
    console.log(e);
  }
  try {
    // Make the API call
    // needtoken

    // needtoken
    var res = await fetch(endpoint, { method, body, headers });
  } catch(e) {
    // The request was malformed, or there was a network error
    next(loadingNone(successType.type))
    return next(await actionWith(
      {
        ...requestType,
        payload: new RequestError(e.message),
        error: true
      },
      [action, store.getState()]
    ));
  }

  // Process the server response
  if (res.ok) {
    next(loadingNone(successType.type))
    return next(await actionWith(
      successType,
      [action, store.getState(), res]
    ));
  } else {
    next(loadingNone(successType.type))
    return next(await actionWith(
      {
        ...failureType,
        error: true
      },
      [action, store.getState(), res]
    ));
  }


}
