import request from '@/utils/request'

const api = {
  testQbittorrentConnect: '/tripartite/qbittorrent/connect/test',
  getBgmTvMe: '/tripartite/bgmtv/token/user/me'
}

export function testQbittorrentConnect () {
  return request({
    url: api.testQbittorrentConnect,
    mentions: 'get'
  })
}

export function getBgmTvMe () {
  return request({
    url: api.getBgmTvMe,
    method: 'get'
  })
}
