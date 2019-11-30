import request from '@/utils/request'

export const getResources = params => {
  return request({
    method: 'get',
    url: '/resource',
    params
  })
}

export const getTotalResources = params => {
  return request({
    method: 'get',
    url: '/resource/total',
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

export const createResource = params => {
  return request({
    method: 'post',
    url: '/resource',
    data: params
  })
}

export const updateResource = params => {
  return request({
    method: 'put',
    url: '/resource',
    data: params
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
