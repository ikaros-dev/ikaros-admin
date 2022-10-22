import request from '@/utils/request'

const api = {
  basic: '/anime',
  seasonWithAnimeId: '/anime/season/animeId',
  listDTOS: '/anime/dtos',
  findDTOById: '/anime/dto/id',
  removeAnimeSeason: '/anime/season/animeId',
  reqBgmtvBangumiMetadata2AddAnimeFleetly: '/anime/metadata/network/bgmTvId',
  findSeasonTypes: '/anime/season/types'
}

export function saveAnime (anime) {
  return request({
    url: api.basic,
    method: 'put',
    data: anime
  })
}

export function saveSeasonWithAnimeId (season, animeId) {
  return request({
    url: api.seasonWithAnimeId + '/' + animeId,
    method: 'put',
    data: season
  })
}

/**
 * params:
 *   page: 0
 *   size: 50
 *   title: undefined
 *   originalTitle: undefined
 */
export function listAnimeDTOS (params) {
  return request({
    url: api.listDTOS,
    method: 'get',
    params: params
  })
}

export function findAnimeDTOById (animeId) {
  return request({
    url: api.findDTOById + '/' + animeId,
    method: 'get'
  })
}

export function removeAnimeSeason (animeId, seasonId) {
  return request({
    url: api.removeAnimeSeason + '/' + animeId,
    method: 'delete',
    params: {
      'seasonId': seasonId
    }
  })
}

export function reqBgmtvBangumiMetadata2AddAnimeFleetly (bgmTvId) {
  return request({
    url: api.reqBgmtvBangumiMetadata2AddAnimeFleetly + '/' + bgmTvId,
    method: 'put'
  })
}

export function findSeasonTypes () {
  return request({
    url: api.findSeasonTypes,
    method: 'get'
  })
}
