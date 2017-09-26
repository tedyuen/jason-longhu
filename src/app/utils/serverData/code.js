export const SUCCESS = '200'

export const AK00001 = 'AK00001'
export const AK00002 = 'AK00002'
export const AK00003 = 'AK00003'

export const LG00001 = 'LG00001'
export const LG00002 = 'LG00002'
export const LG00003 = 'LG00003'
export const LG00004 = 'LG00004'
export const LG00005 = 'LG00005'
export const LG00006 = 'LG00006'

export const SY00001 = 'SY00001'
export const SY00002 = 'SY00002'
export const SY00003 = 'SY00003'
export const SY00004 = 'SY00004'

export const errorToken = (code) => {
  if(code === AK00001
    || code === AK00002
    || code === AK00003
    || code === LG00001
    || code === LG00004
    || code === LG00005
    || code === LG00006) {
      return true
    }else{
      return false
    }
}
