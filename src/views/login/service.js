import request from '@/api/request'

export function login({ loadingCb, data}) {
  return request({
    method: 'post',
    url: '/user/login',
    data,
    loadingCb
  })
}
