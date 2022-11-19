import request from '@/utils/request'

const api = {
  basic: '/network',
  reqBgmtvBangumiMetadata: '/network/metadata/bgmTv/subject',
  testProxyConnect: '/network/proxy/connect/test'
}

export function reqBgmtvBangumiMetadata (subjectId) {
  return request({
    url: api.reqBgmtvBangumiMetadata,
    method: 'put',
    params: {
      'id': subjectId
    }
  })
}

export function testProxyConnect () {
  return request({
    url: api.testProxyConnect,
    method: 'get'
  })
}
