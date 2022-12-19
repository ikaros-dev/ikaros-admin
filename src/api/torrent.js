import request from '@/utils/request'

const api = {
  add: '/torrent/add'
}

export function torrentAdd (url) {
  return request({
    url: api.add,
    method: 'put',
    data: url
  })
}
