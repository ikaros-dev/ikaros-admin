import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import i18n from '@/locales/index'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 60000 // 请求超时时间设置为1分钟，todo 这里大文件上传可能有点问题
})
console.log('current backend open api address: ' + process.env.VUE_APP_API_BASE_URL)
// 异常拦截处理器
const errorHandler = (error) => {
  console.log(error)
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      notification.error({
        message: i18n.tc('user.auth.forbidden.title'),
        description: i18n.tc('user.auth.forbidden.title') + ' : ' + data.message
      })
    }

    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: i18n.tc('user.auth.unauthorized.title'),
        description: i18n.tc('user.auth.unauthorized.desc')
      })
      // 从 localstorage 获取 token
      const token = storage.get(ACCESS_TOKEN)
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }

    if (error.response.status === 404) {
      notification.error({
        message: '404 not found',
        description: '404 not found' + ' : ' + data.message
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  // console.log(response.data)
  // console.log(response)
  const body = response.data
  if (body && body.code !== '200') {
    const msg = i18n.tc('request.data.code.fail.msg.prefix') + body.message
    return Promise.reject(msg)
  }
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
