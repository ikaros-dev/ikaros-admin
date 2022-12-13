import request from '@/utils/request'

const api = {
  search: '/metadata/search'
}

export function searchAnime (keyword) {
  return request({
    url: api.search,
    method: 'get',
    params: {
      'keyword': keyword
    }
  })
}
