import { history } from '../../router/history'
import { path } from '../serverData/contentPath'
/**
 * 设置参数
 * @param  {[type]} params 参数内容
 * @param  {[type]} url    跳转的url
 * @return {[type]}        [description]
 */
export const putParams = (params,url) => {
  history.push({
    pathname:`${path}${url}`,
    state:params
  });
}

/**
 * 不带参数跳转
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export const pushHistory = (url) => {
  history.push({
    pathname:`${path}${url}`,
  });
}

/**
 * 获取参数(跨页面传参暂时全部用这些，以便后续增加功能)
 * @param  {[type]} key   [description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const getParams = (state) => {
  // console.log("params:==>  "+state.routing.location.state)
  return state.routing.location.state
}
