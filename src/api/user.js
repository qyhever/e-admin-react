import axios from '@/utils/axios'
import request from '@/utils/request'

export const login = data => {
  return axios({
    method: 'post',
    url: '/user/login',
    data
  })
}

export const getInfo = () => {
  return axios({
    method: 'get',
    url: '/user/current'
  })
}

// export const getUsers = params => {
//   return axios({
//     method: 'get',
//     url: '/user',
//     params
//   })
// }
export const getUsers = (fn, params) => {
  return request(fn)({
    method: 'get',
    url: '/user',
    params
  })
}

export const createUser = params => {
  return axios({
    method: 'post',
    url: '/user',
    data: params
  })
}

export const updateUser = params => {
  return axios({
    method: 'put',
    url: '/user',
    data: params
  })
}

export const patchUser = (fn, params) => {
  return request(fn)({
    method: 'patch',
    url: '/user',
    data: params
  })
}

export const deleteUser = (fn, params) => {
  return request(fn)({
    method: 'delete',
    url: `/user/${params.id}`,
    params
  })
}
