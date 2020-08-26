import axios from 'axios'
import request from '@/api/request'

export const getUsers = (params) => {
  return request({
    method: 'get',
    url: '/user',
    params
  })
}

export const saveUser = (params, cancelCallback) => {
  return request({
    method: 'post',
    url: '/user',
    data: params,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}

export const updateUser = params => {
  return request({
    method: 'put',
    url: '/user',
    data: params
  })
}

export const patchUser = (params) => {
  return request({
    method: 'patch',
    url: '/user',
    data: params
  })
}

export const deleteUser = (params) => {
  return request({
    method: 'delete',
    url: `/user/${params.id}`,
    params
  })
}
