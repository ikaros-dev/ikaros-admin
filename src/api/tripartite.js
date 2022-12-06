import request from '@/utils/request'

const api = {
  testQbittorrentConnect: '/tripartite/qbittorrent/connect/test',
  getBgmTvMe: '/tripartite/bgmtv/token/user/me',
  findDmhyRssItems: '/tripartite/dmhy/rss/items/anime'
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
export function findDmhyRssItems (animeId, seq) {
  return request({
    url: api.findDmhyRssItems + '/' + animeId,
    method: 'get',
    params: {
      'seq': seq
    }
  })
}
