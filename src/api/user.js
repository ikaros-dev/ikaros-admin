import request from '@/utils/request'

const userApi = {
  Login: '/user/login',
  ForgePassword: '/user/forge-password',
  Register: '/user/register',
  UserInfo: '/user/info',
  userSubscribeByAnimeId: '/user/subscribe/anime'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveUserSubscribeByAnimeId (animeId) {
  return request({
    url: userApi.userSubscribeByAnimeId + '/' + animeId,
    method: 'put'
  })
}

export function deleteUserSubscribeByAnimeId (animeId) {
  return request({
    url: userApi.userSubscribeByAnimeId + '/' + animeId,
    method: 'delete'
  })
}
