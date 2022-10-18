import request from '@/utils/request'

const api = {
  findOptionModelList: '/option/model/list',
  saveCommonOptionModel: '/option/model/common',
  saveSeoOptionModel: '/option/model/seo',
  saveFileOptionModel: '/option/model/file',
  saveOtherOptionModel: '/option/model/other'
}

export function findOptionModelList () {
  return request({
    url: api.findOptionModelList,
    method: 'get'
  })
}

export function saveCommonOptionModel (data) {
  return request({
    url: api.saveCommonOptionModel,
    method: 'post',
    data: data
  })
}

export function saveSeoOptionModel (data) {
  return request({
    url: api.saveSeoOptionModel,
    method: 'post',
    data: data
  })
}

export function saveFileOptionModel (data) {
  return request({
    url: api.saveFileOptionModel,
    method: 'post',
    data: data
  })
}

export function saveOtherOptionModel (data) {
  return request({
    url: api.saveOtherOptionModel,
    method: 'post',
    data: data
  })
}
