import request from '@/utils/request'

const api = {
  getOptionAppIsInit: '/option/app/is-init',
  postOptionAppInit: '/option/app/init',
  getOptionList: '/option/list',
  saveOptionWithRequest: '/option'
}

export function getOptionAppIsInit () {
  return request({
    url: api.getOptionAppIsInit,
    method: 'get'
  })
}

export function postOptionAppInit (data) {
  return request({
    url: api.postOptionAppInit,
    method: 'post',
    data: data
  })
}

export function getOptionList () {
  return request({
    url: api.getOptionList,
    method: 'get'
  })
}

export function saveOptionWithRequest (req) {
  return request({
    url: api.saveOptionWithRequest,
    method: 'post',
    data: req
  })
}
