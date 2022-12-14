import Vue from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { FileTypes, FilePlaces } from '@/core/constants'
import { ANIME_SEASON_TYPE_MAP, USER_SUB_PROGRESS_MAP } from '@/store/mutation-types'

dayjs.locale('zh-cn')

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm') {
  return dayjs(dataStr).format(pattern)
})

Vue.filter('moment_post_date', function (dataStr, pattern = '/YYYY/MM/') {
  return dayjs(dataStr).format(pattern)
})

Vue.filter('moment_post_year', function (dataStr, pattern = '/YYYY/') {
  return dayjs(dataStr).format(pattern)
})

Vue.filter('moment_post_day', function (dataStr, pattern = '/YYYY/MM/DD/') {
  return dayjs(dataStr).format(pattern)
})

Vue.filter('fileSizeFormat', function (value) {
  if (!value) {
    return '0 Bytes'
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const srcsize = parseFloat(value)
  const index = Math.floor(Math.log(srcsize) / Math.log(1024))
  let size = srcsize / Math.pow(1024, index)
  size = size.toFixed(2)
  return size + ' ' + unitArr[index]
})

Vue.filter('dayTime', function (value) {
  const days = Math.floor(value / 86400)
  const hours = Math.floor((value % 86400) / 3600)
  const minutes = Math.floor(((value % 86400) % 3600) / 60)
  const seconds = Math.floor(((value % 86400) % 3600) % 60)
  return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's'
})

// 文件类型 => 对应文本
Vue.filter('fileTypeText', function (type) {
  return type ? FileTypes[type].text : ''
})

// 文件位置 => 对应文本
Vue.filter('fileTypePlace', function (place) {
  return place ? FilePlaces[place].text : ''
})

// 文件位置 => 对应文本
Vue.filter('str2boolean', function (str) {
  return str === 'true'
})

Vue.filter('seasonTypeFilter', function (value) {
  if (ANIME_SEASON_TYPE_MAP.get(value)) {
    return ANIME_SEASON_TYPE_MAP.get(value)
  } else {
    return value
  }
})

Vue.filter('userSubProgressFilter', function (value) {
  if (USER_SUB_PROGRESS_MAP.get(value)) {
    return USER_SUB_PROGRESS_MAP.get(value)
  } else {
    return value
  }
})
