import objectAssign from 'object-assign'

let uid = Date.now()
export function nextUid () {
  return (uid++).toString(36)
}

export function format () {
  let args = [].slice.call(arguments)
  let str = args.shift()
  return str.replace(/{(\d+)}/g, function (match, number) {
    return args[number] !== undefined
      ? args[number]
      : match
  })
}

export function substitute (str, obj) {
  if (typeof str === 'string') {
    if (str.indexOf('{') < 0) {
      return obj[str]
    } else {
      return str.replace((/\\?\{([^{}]+)\}/g), function (match, name) {
        if (match.charAt(0) === '\\') {
          return match.slice(1)
        }
        return (obj[name] === null || obj[name] === undefined) ? '' : obj[name]
      })
    }
  } else if (typeof str === 'function') {
    let val = str(obj)
    if (val === obj && typeof val === 'object') {
      val = objectAssign({}, obj)
    }
    return val
  }
}

export function toArray (value, sep) {
  if (value === null || value === undefined) {
    value = []
  }
  if (typeof value === 'string' && sep) {
    value = value.split(sep)
  } else if (!(value instanceof Array)) {
    value = [sep ? value.toString() : value]
  } else if (sep) {
    // if use sep, convert every value to string
    value = value.map((v) => v.toString())
  }

  return value
}

export function toStyleObject (str) {
  if (!str) { return undefined }

  let style = {}
  let kv
  str.split(';').forEach((s) => {
    s = s.trim()
    if (!s) { return }

    kv = s.split(':')
    if (kv.length < 2) {
      console.warn('style is error')
      return
    }
    let key = kv[0].replace(/-./g, (r) => {
      return r.replace('-', '').toUpperCase()
    }).trim()
    style[key] = kv[1].trim()
  })

  return style
}

export function substring(str,length,needDot) {
  if(str.length<=length) {
    return str
  } else {
    if(needDot) {
      return str.substring(0,length)+'...'
    }
  }
}

/**
 * json对象转
 * @param  {[type]} param    [description]
 * @param  {[type]} needMark [需要不需要问号]
 * @return {[type]}          [description]
 */
export function parseParam (param,needMark){
  try{
    let sstr = JSON.stringify(param)
    sstr = sstr.replace(/\t/g, "");
    sstr = sstr.replace(/\"/g, "").replace("{", "").replace("}", "").replace(",", "&").replace(":", "=");
    sstr = sstr.replace(/\"/g, "").replace(/{/g, "").replace(/}/g, "").replace(/,/g, "&").replace(/:/g, "=");

    return needMark?"?"+encodeURI(sstr):encodeURI(sstr)
  }catch(e){
    return ""
  }
}
