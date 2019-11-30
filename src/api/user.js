import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'post',
    url: '/user/login',
    data
  })
}

export const getInfo = () => {
  return request({
    method: 'get',
    url: '/user/current'
  })
}

// export const getUsers = params => {
//   return request({
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
  return request({
    method: 'post',
    url: '/user',
    data: params
  })
}

export const updateUser = params => {
  return request({
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
