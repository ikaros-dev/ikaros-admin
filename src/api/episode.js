import request from '@/utils/request'

const api = {
  basic: '/episode'
}

export function removeEpisode (episodeId) {
  return request({
    url: api.basic,
    method: 'delete',
    params: {
      'id': episodeId
    }
  })
}

export function saveEpisode (episode) {
  return request({
    url: api.basic,
    method: 'put',
    data: episode
  })
}
