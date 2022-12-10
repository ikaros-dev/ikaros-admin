import request from '@/utils/request'
import Utf8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'

const userApi = {
  Login: '/user/login',
  ForgePassword: '/user/forge-password',
  Register: '/user/register',
  UserInfo: '/user/info',
  userSubscribeByAnimeId: '/user/subscribe/anime',
  basic: '/user'
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

export function saveUserSubscribeByAnimeId (animeId, progress, additional) {
  const word = Utf8.parse(additional)
  additional = Base64.stringify(word)
  return request({
    url: userApi.userSubscribeByAnimeId + '/' + animeId,
    method: 'put',
    params: {
      'progress': progress,
      'additional': additional
    }
  })
}

export function deleteUserSubscribeByAnimeId (animeId) {
  return request({
    url: userApi.userSubscribeByAnimeId + '/' + animeId,
    method: 'delete'
  })
}

export function updateUser (userInfo) {
  return request({
    url: userApi.basic,
    method: 'put',
    data: userInfo
  })
}
