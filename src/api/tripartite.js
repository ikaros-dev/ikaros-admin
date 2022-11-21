import request from '@/utils/request'

const api = {
  testQbittorrentConnect: '/tripartite/qbittorrent/connect/test'
}

export function testQbittorrentConnect () {
  return request({
    url: api.testQbittorrentConnect,
    mentions: 'get'
  })
}
