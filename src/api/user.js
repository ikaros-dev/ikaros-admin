import request from '@/utils/request'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'

const userApi = {
  Login: '/user/login',
  ForgePassword: '/user/forge-password',
  Register: '/user/register',
  UserInfo: '/user/info',
  userSubscribeByAnimeId: '/user/subscribe/anime',
  basic: '/user',
  userPassword: '/user/password',
  userSubscribeWithBatchByAnimeIdArrBase64Json: '/user/subscribe/anime/ids'
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

export function saveUserSubscribeByAnimeId (animeId, progress) {
  // const word = Utf8.parse(additional)
  // additional = Base64.stringify(word)
  return request({
    url: userApi.userSubscribeByAnimeId + '/' + animeId,
    method: 'put',
    params: {
      'progress': progress
      // , 'additional': additional
    }
  })
}

export function saveUserSubscribeWithBatchByAnimeIdArr (animeIdArr) {
  const animeIdArrBase64Json = Base64.stringify(Utf8.parse(JSON.stringify(animeIdArr)))
  return request({
    url: userApi.userSubscribeWithBatchByAnimeIdArrBase64Json + '/' + animeIdArrBase64Json,
    method: 'put'
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

export function updateUserPassword (oldPassword, newPassword) {
  return request({
    url: userApi.userPassword,
    method: 'put',
    params: {
      oldPassword,
      newPassword
    }
  })
}
