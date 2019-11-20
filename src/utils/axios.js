import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { push } from 'connected-react-router'
import { message } from 'antd'
import { getToken } from '@/utils/local'
import baseURL from '@/config/api'

const codeMessage = {
  400: '请求错误',
  401: '登录状态失效，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  500: '服务器错误，请稍后再试',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

// axios.defaults.headers.post['Content-Type'] = 'application/json charset=UTF-8'
const instance = axios.create({
  baseURL,
  paramsSerializer(params) {
    const data = {}
    for (const k in params) {
      const value = params[k]
      if (value !== '' && value !== null && value !== undefined) {
        data[k] = value
      }
    }
    return qs.stringify(data, {arrayFormat: 'brackets'})
  }
})

instance.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = token
  }
  // store.commit('app/TOGGLE_LOADING', true)
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  if (response.data.code === 1) { // 成功
    response.data = response.data || {}
    response.data.success = true
  } else {
    message.destroy()
    message.warning(response.data.msg || '操作失败')
  }
  // store.commit('app/TOGGLE_LOADING', false)
  return response.data
}, (error) => {
  // store.commit('app/TOGGLE_LOADING', false)
  let msg = ''
  if (error.response) {
    const status = error.response.status
    msg = codeMessage[status] || '操作失败'
    if (status === 401) {
      console.log(store.dispatch)
      store.dispatch.login.logout().then(() => {
        store.dispatch(push('/login'))
      })
      // store.dispatch('user/clearInfo').then(() => {
      //   router.replace('/login')
      // })
    }
  } else {
    if (error.message.indexOf('timeout') >= 0) {
      msg = '请求超时！请检查网络是否正常'
    } else {
      msg = '网络错误，请检查网络是否已连接！'
    }
  }
  message.destroy()
  message.error(msg)
  return Promise.reject(error.response || error)
})

export default instance
