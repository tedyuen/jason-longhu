import { call, put, takeLatest, select } from 'redux-saga/effects';

export const SAGA_QUERY_PAGES = '@@SAGA_QUERY_PAGES/QUERY_STARTED';
export const SAGA_QUERY_TABS = '@@SAGA_QUERY_TABS/QUERY_STARTED';
export const SAGA_DELETE_ITEM = '@@SAGA_DELETE_ITEM/GOTO_FETCH';


export function* sagaQueryPages(action) {
  yield put({type:action.switchPagesType,pages:action.pages})
  yield put(action.api())
}

export function* sagaQueryTabs(action) {
  yield put({type:action.switchTabsType,tabs:action.tabs})
  yield put(action.api(action.params))
}

export function* sagaDeleteItem(action) {
  yield put({type:action.deleteItemType,ids:action.ids})
  yield put(action.api())
}
