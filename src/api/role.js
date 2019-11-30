import request from '@/utils/request'

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

export const createRole = params => {
  return request({
    method: 'post',
    url: '/role',
    data: params
  })
}

export const updateRole = params => {
  return request({
    method: 'put',
    url: '/role',
    data: params
  })
}

export const deleteRole = params => {
  return request({
    method: 'delete',
    url: `/role/${params.id}`
  })
}
