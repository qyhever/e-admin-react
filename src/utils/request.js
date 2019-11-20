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

const _showPageLoading = (showPageLoading, value) => {
  if (showPageLoading) {
    store.dispatch.app.updateState({
      pageLoading: value
    })
  }
}

const _setLoading = (setLoading, value) => {
  if (setLoading) {
    store.dispatch.app.updateState({
      loading: value
    })
  }
}

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json charset=UTF-8'
  },
  // 过滤掉空的 params 参数（拼接在url 中的参数）
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
/**
 * @param {Object} options 请求配置参数
 * @param {Boolean} [options.getResponse=false] 是否直接返回 axios response
 * @param {Boolean} [options.showWarningMsg=true] 是否显示接口错误提示（请求成功，但接口状态码非成功状态）
 * @param {Boolean} [options.showErrorMsg=true] 是否显示请求错误提示（请求失败）
 * @param {Boolean} [options.showPageLoading=false] 是否显示全屏 loading
 * @param {Boolean} [options.setLoading=false] 是否设置全局状态 app.loading
 * @param {Function} fn loading 状态回调
 * @return {Promise} Promise
 */
const _request = (
  {
    getResponse = false,
    showWarningMsg = true,
    showErrorMsg = true,
    showPageLoading = false,
    setLoading = false,
    ...options
  } = {},
  fn = () => {}
) => {
  instance.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    _showPageLoading(showPageLoading, true)
    _setLoading(setLoading, true)
    return config
  }, error => {
    return Promise.reject(error)
  })
  return instance(options)
    .then(response => {
      if (getResponse) { // return the origin Response
        return Promise.resolve(response)
      }
      const responseData = response.data || {}
      if (responseData.code === 1) { // success code
        responseData.success = true
      } else { // not success code
        if (showWarningMsg) {          
          message.destroy()
          message.warning(responseData.msg || '操作失败')
        }
      }
      return responseData
    })
    .catch(error => {
      let msg = ''
      if (error.response) {
        const status = error.response.status
        msg = codeMessage[status] || '操作失败'
        if (status === 401) {
          store.dispatch.login.logout().then(() => {
            store.dispatch(push('/login'))
          })
        }
      } else {
        if (error.message.indexOf('timeout') >= 0) {
          msg = '请求超时！请检查网络是否正常'
        } else {
          msg = '网络错误，请检查网络是否已连接！'
        }
      }
      if (showErrorMsg) {        
        message.destroy()
        message.error(msg)
      }
      throw error
    })
    .finally(() => {
      _showPageLoading(showPageLoading, false)
      _setLoading(setLoading, false)
      fn(false)
    })
}

export default param => {
  const typeRes = typeof param
  // the first param is a function, example: request(loading => this.setState({loading}))(options)
  if (typeRes === 'function') {
    param(true)
    return options => _request(options, param)
  }
  // the first param is not a function, example: request(options)
  if (typeRes === 'object' && typeRes !== null) return _request(param)
}
