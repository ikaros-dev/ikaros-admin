import request from '@/utils/request'

const api = {
  testQbittorrentConnect: '/tripartite/qbittorrent/connect/test',
  getBgmTvMe: '/tripartite/bgmtv/token/user/me',
  findDmhyRssItemsByAnimeId: '/tripartite/dmhy/rss/items/anime',
  findDmhyRssItems: '/tripartite/dmhy/rss/items'
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
export function findDmhyRssItemsByAnimeId (animeId, seq) {
  return request({
    url: api.findDmhyRssItemsByAnimeId + '/' + animeId,
    method: 'get',
    params: {
      'seq': seq
    }
  })
}

export function findDmhyRssItems (keyword) {
  return request({
    url: api.findDmhyRssItems,
    method: 'get',
    params: {
      'keyword': keyword
    }
  })
}
