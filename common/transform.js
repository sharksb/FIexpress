// 将mongoose取出的数据进行格式化
function transformFormat(data) {
  return JSON.parse(JSON.stringify(data))
}

// 对时间进行格式化 == 2020-05-14
function transformDate(time) {
  let newtime = new Date(time)
  let year = newtime.getFullYear()
  let month = newtime.getMonth() + 1
  let day = newtime.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return `${year}-${month}-${day}`
}


// 在有时间限制中将时间重新设置
function transformChangeMinute(date, time) {
  let min = date.getMinutes();
  date.setMinutes(min + parseInt(time))
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return `${year}-${month}-${day}  ${hours}:${minutes}`
}

// 将时间精确到分钟
function transformMinutes(date) {
  let newtime = new Date(date)
  let year = newtime.getFullYear()
  let month = newtime.getMonth() + 1
  let day = newtime.getDate()
  let hours = newtime.getHours()
  let minutes = newtime.getMinutes()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return `${year}-${month}-${day}  ${hours}:${minutes}`
}

// 
function formatArray(array) {

  let tem = "";
  let temarray = [];
  let j = 0;
  for (let i = 0; i < array.length; i++) {
      if (array[i] != tem) {
          temarray[j] = array[i];
          j++;
      }
      tem = array[i];
  }
  return temarray;
}

// 
module.exports = {
  transformFormat,
  transformDate,
  transformChangeMinute,
  transformMinutes,
  formatArray
}