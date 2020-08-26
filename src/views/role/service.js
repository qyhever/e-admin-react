import axios from 'axios'
import request from '@/api/request'

export const getRoles = params => {
  return request({
    method: 'get',
    url: '/role',
    params
  })
}

export const getTotalRoles = () => {
  return request({
    method: 'get',
    url: '/role/total'
  })
}

export const saveRole = (data, cancelCallback) => {
  return request({
    method: 'post',
    url: '/role',
    data,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}

export const deleteRole = params => {
  return request({
    method: 'delete',
    url: `/role/${params.id}`
  })
}
