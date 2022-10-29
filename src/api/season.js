import request from '@/utils/request'

const api = {
  basic: '/season',
  types: '/season/types',
  matchingEpisodeUrlByFileIds: '/season/matching/episodes'
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

export function matchingEpisodeUrlByFileIds (seasonId, fileIdList) {
  return request({
    url: api.matchingEpisodeUrlByFileIds,
    method: 'put',
    data: {
      'season_id': seasonId,
      'file_id_list': fileIdList
    }
  })
}
