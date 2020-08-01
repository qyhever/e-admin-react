import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { push } from 'connected-react-router'
import { message } from 'antd'
import { getToken } from '@/utils/local'

const codeMessage = {
  400: '请求错误',
  401: '登录状态失效，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  500: '服务器繁忙',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}
const genEmptyPromise = () => new Promise(() => {}) // eslint-disable-line

// const _showPageLoading = (showPageLoading, value) => {
//   if (showPageLoading) {
//     store.dispatch.app.updateState({
//       pageLoading: value
//     })
//   }
// }
const getErrorMsg = (error, errorMsg) => {
  let msg = ''
  if (errorMsg) {
    return errorMsg
  }
  // http 错误响应
  if (error.response) {
    const { status } = error.response
    return codeMessage[status]
  }
  // 超时或断网
  if (error.message.includes('timeout')) {
    msg = '请求超时！请检查网络是否正常'
  } else {
    msg = '网络错误，请检查网络是否已连接！'
  }
  return msg || '操作失败'
}
const requestStart = (config, loadingCb, showLoading) => {
  loadingCb(true)
  removePending(config) // 在请求开始前，对之前的请求做检查取消操作
  addPending(config) // 添加本次请求到 pending 中
  config.headers = config.headers || {}
  const token = getToken()
  if (token) {
    config.headers.Authorization = token
  }
  if (showLoading) {
    // Loading.open()
  }
}
const requestThenEnd = (response, showWarning, warningMsg, throwWarningError) => {
  removePending(response.config) // 在请求结束后，移除本次请求
  const responseData = response.data || {}
  if (responseData.success) { // success code
    return responseData.data
  }
  // not success code
  if (showWarning) {
    message.destroy()
    message.warning(warningMsg || responseData.msg || '操作失败')
  }
  // 抛出业务错误
  if (throwWarningError) {
    const err = new Error(JSON.stringify(responseData, null, 2))
    err.name = 'warning'
    return Promise.reject(err)
  }
  return genEmptyPromise()
}
const requestCatchEnd = (error, showError, errorMsg, throwHttpError) => {
  if (axios.isCancel(error)) { // 取消请求的错误，直接跳过
    console.log('repeated request: ' + error.message)
    return genEmptyPromise()
  }
  const msg = getErrorMsg(error, errorMsg)
  if (showError) {
    message.destroy()
    message.warning(msg)
  }
  if (error.response) {
    removePending(error.response.config) // 在请求结束后，移除本次请求
    const { status } = error.response
    if (status === 401) { // redirect login page
      store.dispatch.login.logout().then(() => {
        store.dispatch(push('/login'))
      })
    }
  }
  // 抛出http错误
  if (throwHttpError) {
    return Promise.reject(error)
  }
  return genEmptyPromise()
}
/**
 * 过滤空参数
 * @param {Object} params 参数对象
 */
const paramsSerializer = params => {
  const data = {}
  for (const k in params) {
    const value = params[k]
    if (value !== '' && value !== null && value !== undefined) {
      data[k] = value
    }
  }
  return qs.stringify(data)
}
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
}
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 * @param {Object} config
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}
const instance = axios.create({
  baseURL: '//qyhever.com/e-admin',
  // 只作用于 params（手动拼接在 url 后的参数不走这里）
  paramsSerializer
})
/**
 * @param {Object} options 请求配置参数
 * @param {Boolean} [options.showWarning=true] 是否显示业务错误提示（请求成功，但业务状态码非成功状态）
 * @param {Boolean} [options.showError=true] 是否显示http错误提示（http请求失败）
 * @param {Boolean} [options.showLoading=true] 是否显示 loading
 * @param {Function} [options.loadingCb=()=>{}] loading 状态回调
 * @param {Boolean} [options.throwWarningError=false] 是否抛出业务逻辑错误（请求成功，但业务状态码非成功状态）
 * @param {Boolean} [options.throwHttpError=false] 是否显示http错误（http请求失败）
 * @param {String} [options.warningMsg=''] 业务错误提示
 * @param {String} [options.errorMsg=''] http错误提示
 * @return {Promise} Promise
 */
const request = (
  {
    showWarning = true,
    showError = true,
    showLoading = true,
    loadingCb = () => {}, // eslint-disable-line
    throwWarningError = false,
    throwHttpError = false,
    warningMsg = '',
    errorMsg = '',
    ...options
  } = {}
) => {
  requestStart(options, loadingCb, showLoading)
  return instance(options)
    .then(response => {
      return requestThenEnd(response, showWarning, warningMsg, throwWarningError)
    })
    .catch(error => {
      console.log('request catch', error)
      return requestCatchEnd(error, showError, errorMsg, throwHttpError)
    })
    .finally(() => {
      loadingCb(false)
      if (showLoading) {
        // Loading.close()
      }
    })
}
export default request
