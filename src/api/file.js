import request from '@/utils/request'

const api = {
  basic: '/file',
  upload: '/file/data',
  list: '/file/list',
  listByName: '/file/list/name',
  types: '/file/types',
  places: '/file/places',
  updateName: '/file/name'
}

export function upload (file, onUploadProgress) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: api.upload,
    method: 'put',
    onUploadProgress: onUploadProgress,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function listByPaging (params) {
  return request({
    url: api.list,
    method: 'post',
    data: params
  })
}

export function listByName (name) {
  return request({
    url: api.listByName + '/' + name,
    method: 'get'
  })
}

// 文件类型
export function listTypes () {
  return request({
    url: api.types,
    method: 'get'
  })
}

// 文件的存储位置
export function listPlaces () {
  return request({
    url: api.places,
    method: 'get'
  })
}

export function deleteById (id) {
  return request({
    url: api.basic,
    method: 'delete',
    params: id
  })
}

export function deleteInBatch (ids) {
  return request({
    url: api.basic,
    method: 'delete',
    params: ids
  })
}

export function updateNameById (id, name) {
  return request({
    url: api.updateName,
    method: 'put',
    params: {
      'id': id,
      'name': name
    }
  })
}
