import request from '@/utils/request'

const api = {
  basic: '/anime',
  seasonWithAnimeId: '/anime/season/animeId'
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