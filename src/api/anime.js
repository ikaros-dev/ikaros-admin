import request from '@/utils/request'

const api = {
  basic: '/anime',
  seasonWithAnimeId: '/anime/season/animeId',
  listDTOS: '/anime/dtos',
  findDTOById: '/anime/dto/id',
  deleteAnimeById: '/anime/id'
}

export function saveAnime (anime) {
  return request({
    url: api.basic,
    method: 'put',
    data: anime
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

export function deleteAnimeById (animeId) {
  return request({
    url: api.deleteAnimeById + '/' + animeId,
    method: 'delete'
  })
}
