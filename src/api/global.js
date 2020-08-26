import request from '@/api/request'

export const getQiniuToken = (params) => {
  return request({
    method: 'get',
    url: '/upload/qiniu_token',
    params
  })
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
