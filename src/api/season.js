import request from '@/utils/request'

const api = {
  basic: '/season',
  types: '/season/types'
}

export function removeSeason (seasonId) {
  return request({
    url: api.basic,
    method: 'delete',
    params: {
      'id': seasonId
    }
  })
}

export function saveSeason (season) {
  return request({
    url: api.basic,
    method: 'put',
    data: season
  })
}

export function findSeasonTypes () {
  return request({
    url: api.types,
    method: 'get'
  })
}
