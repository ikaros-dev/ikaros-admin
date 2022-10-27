import request from '@/utils/request'

const api = {
  basic: '/network',
  reqBgmtvBangumiMetadata: '/network/metadata/bgmTv/subject'
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
