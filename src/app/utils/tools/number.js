
export const yuanToCent = (yuan) => {
  try{
    return parseFloat(yuan)*100
  }catch(e){
    console.log(e)
  }
}

export const centToYuan = (cent) => {
  try{
    return parseFloat(cent)/100
  }catch(e){
    console.log(e)
  }
}

/**
 * 判断输入的数字是否为整数
 * @param  {[type]}  number [description]
 * @return {Boolean}        [description]
 */
export const isInteger = (number) => {
  return typeof number === 'number' && number%1 === 0
}
