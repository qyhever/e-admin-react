import request from '@/utils/request'

export function getQiniuToken() {
  return request({
    method: 'get',
    url: '/upload/qiniu_token'
  })
}
