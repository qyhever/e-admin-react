import request from '@/api/request'
import axios from 'axios'
import { getRandomStr } from '@/utils'

export const getQiniuToken = (params) => {
  return request({
    method: 'get',
    url: '/upload/qiniu_token',
    params
  })
}

export const uploadFileToQiniu = async (file, name, onUploadProgress = () => {}) => { // eslint-disable-line
  const { token } = await getQiniuToken()
  const formData = new FormData()
  formData.append('file', file)
  formData.append('key', name || getRandomStr() + file.name)
  formData.append('token', token)
  const res = await axios({
    method: 'post',
    url: window.QINIU_UPLOAD_URL,
    data: formData,
    onUploadProgress
  })
  return window.QINIU_PREFIX + res.data.key
}

export const getTotalRoles = () => {
  return request({
    method: 'get',
    url: '/role/total'
  })
}

export const getTotalResources = params => {
  return request({
    method: 'get',
    url: '/resource/total',
    params
  })
}
