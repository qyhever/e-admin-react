import axios from 'axios'
import request from '@/api/request'

export const getResources = (params) => {
  return request({
    method: 'get',
    url: '/resource',
    params
  })
}

export const getDirs = params => {
  return request({
    method: 'get',
    url: '/resource/dir',
    params
  })
}

export const saveResource = (params, cancelCallback) => {
  return request({
    method: 'post',
    url: '/resource',
    data: params,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}

export const updateResource = (params, cancelCallback) => {
  return request({
    method: 'put',
    url: '/resource',
    data: params,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}

export const patchResource = params => {
  return request({
    method: 'patch',
    url: '/resource',
    data: params
  })
}

export const deleteResource = params => {
  return request({
    method: 'delete',
    url: `/resource/${params.id}`,
    params
  })
}
