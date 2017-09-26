
/**
 * 字符串转整型
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export const toInt = value => value === undefined || value === null ? 0 : parseInt(value)
