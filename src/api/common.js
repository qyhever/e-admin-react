import axios from '@/utils/axios'

export function getQiniuToken() {
  return axios({
    method: 'get',
    url: '/upload/qiniu_token'
  })
}
