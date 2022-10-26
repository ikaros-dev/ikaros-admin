import request from '@/utils/request'

const api = {
  findPresetOptionList: '/option/preset/list',
  saveCommonPresetOption: '/option/preset/common',
  saveSeoPresetOption: '/option/preset/seo',
  saveFilePresetOption: '/option/preset/file',
  saveThirdPartyOption: '/option/preset/thirdparty',
  saveOtherPresetOption: '/option/preset/other'
}

export function findPresetOptionList () {
  return request({
    url: api.findPresetOptionList,
    method: 'get'
  })
}

export function saveCommonPresetOption (data) {
  return request({
    url: api.saveCommonPresetOption,
    method: 'put',
    data: data
  })
}

export function saveSeoPresetOption (data) {
  return request({
    url: api.saveSeoPresetOption,
    method: 'put',
    data: data
  })
}

export function saveFilePresetOption (data) {
  return request({
    url: api.saveFilePresetOption,
    method: 'put',
    data: data
  })
}

export function saveOtherPresetOption (data) {
  return request({
    url: api.saveOtherPresetOption,
    method: 'put',
    data: data
  })
}

export function saveThirdPartyOption (data) {
  return request({
    url: api.saveThirdPartyOption,
    method: 'put',
    data: data
  })
}
