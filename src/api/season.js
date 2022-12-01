import request from '@/utils/request'

const api = {
  basic: '/season',
  types: '/season/types',
  matchingEpisodesUrlByFileIds: '/season/matching/episodes',
  matchingEpisodeUrlByFileId: '/season/matching/episode'
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

export function matchingEpisodesUrlByFileIds (seasonId, fileIdList) {
  return request({
    url: api.matchingEpisodesUrlByFileIds,
    method: 'put',
    data: {
      'seasonId': seasonId,
      'fileIdList': fileIdList
    }
  })
}

export function matchingEpisodeUrlByFileId (episodeId, fileId) {
  return request({
    url: api.matchingEpisodeUrlByFileId,
    method: 'put',
    data: {
      'episodeId': episodeId,
      'fileId': fileId
    }
  })
}
