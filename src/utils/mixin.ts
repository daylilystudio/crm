import moment from 'moment'
import { isIOS } from 'mobile-device-detect'

// validate tool
export function onlyAllowTwID (rule:string, value:string, callback: any) {
  if (checkTwID(value)) {
    callback()
  } else {
    callback(new Error('ID format wrong'))
  }
}

export function checkTwID (value:any) {
  // 建立字母分數陣列(A~Z)
  const city = [1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30]
  value = value.toUpperCase()
  // 使用「正規表達式」檢驗格式
  if (value.search(/^[A-Z](1|2)\d{8}$/i) === -1) {
    return false
  } else {
    // 將字串分割為陣列(IE必需這麼做才不會出錯)
    value = value.split('')
    // 計算總分
    let total = city[value[0].charCodeAt(0) - 65]
    for (let i = 1; i <= 8; i++) {
      // eslint-disable-next-line no-eval
      total += eval(value[i]) * (9 - i)
    }
    // 補上檢查碼(最後一碼)
    // eslint-disable-next-line no-eval
    total += eval(value[9])
    // 檢查比對碼(餘數應為0);
    return ((total % 10 === 0))
  }
}

export function onlyAllowDigits (rule:string, value:string, callback: any) {
  const reg = /^[0-9]+$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('Only number'))
  }
}

export function onlyAllowLettersAndDigits (rule:string, value:string, callback: any) {
  const reg = /^[A-Za-z0-9_]+$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('only English, Number, underscore'))
  }
}

export function validEmail (rule:string, value:string, callback: any) {
  if (value === '') {
    callback()
  } else {
    const reg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('Email format error'))
    }
  }
}

export function notLargeThenEnd (rule:any, value:any, callback: any, end: any) {
  if (value && end && value > end) {
    callback(new Error('Start date cannot be greater than end date'))
  } else {
    callback()
  }
}

export function notLessThenStart (rule:any, value:any, callback: any, start: any) {
  if (value && start && value < start) {
    callback(new Error('End date cannot be greater than Start date'))
  } else {
    callback()
  }
}

// filter
export function formatDateYMD (val: any) {
  if (val) {
    return moment(String(val)).isValid() ? moment(String(val)).format('YYYY/MM/DD') : ''
  }
}

export function formatDateYMDhms (val: any) {
  if (val) {
    return moment(String(val)).isValid() ? moment(String(val)).format('YYYY-MM-DD HH:mm:ss') : ''
  }
}

export function permissionFilters (val: any) {
  let result = ''
  switch (val) {
    case 'create' : result = '新增'
      break
    case 'delete' : result = '刪除'
      break
    case 'update' : result = '修改'
      break
    case 'read' : result = '查詢'
      break
    case 'detail' : result = '查看'
      break
    case 'download' : result = '下載'
      break
    case 'assign' : result = '設定'
      break
    case 'finish' : result = '完成電訪'
      break
    case 'notify' : result = '通知'
      break
    case 'reject' : result = '駁回'
      break
    case 'retrieve' : result = '由排程取回'
      break
    case 'review' : result = '審核通過'
      break
  }
  return result
}

// download
export function base64ToArrayBuffer (base64: any) {
  const binaryString = window.atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

export function createDownload (blob: any, fileName: any) {
  if (isIOS) {
    const reader = new FileReader()
    // reader.fileName = fileName
    reader.onload = function () {
      (<any> window).location.href = reader.result
    }
    reader.readAsDataURL(blob)
  } else if (typeof (<any> window).navigator.msSaveBlob !== 'undefined') {
    (<any> window).navigator.msSaveBlob(blob, fileName)
  } else {
    const link = document.createElement('a')
    link.id = 'download-link'
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
  }
}

// date pick input (fix input box dose not appear on the mobile)
export function dateInputmode () {
  const dom = document.querySelectorAll('.el-date-editor input')
  dom.forEach(item => {
    item.setAttribute('inputmode', 'none')
  })
}
