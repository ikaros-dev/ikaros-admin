import request from '@/utils/request'

const api = {
  mailTest: '/notify/mail/test'
}

export function mailTest (notify) {
  return request({
    url: api.mailTest,
    method: 'post',
    data: notify
  })
}
