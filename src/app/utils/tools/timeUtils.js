import { isEmpty } from './objects'
export function formatDate(){
  Date.prototype.format = function(format) {
    var date = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
       format = format.replace(RegExp.$1, RegExp.$1.length === 1
              ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;
  }
}

export function timeToString (time,format) {
  let newDate = new Date();
  newDate.setTime(time);
  if(isEmpty(format)){
    return newDate.format('yyyy-MM-dd hh:mm:ss')
  }else{
    return newDate.format(format)
  }
}

export function stringToTime(date,time) {
  let temp = date + " " + time
  temp = temp.replace(/-/g, "/")
  return Date.parse(temp)
}
